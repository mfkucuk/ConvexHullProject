import { ConvexHull } from "../ConvexHull.js";
import { calculateAngle, calculateAngleRelativeToNegativeX } from "../lib/calculateAngle.js";

export class JarvisMarch {

    /**
     * 
     * Generates a convex hull for a set of given points using Jarvis's March algorithm.
     * 
     * @param {Object[]} S - List of points to generate the convex hull. 
     */
    static construct(S) {

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
    
        let currentPoint = { x: pivot.x, y: pivot.y };
        let nextPoint = { x: 0, y: 0 };

        // march up...
        while (! (currentPoint.x == highestPoint.x && currentPoint.y == highestPoint.y)) {
            let lowestAngle = Number.MAX_SAFE_INTEGER;
            for (const point of S) {

                if (point.x == currentPoint.x && point.y == currentPoint.y) {
                    continue;
                }

                let angle = calculateAngle(point, currentPoint);

                if (lowestAngle > angle) {
                    lowestAngle = angle;
                    nextPoint.x = point.x;
                    nextPoint.y = point.y;
                }
            }

            convexHull.addPoint(currentPoint.x, currentPoint.y);

            currentPoint.x = nextPoint.x;
            currentPoint.y = nextPoint.y;
        }

        // march down...
        while (! (currentPoint.x == pivot.x && currentPoint.y == pivot.y)) {
            let lowestAngle = Number.MAX_SAFE_INTEGER;
            for (const point of S) {

                if (point.x == currentPoint.x && point.y == currentPoint.y) {
                    continue;
                }

                let angle = calculateAngleRelativeToNegativeX(currentPoint, point);

                if (lowestAngle > angle) {
                    lowestAngle = angle;
                    nextPoint.x = point.x;
                    nextPoint.y = point.y;
                }

            }

            convexHull.addPoint(currentPoint.x, currentPoint.y);

            currentPoint.x = nextPoint.x;
            currentPoint.y = nextPoint.y;
        }

        return convexHull;
    }
}