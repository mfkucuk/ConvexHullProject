import { ConvexHull } from "../ConvexHull.js";
import { globals } from "../index.js";
import { quickSort } from "../lib/quickSort.js";
import { orientation } from "../lib/orientation.js";
import { sleep } from "../lib/sleep.js";
import { clearCanvas } from "../rendering/clearCanvas.js";
import { drawGrahamAnimation } from "../rendering/drawAnimation.js";

export class GrahamScan {
    /**
     * Generates a convex hull for a set of given points using Graham's scan algorithm.
     * @param {Object[]} S - List of points to generate the convex hull. 
     */
    static async construct(S, staticS) {
        if (S.length < 2) {
            return new ConvexHull();
        }

        const pivot = S.reduce((acc, point, index) => {
            if (point.y < acc.y || (point.y === acc.y && point.x < acc.x)) {
                return { ...point, index };
            }
            return acc;
        }, { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER });

        // Move pivot to first position
        [S[0], S[pivot.index]] = [S[pivot.index], S[0]];

        const sortedS = quickSort(S, pivot);

        if (typeof staticS !== 'undefined') {
            S = staticS;
        }

        const hull = [sortedS[0], sortedS[1]];

        for (let i = 2; i < sortedS.length; i++) {
            if (globals.isAnimationEnabled) {
                hull.push(sortedS[i]);
                drawGrahamAnimation(globals.ctx, hull, S);
                await sleep(1000 * globals.animationSpeed);
            }

            while (hull.length > 1 && orientation(hull[hull.length - 2], hull[hull.length - 1], sortedS[i]) > 0) {
                hull.pop();
                if (globals.isAnimationEnabled) {
                    drawGrahamAnimation(globals.ctx, hull, S);
                    await sleep(1000 * globals.animationSpeed);
                }
            }
            hull.push(sortedS[i]);
        }

        const convexHull = new ConvexHull();
        convexHull.points = hull;

        return convexHull;
    }
}
