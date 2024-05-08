import { ConvexHull } from "../ConvexHull.js";
import { clearCanvas } from "./clearCanvas.js";
import { drawConvexHull } from "./drawConvexHull.js";
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
 * @param {object} tryPoint - The point where Jarvis's march is currently trying.
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

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    
    if (typeof tryPoint != 'undefined') {
        ctx.moveTo(anim[anim.length - 2].x, anim[anim.length - 2].y);
        ctx.lineTo(tryPoint.x, tryPoint.y);
    }
    ctx.stroke();
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {object[]} anim
 * @param {object[]} S
 */
export function drawQuickAnimation(ctx, anim, S) {

    clearCanvas(ctx);

    drawPoints(ctx, S);

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';

    for (let i = 0; i < anim.length; i++) {
        ctx.beginPath();
        ctx.moveTo(anim[i][0].x, anim[i][0].y);
        ctx.lineTo(anim[i][1].x, anim[i][1].y);
        ctx.stroke();
    }
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {ConvexHull} leftHull 
 * @param {ConvexHull} rightHull 
 * @param {object[]} upperTangent 
 * @param {object[]} lowerTangent 
 * @param {object[]} S 
 */
export function drawMergeAnimation(ctx, leftHull, rightHull, upperTangent, lowerTangent, S) {

    clearCanvas(ctx);

    drawPoints(ctx, S);

    // draw the left and right hulls
    drawConvexHull(ctx, leftHull, S);
    drawConvexHull(ctx, rightHull, S);

    
}