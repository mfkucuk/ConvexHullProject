import { distanceFromLine } from "./distanceFromLine.js";

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