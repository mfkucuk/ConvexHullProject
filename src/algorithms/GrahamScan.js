import { ConvexHull } from "../ConvexHull.js";
import { globals } from "../index.js";
import { mergeSort } from "../lib/mergeSort.js";
import { orientation } from "../lib/orientation.js";
import { sleep } from "../lib/sleep.js";
import { clearCanvas } from "../rendering/clearCanvas.js";
import { drawGrahamAnimation } from "../rendering/drawAnimation.js";

export class GrahamScan {

    /**
     * 
     * Generates a convex hull for a set of given points using Graham's scan algorithm.
     * 
     * @param {Object[]} S - List of points to generate the convex hull. 
     */
    static async construct(S) {

        if (S.length < 2) {
            return new ConvexHull();
        }

        const pivot = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
        let pivotIndex = 0;
        
        for (const point of S) {
            if (pivot.y > point.y) {
                pivot.x = point.x;
                pivot.y = point.y;
                pivotIndex = S.indexOf(point);
            } else if (pivot.y == point.y) {
                if (pivot.x > point.x) {
                    pivot.x = point.x;
                    pivotIndex = S.indexOf(point);
                }
            }
        }

        // swap pivot with the first element
        let tempPoint = { x: S[0].x, y: S[0].y };

        S[0].x = pivot.x;
        S[0].y = pivot.y;

        S[pivotIndex].x = tempPoint.x;
        S[pivotIndex].y = tempPoint.y;

        const sortedS = mergeSort(S, pivot);

        const animationPoints = [sortedS[0], sortedS[1]];
        
        for (let i = 2; i < sortedS.length; i++) {
            if (globals.isAnimationEnabled) {
                animationPoints.push(sortedS[i]);
                drawGrahamAnimation(globals.ctx, animationPoints, S);
    
                await sleep(1000);
            }

            while (orientation(sortedS[i - 2], sortedS[i - 1], sortedS[i]) > 0) {
                if (!globals.isAnimationEnabled) {
                    sortedS.splice(i - 1, 1);
                    i--;
                }
                else {
                    sortedS.splice(i - 1, 1);
                    animationPoints.splice(i - 1, 1);
                    i--;

                    drawGrahamAnimation(globals.ctx, animationPoints, S);

                    await sleep(1000);
                }
            }
        }

        const convexHull = new ConvexHull();

        for (const point of sortedS) {
            convexHull.addPoint(point);
        }

        if (globals.isAnimationEnabled) {
            clearCanvas(globals.ctx);
        }

        return convexHull;
    }

}