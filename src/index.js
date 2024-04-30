import { ConvexHull } from "./ConvexHull.js";
import { GrahamScan } from "./algorithms/GrahamScan.js";
import { JarvisMarch } from "./algorithms/JarvisMarch.js";
import { mergeSort } from "./lib/mergeSort.js";
import { drawConvexHull } from "./rendering/drawConvexHull.js";
import { drawPoints } from "./rendering/drawPoints.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// make the bottom-left corner the origin
ctx.translate(0, canvas.height);
ctx.scale(1, -1);

// ENTRY POINT //
function main() {
    console.log('program start');

    const S = [
        { x: 200, y: 200 },
        { x: 100, y: 200 },
        { x: 200, y: 100 },
        { x: 150, y: 500 },
        { x: 300, y: 300 },
        { x: 50,  y: 300 },
        { x: 100, y: 100 },
        { x: 150, y: 150 }
    ];

    drawPoints(ctx, S);

    let convexHull = GrahamScan.construct(S);
    //let convexHull = JarvisMarch.construct(S);

    drawConvexHull(ctx, convexHull);
}

window.onload = main;