export function calculateAngle(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;

    const angle = Math.atan2(dy, dx) || 0;

    return angle;
}

export function calculateAngleRelativeToNegativeX(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;

    var angle = Math.atan2(dy, dx) || 0;

    if (angle < 0) {
        angle += 2 * Math.PI;
    }

    return angle;
}
  