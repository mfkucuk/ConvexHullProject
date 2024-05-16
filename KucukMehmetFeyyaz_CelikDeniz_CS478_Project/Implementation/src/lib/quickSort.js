import { calculateAngle } from "./calculateAngle.js";

export function quickSort(points, pivot) {
    if (points.length <= 1) {
        return points;
    }

    points.forEach(point => {
        point.angle = calculateAngle(point, pivot);
    });

    points.sort((a, b) => a.angle - b.angle);
    return points;
}
