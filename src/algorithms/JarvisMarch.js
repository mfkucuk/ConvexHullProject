import { ConvexHull } from "../ConvexHull.js";
import { globals } from "../index.js";
import { calculateAngle, calculateAngleRelativeToNegativeX } from "../lib/calculateAngle.js";
import { sleep } from "../lib/sleep.js";
import { drawJarvisAnimation } from "../rendering/drawAnimation.js";

export class JarvisMarch {

    /**
     * 
     * Generates a convex hull for a set of given points using Jarvis's March algorithm.
     * 
     * @param {object[]} S - List of points to generate the convex hull. 
     */
    static async construct(S) {

        const pivot = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
        const highestPoint = { x: Number.MIN_SAFE_INTEGER, y: 0 };
        
        // find the highest point in the same iteration
        for (const point of S) {
            if (pivot.y > point.y) {
                pivot.x = point.x;
                pivot.y = point.y;
            } else if (pivot.y == point.y) {
                if (pivot.x < point.x) {
                    pivot.x = point.x;
                }
            }

            if (point.y > highestPoint.y) {
                highestPoint.x = point.x;
                highestPoint.y = point.y;
            }
        }

        const convexHull = new ConvexHull();

        const animationPoints = [ pivot ];
    
        let currentPoint = { x: pivot.x, y: pivot.y };
        let nextPoint = { x: 0, y: 0 };

        // march up...
        while (! (currentPoint.x == highestPoint.x && currentPoint.y == highestPoint.y)) {
            let lowestAngle = Number.MAX_SAFE_INTEGER;
            let firstTime = true;
            for (const point of S) {
                if (point.x == currentPoint.x && point.y == currentPoint.y) {
                    continue;
                }

                let angle = calculateAngle(currentPoint, point);

                if (lowestAngle > angle) {
                    lowestAngle = angle;
                    nextPoint.x = point.x;
                    nextPoint.y = point.y;

                    if (firstTime) {
                        firstTime = false;
                    }
                    else {
                        animationPoints.splice(animationPoints.length - 1, 1);
                    }

                    animationPoints.push({ x: nextPoint.x, y: nextPoint.y });
                }

                if (globals.isAnimationEnabled) {
                    drawJarvisAnimation(globals.ctx, animationPoints, S, point);

                    await sleep(400);
                }
            }

            convexHull.addPoint(currentPoint.x, currentPoint.y);

            currentPoint.x = nextPoint.x;
            currentPoint.y = nextPoint.y;
        }

        // march down...
        while (! (currentPoint.x == pivot.x && currentPoint.y == pivot.y)) {
            let lowestAngle = Number.MAX_SAFE_INTEGER;
            let firstTime = true;
            for (const point of S) {

                if (point.x == currentPoint.x && point.y == currentPoint.y) {
                    continue;
                }

                let angle = calculateAngleRelativeToNegativeX(currentPoint, point);

                if (lowestAngle > angle) {
                    lowestAngle = angle;
                    nextPoint.x = point.x;
                    nextPoint.y = point.y;
                
                    if (firstTime) {
                        firstTime = false;
                    }
                    else {
                        animationPoints.splice(animationPoints.length - 1, 1);
                    }

                    animationPoints.push({ x: nextPoint.x, y: nextPoint.y });
                }

                if (globals.isAnimationEnabled) {
                    drawJarvisAnimation(globals.ctx, animationPoints, S, point);

                    await sleep(400);
                }

            }

            convexHull.addPoint(currentPoint.x, currentPoint.y);

            currentPoint.x = nextPoint.x;
            currentPoint.y = nextPoint.y;
        }

        return convexHull;
    }
}