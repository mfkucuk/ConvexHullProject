import { ConvexHull } from "../ConvexHull.js";


const convexHull = new ConvexHull();

export class QuickHull {

    
    /**
     * 
     * Generates a convex hull for a set of given points using Quick Hull algorithm.
     * 
     * @param {Object[]} S - List of points to generate the convex hull. 
     */
    static construct(S) {

        if( S.length == 3) {
            convexHull.addPoint(S[0]);
            convexHull.addPoint(S[1]);
            convexHull.addPoint(S[2]);
            return convexHull;
        }

        let baseline = getMinMaxPoints(S);
        
        addSegments(baseline, S);
        addSegments([baseline[1], baseline[0]], S);

        console.log(S);
        console.log(convexHull.points);
        return convexHull;
    }

}

export function distalPoints(line, points) {
    let i;
    let outer_points = [];
    let point;
    let distal_point;
    let distance=0;
    let max_distance=0;

    for(i=0; i < points.length; i++) { 
        point = points[i];
        distance = distanceFromLine(point, line);

        if(distance > 0) outer_points.push(point);
        else continue; //short circuit

        if(distance > max_distance) {
            distal_point = point;
            max_distance = distance;
        }

    }

    return {points: outer_points, max: distal_point};
}

export function distanceFromLine(point, line) {

    console.log(point);
    console.log(line);

    var vY = line[1].y - line[0].y;
    var vX = line[0].x - line[1].x;
    return (vX * (point.y - line[0].y) + vY * (point.x - line[0].x))
}

export function getMinMaxPoints(points) {
    let minPoint;
    let maxPoint;

    minPoint = points[0];
    maxPoint = points[0];

    for(let i = 1; i < points.length; i++) {
        if(points[i].x < minPoint.x)
            minPoint.x = points[i].x;
            minPoint.y = points[i].y;
        if(points[i].x > maxPoint.x)
            maxPoint.x = points[i].x;
            maxPoint.y = points[i].y;
    }

    return [minPoint, maxPoint];
}

export function addSegments(line, points) {
    var distal = distalPoints(line, points);
    
    if(!distal.max) {
        return convexHull.addPoint(line[0].x, line[0].y);
    }
    
    addSegments([line[0], distal.max], distal.points);
    addSegments([distal.max, line[1]], distal.points);
}
