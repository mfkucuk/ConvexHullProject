import { clearCanvas } from "./clearCanvas.js";
import { drawPoints } from "./drawPoints.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {object[]} anim
 * @param {object[]} S
 */
export function drawGrahamAnimation(ctx, anim, S) {

    clearCanvas(ctx);

    drawPoints(ctx, S);

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';

    for (let i = 0; i < anim.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(anim[i].x, anim[i].y);
        ctx.lineTo(anim[i+1].x, anim[i+1].y);
        ctx.stroke();
    }
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {object[]} anim
 * @param {object[]} S
 */
export function drawJarvisAnimation(ctx, anim, S, tryPoint) {

    clearCanvas(ctx);

    drawPoints(ctx, S);

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';

    for (let i = 0; i < anim.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(anim[i].x, anim[i].y);
        ctx.lineTo(anim[i+1].x, anim[i+1].y);
        ctx.stroke();
    }

    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
    
    if (typeof tryPoint != 'undefined') {
        ctx.moveTo(anim[anim.length - 2].x, anim[anim.length - 2].y);
        ctx.lineTo(tryPoint.x, tryPoint.y);
    }
    ctx.stroke();
}