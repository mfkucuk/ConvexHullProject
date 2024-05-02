import { ConvexHull } from "../ConvexHull";
import { distalPoints } from "./distalPoints";
export function addSegments(line, points, convexHull) {
    var distal = distalPoints(line, points);
    if(!distal.max) return convexHull.addPoint(line[0]);
    addSegments([line[0], distal.max], distal.points, convexHull);
    addSegments([distal.max, line[1]], distal.points, convexHull);
}
