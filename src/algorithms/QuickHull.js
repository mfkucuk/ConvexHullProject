import { ConvexHull } from "../ConvexHull.js";
import { distalPoints } from "../lib/distalPoints.js";
import { getMinMaxPoints } from "../lib/getMinMaxPoints.js";
import { addSegments } from "../lib/addSegments.js";

export class QuickHull {

    /**
     * 
     * Generates a convex hull for a set of given points using Quick Hull algorithm.
     * 
     * @param {Object[]} S - List of points to generate the convex hull. 
     */
    static construct(S) {
        const convexHull = new ConvexHull();

        if( S.length == 3) {
            convexHull.addPoint(S[0]);
            convexHull.addPoint(S[1]);
            convexHull.addPoint(S[2]);
            return convexHull;
        }

        let lowestPoint, highestPoint = getMinMaxPoints(S);
        let baseline = getMinMaxPoints(S);
        
        addSegments(baseline, S, convexHull);
        addSegments([highestPoint, lowestPoint], S, convexHull);

        return convexHull;
    }

}