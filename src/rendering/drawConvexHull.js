import { ConvexHull } from "../ConvexHull.js";
import { clearCanvas } from "./clearCanvas.js";
import { drawPoints } from "./drawPoints.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {ConvexHull} convexHull
 */
export function drawConvexHull(ctx, convexHull, S) {

    clearCanvas(ctx);

    drawPoints(ctx, S);

    if (convexHull.points.length < 2) {
        return;
    }

    ctx.fillStyle = "#037249";
    ctx.strokeStyle = '#037249';

    for (const point of convexHull.points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    ctx.fillStyle = "#04AA6D";
    ctx.strokeStyle = '#04AA6D';

    for (let i = 0; i < convexHull.points.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(convexHull.points[i].x, convexHull.points[i].y);
        ctx.lineTo(convexHull.points[i+1].x, convexHull.points[i+1].y);
        ctx.stroke();
    }

    // connect last point to the first point
    ctx.moveTo(convexHull.points[ convexHull.points.length - 1 ].x, convexHull.points[ convexHull.points.length - 1 ].y);
    ctx.lineTo(convexHull.points[0].x, convexHull.points[0].y);
    ctx.stroke();
}