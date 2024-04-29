/**
 * 
 * Returns the orientation of the given three points.
 * 
 * @returns {number} == 0 if colinear, > 0 if clockwise, < 0 of counterclockwise
 */
export function orientation(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}