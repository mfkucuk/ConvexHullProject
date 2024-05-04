import { ConvexHull } from "../ConvexHull.js";
import { mergeConvexHulls } from "../lib/mergeConvexHulls.js";
import { mergeSort } from "../lib/mergeSort.js"
import { GrahamScan } from "./GrahamScan.js";

export class MergeHull {
    /**
     * 
     * Generates a convex hull for a set of given points using Quick Hull algorithm.
     * 
     * @param {Object[]} S - List of points to generate the convex hull. 
     */
    static construct(S) {
        
        if (S.length <= 3) {
            return GrahamScan.construct(S);
        }
        
        const sortedPoints = mergeSort(S, S[0]);
    
        const leftSubset = MergeHull.construct(sortedPoints.slice(0, Math.floor(sortedPoints.length / 2)));
        const rightSubset = MergeHull.construct(sortedPoints.slice(Math.floor(sortedPoints.length / 2) + 1));
    
        return mergeConvexHulls(leftSubset, rightSubset);
    }
}

