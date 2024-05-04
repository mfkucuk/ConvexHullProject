import { ConvexHull } from "../ConvexHull.js";

export function mergeConvexHulls(hull1, hull2) {
    // Get the points of the two hulls
    const points1 = hull1.points;
    const points2 = hull2.points;

    // Merge the points of the two hulls
    const mergedPoints = [...points1, ...points2];

    // Sort the merged points by their x-coordinate
    mergedPoints.sort((a, b) => a.x - b.x);

    // Initialize the merged hull
    const mergedHull = new ConvexHull();

    // Find the upper hull
    for (let i = 0; i < mergedPoints.length; i++) {
        while (mergedHull.points.length >= 2 &&
            isClockwiseTurn(
                mergedHull.points[mergedHull.points.length - 2],
                mergedHull.points[mergedHull.points.length - 1],
                mergedPoints[i]
            )) {
            mergedHull.removePoint(mergedHull.points.length - 1);
        }
        mergedHull.addPoint(mergedPoints[i]);
    }

    // Find the lower hull
    const lowerHullStartIndex = mergedHull.points.length -1;
    for (let i = mergedPoints.length - 2; i >= 0; i--) {
        while (mergedHull.points.length >= lowerHullStartIndex &&
            isClockwiseTurn(
                mergedHull.points[mergedHull.points.length - 2],
                mergedHull.points[mergedHull.points.length - 1],
                mergedPoints[i]
            )) {
            mergedHull.removePoint(mergedHull.points.length - 1);
        }
        mergedHull.addPoint(mergedPoints[i]);
    }

    // Remove the duplicate point at the end (first point of the upper hull)
    mergedHull.removePoint(mergedHull.points.length - 1);

    return mergedHull;
}

// Function to check if three points make a clockwise turn
function isClockwiseTurn(p1, p2, p3) {
    const crossProduct = (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
    return crossProduct < 0;
}
