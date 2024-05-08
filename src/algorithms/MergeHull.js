import { ConvexHull } from "../ConvexHull.js";
import { calculateSlope } from "../lib/calculateSlope.js";
import { mod } from "../lib/mod.js";
import { GrahamScan } from "./GrahamScan.js";
import { sleep } from "../lib/sleep.js";
import { globals } from "../index.js";
import { drawMergeAnimation } from "../rendering/drawAnimation.js";

export class MergeHull {

    static #S = [];

    static reset() {
        this.#S = [];
    }

    /**
     * 
     * Generates a convex hull for a set of given points using Merge Hull algorithm.
     * 
     * @param {object[]} S - List of points to generate the convex hull. 
     */
    static async construct(S) {

        if (this.#S.length == 0) {
            for (let i = 0; i < S.length; i++) {
                this.#S.push(S[i]);
            }
        }
        
        if (S.length <= 3) {
            return await GrahamScan.construct(S, this.#S);
        }

        S.sort((a, b) => a.x - b.x);

        const leftSubset = await MergeHull.construct(S.slice(0, Math.floor(S.length / 2)));
        const rightSubset = await MergeHull.construct(S.slice(Math.floor(S.length / 2)));
    
        return await this.#mergeConvexHulls(leftSubset, rightSubset);
    }

    /**
     * 
     * @param {ConvexHull} leftHull 
     * @param {ConvexHull} rightHull 
     */
    static async #mergeConvexHulls(leftHull, rightHull) {
        
        // find the highest x coordinate in left hull.
        const highestXPoint = { x: Number.MIN_SAFE_INTEGER, y: 0 };
        let highestXPointIndex;

        for (const point of leftHull.points) {
            if (point.x > highestXPoint.x) {
                highestXPoint.x = point.x;
                highestXPoint.y = point.y;

                highestXPointIndex = leftHull.points.indexOf(point);
            }
        }

        // find the lowest x coordinate in right hull.
        const lowestXPoint = { x: Number.MAX_SAFE_INTEGER, y: 0 };
        let lowestXPointIndex;

        for (const point of rightHull.points) {
            if (point.x < lowestXPoint.x) {
                lowestXPoint.x = point.x;
                lowestXPoint.y = point.y;

                lowestXPointIndex = rightHull.points.indexOf(point);
            }
        }

        if (globals.isAnimationEnabled) {
            drawMergeAnimation(globals.ctx, leftHull, rightHull, this.#S);

            await sleep(1000 * globals.animationSpeed);
        }

        let currentSlope;

        let leftUpperTangentFound = false;
        let rightUpperTangentFound = false;
        
        // find the upper tangent indices
        let leftIndex = highestXPointIndex;
        let rightIndex = lowestXPointIndex;

        while (!leftUpperTangentFound || !rightUpperTangentFound) {
            currentSlope = calculateSlope(leftHull.getPoint(leftIndex), rightHull.getPoint(rightIndex));

            if (globals.isAnimationEnabled) {
                drawMergeAnimation(globals.ctx, leftHull, rightHull, this.#S, [rightHull.getPoint(rightIndex), leftHull.getPoint(leftIndex)]);
    
                await sleep(1000 * globals.animationSpeed);
            }
            
            
            leftUpperTangentFound = true;
            while (currentSlope > calculateSlope(leftHull.getPoint(leftIndex + 1), rightHull.getPoint(rightIndex))) {
                leftUpperTangentFound = false;
                
                leftIndex = mod(leftIndex + 1, leftHull.points.length);
                
                currentSlope = calculateSlope(leftHull.getPoint(leftIndex), rightHull.getPoint(rightIndex));                
            }
            
            rightUpperTangentFound = true;
            while (currentSlope < calculateSlope(leftHull.getPoint(leftIndex), rightHull.getPoint(rightIndex - 1))) {
                rightUpperTangentFound = false;
                
                rightIndex = mod(rightIndex - 1, rightHull.points.length);
                
                currentSlope = calculateSlope(leftHull.getPoint(leftIndex), rightHull.getPoint(rightIndex));
            }
        }

        const upperTangent = [rightIndex, leftIndex];

        let leftLowerTangentFound = false;
        let rightLowerTangentFound = false;

        // find the lower tangent indices
        leftIndex = highestXPointIndex;
        rightIndex = lowestXPointIndex;

        while (!leftLowerTangentFound || !rightLowerTangentFound) {
            currentSlope = calculateSlope(leftHull.getPoint(leftIndex), rightHull.getPoint(rightIndex));

            if (globals.isAnimationEnabled) {
                drawMergeAnimation(globals.ctx, leftHull, rightHull, this.#S, 
                    [rightHull.getPoint(upperTangent[0]), leftHull.getPoint(upperTangent[1])], [rightHull.getPoint(rightIndex), leftHull.getPoint(leftIndex)]);
    
                await sleep(1000 * globals.animationSpeed);
            }

            leftLowerTangentFound = true;
            while (currentSlope < calculateSlope(leftHull.getPoint(leftIndex - 1), rightHull.getPoint(rightIndex))) {
                leftLowerTangentFound = false;
                
                leftIndex = mod(leftIndex - 1, leftHull.points.length);
                
                currentSlope = calculateSlope(leftHull.getPoint(leftIndex), rightHull.getPoint(rightIndex));
            }

            rightLowerTangentFound = true;
            while (currentSlope > calculateSlope(leftHull.getPoint(leftIndex), rightHull.getPoint(rightIndex + 1))) {
                leftLowerTangentFound = false;
                
                rightIndex = mod(rightIndex + 1, rightHull.points.length);
                
                currentSlope = calculateSlope(leftHull.getPoint(leftIndex), rightHull.getPoint(rightIndex));
            }
        }

        const lowerTangent = [leftIndex, rightIndex];

        const mergedHull = new ConvexHull();

        let currentList = leftHull.points;

        let firstPass = true;
        let jumpedToRight = false;
        let jumpedToLeft = false;

        for (let i = 0; i < currentList.length;) {
            if (!firstPass) {
                mergedHull.addPoint({ x: currentList[i].x, y: currentList[i].y });
            }
        
            if (currentList[i].x == leftHull.points[lowerTangent[0]].x && currentList[i].y == leftHull.points[lowerTangent[0]].y && !jumpedToRight) {
                firstPass = false;
                jumpedToRight = true;
                currentList = rightHull.points;
                i = lowerTangent[1];
            }   
            else if (currentList[i].x == leftHull.points[lowerTangent[0]].x && currentList[i].y == leftHull.points[lowerTangent[0]].y && jumpedToRight) {
                break;
            }         
            else if (currentList[i].x == rightHull.points[upperTangent[0]].x && currentList[i].y == rightHull.points[upperTangent[0]].y && !jumpedToLeft) {
                jumpedToLeft = true;
                currentList = leftHull.points;
                i = upperTangent[1];
            }
            else {
                i = mod(i + 1, currentList.length);
            }
        }

        return mergedHull;
    }
}
