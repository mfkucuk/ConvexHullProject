export function distalPoints(line, points) {
    var i;
    var outer_points = [];
    var point;
    var distal_point;
    var distance=0;
    var max_distance=0;

    for(i=0; i<points.length; i++) {
        point = points[i];
        distance = distanceFromLine(point,line);

        if(distance > 0) outer_points.push(point);
        else continue; //short circuit

        if(distance > max_distance) {
            distal_point = point;
            max_distance = distance;
        }

    }

    return {points: outer_points, max: distal_point};
}