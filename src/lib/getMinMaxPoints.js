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