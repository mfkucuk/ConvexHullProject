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

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';

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