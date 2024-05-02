import { ConvexHull } from "../ConvexHull.js";
import { distalPoints } from "./distalPoints.js";
export function addSegments(line, points, convexHull) {
    var distal = distalPoints(line, points);
    if(!distal.max) return convexHull.addPoint(line[0].x, line[0].y);
    addSegments([line[0], distal.max], distal.points, convexHull);
    addSegments([distal.max, line[1]], distal.points, convexHull);
}
