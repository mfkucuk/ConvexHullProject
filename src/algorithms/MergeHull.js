import { ConvexHull } from "../ConvexHull.js";
import { mergeSort } from "../lib/mergeSort.js"
import { mod } from "../lib/mod.js";
import { orientation } from "../lib/orientation.js";
import { GrahamScan } from "./GrahamScan.js";

export class MergeHull {
    /**
     * 
     * Generates a convex hull for a set of given points using Merge Hull algorithm.
     * 
     * @param {Object[]} S - List of points to generate the convex hull. 
     */
    static construct(S) {
        
        if (S.length <= 6) {
            return GrahamScan.construct(S);
        }

        S.sort((a, b) => a.x - b.x);

        const leftSubset = MergeHull.construct(S.slice(0, Math.floor(S.length / 2)));
        const rightSubset = MergeHull.construct(S.slice(Math.floor(S.length / 2)));
    
        return this.#mergeConvexHulls(leftSubset, rightSubset);
    }

    static #mergeConvexHulls(hull1, hull2) {
    
    }
}
