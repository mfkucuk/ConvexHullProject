import { ConvexHull } from "../ConvexHull.js";
import { globals } from "../index.js";
import { sleep } from "../lib/sleep.js";
import { drawQuickAnimation } from "../rendering/drawAnimation.js";

export class QuickHull {

    static #animationPoints = [];
    static #S = [];

    /**
     * 
     * Generates a convex hull for a set of given points using Quick Hull algorithm.
     * 
     * @param {object[]} S - List of points to generate the convex hull. 
     */
    static async construct(S) {

        if (S.length < 2) {
            return new ConvexHull();
        }

        this.#animationPoints = [];
        this.#S = S;

        const convexHull = new ConvexHull();

        if (S.length == 3) {
            convexHull.addPoint({ x: S[0].x, y: S[0].y });
            convexHull.addPoint({ x: S[1].x, y: S[1].y });
            convexHull.addPoint({ x: S[2].x, y: S[2].y });
            return convexHull;
        }

        let baseline = this.#getMinMaxPoints(S);
        
        await this.#addSegments(baseline, S, convexHull);
        await this.#addSegments([baseline[1], baseline[0]], S, convexHull);

        return convexHull;
    }

    static #getMinMaxPoints(points) {
        let minPoint = { x: points[0].x, y: points[0].y };
        let maxPoint = { x: points[0].x, y: points[0].y };
        
        for (let i = 1; i < points.length; i++) {
            if (points[i].x < minPoint.x) {
                minPoint.x = points[i].x;
                minPoint.y = points[i].y;
            }
            if (points[i].x > maxPoint.x) {
                maxPoint.x = points[i].x;
                maxPoint.y = points[i].y;
            }
        }
    
        return [minPoint, maxPoint];
    }

    static async #addSegments(line, points, convexHull) {
        var distal = this.#distalPoints(line, points);

        if (distal.max.x == -27 && distal.max.y == -27) {
            return convexHull.addPoint(line[0].x, line[0].y);
        }

        if (globals.isAnimationEnabled) {
            this.#animationPoints.push([line[0], line[1]]);
            drawQuickAnimation(globals.ctx, this.#animationPoints, this.#S);
            
            await sleep(800 * globals.animationSpeed);
            
            this.#animationPoints.push([line[0], distal.max]);
            this.#animationPoints.push([distal.max, line[1]]);

            const indices = [];
            for (const points of this.#animationPoints) {
                if ((points[0] == line[0] && points[1] == line[1]) || points[0] == line[1] && points[1] == line[0]) {
                    indices.push(this.#animationPoints.indexOf(points));
                }
            }

            if (indices.length > 1) {
                this.#animationPoints.splice(indices[0], 1);
                this.#animationPoints.splice(indices[1] - 1, 1);
            }

            drawQuickAnimation(globals.ctx, this.#animationPoints, this.#S);
            
            await sleep(800 * globals.animationSpeed);
        }
        
        await this.#addSegments([line[0], distal.max], distal.points, convexHull);
        await this.#addSegments([distal.max, line[1]], distal.points, convexHull);
    }

    static #distalPoints(line, points) {

        let outer_points = [];
        let distal_point = { x: -27, y: -27 };
        let distance = 0;
        let max_distance = 0;
    
        for (const point of points) {
            distance = this.#distanceFromLine(point, line);
        
            if (distance > 0) {
                outer_points.push({ x: point.x, y: point.y });

                if (distance > max_distance) {
                    distal_point.x = point.x;
                    distal_point.y = point.y;
                    max_distance = distance;
                }
            } 
            else {
                continue; //short circuit
            } 
        }
    
        return { points: outer_points, max: distal_point };
    }

    static #distanceFromLine(point, line) {
        const vY = line[1].y - line[0].y;
        const vX = line[0].x - line[1].x;
        return (vX * (point.y - line[0].y) + vY * (point.x - line[0].x))
    }

}
