export function distanceFromLine(point, line) {

    console.log(point);
    console.log(line);

    var vY = line[1].y - line[0].y;
    var vX = line[0].x - line[1].x;
    return (vX * (point.y - line[0].y) + vY * (point.x - line[0].x))
}