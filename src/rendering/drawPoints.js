import { clearCanvas } from "./clearCanvas.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Object[]} S 
 */
export function drawPoints(ctx, S) {

    //#037249
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';

    for (const point of S) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}