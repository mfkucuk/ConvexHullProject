import { ConvexHull } from "../ConvexHull.js";
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
 * @param {object[]} S 
 * @param {object[]} upperTangent 
 * @param {object[]} lowerTangent 
 */
export function drawMergeAnimation(ctx, leftHull, rightHull, S, upperTangent, lowerTangent) {

    clearCanvas(ctx);

    drawPoints(ctx, S);

    // draw the left and right hulls
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';

    for (let i = 0; i < leftHull.points.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(leftHull.points[i].x, leftHull.points[i].y);
        ctx.lineTo(leftHull.points[i+1].x, leftHull.points[i+1].y);
        ctx.stroke();
    }

    // connect last point to the first point
    ctx.moveTo(leftHull.points[ leftHull.points.length - 1 ].x, leftHull.points[ leftHull.points.length - 1 ].y);
    ctx.lineTo(leftHull.points[0].x, leftHull.points[0].y);
    ctx.stroke();

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';

    for (let i = 0; i < rightHull.points.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(rightHull.points[i].x, rightHull.points[i].y);
        ctx.lineTo(rightHull.points[i+1].x, rightHull.points[i+1].y);
        ctx.stroke();
    }

    // connect last point to the first point
    ctx.moveTo(rightHull.points[ rightHull.points.length - 1 ].x, rightHull.points[ rightHull.points.length - 1 ].y);
    ctx.lineTo(rightHull.points[0].x, rightHull.points[0].y);
    ctx.stroke();

    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';

    if (typeof upperTangent != 'undefined') {
        ctx.beginPath();
        ctx.moveTo(upperTangent[0].x, upperTangent[0].y);
        ctx.lineTo(upperTangent[1].x, upperTangent[1].y);
        ctx.stroke();
    }

    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';

    if (typeof lowerTangent != 'undefined') {
        ctx.beginPath();
        ctx.moveTo(lowerTangent[0].x, lowerTangent[0].y);
        ctx.lineTo(lowerTangent[1].x, lowerTangent[1].y);
        ctx.stroke();
    }
}