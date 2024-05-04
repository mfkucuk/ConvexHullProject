// Helper function to find orientation of ordered triplet (p, q, r)
function orientation(p, q, r) {
    let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0; // colinear
    return (val > 0) ? 1 : 2; // clock or counterclock wise
}

export function mergeConvexHulls(convexHull1, convexHull2) {
    // Merge the hulls
    let mergedHull = [];

    // Find the upper and lower tangent points on each hull
    let upperTangentThis = null, upperTangentOther = null, lowerTangentThis = null, lowerTangentOther = null;

    for (let i = 0; i < convexHull1.points.length; i++) {
        let prev = (i === 0) ? convexHull1.points.length - 1 : i - 1;
        let next = (i === convexHull1.points.length - 1) ? 0 : i + 1;
        let orientationPrev = orientation(convexHull1.points[prev], convexHull1.points[i], convexHull1.points[next]);
        if (orientationPrev === 2 && !upperTangentThis) {
            upperTangentThis = convexHull1.points[i];
        } else if (orientationPrev === 1 && !lowerTangentThis) {
            lowerTangentThis = convexHull1.points[i];
        }
    }

    for (let i = 0; i < convexHull2.points.length; i++) {
        let prev = (i === 0) ? convexHull2.points.length - 1 : i - 1;
        let next = (i === convexHull2.points.length - 1) ? 0 : i + 1;
        let orientationPrev = orientation(convexHull2.points[prev], convexHull2.points[i], convexHull2.points[next]);
        if (orientationPrev === 2 && !upperTangentOther) {
            upperTangentOther = convexHull2.points[i];
        } else if (orientationPrev === 1 && !lowerTangentOther) {
            lowerTangentOther = convexHull2.points[i];
        }
    }

    // Add upper tangent points and the segment connecting them
    mergedHull.push(upperTangentThis, upperTangentOther);
    let currentIndex = convexHull1.points.indexOf(upperTangentThis) + 1;
    while (convexHull1.points[currentIndex] !== lowerTangentThis) {
        mergedHull.push(convexHull1.points[currentIndex]);
        currentIndex = (currentIndex + 1) % convexHull1.points.length;
    }
    mergedHull.push(lowerTangentThis);

    // Add lower tangent points and the segment connecting them
    currentIndex = convexHull2.points.indexOf(upperTangentOther) + 1;
    while (convexHull2.points[currentIndex] !== lowerTangentOther) {
        mergedHull.push(convexHull2.points[currentIndex]);
        currentIndex = (currentIndex + 1) % convexHull2.points.length;
    }
    mergedHull.push(lowerTangentOther);

    return mergedHull;
}