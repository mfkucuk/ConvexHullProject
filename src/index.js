import { ConvexHull } from "./ConvexHull.js";
import { GrahamScan } from "./algorithms/GrahamScan.js";
import { JarvisMarch } from "./algorithms/JarvisMarch.js";
import { QuickHull } from "./algorithms/QuickHull.js";
import { mergeSort } from "./lib/mergeSort.js";
import { drawConvexHull } from "./rendering/drawConvexHull.js";
import { drawPoints } from "./rendering/drawPoints.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const algorithmSelect = document.getElementById('algorithmSelect');
const currentAlgorithmText = document.getElementById('currentAlgorithm');

// ENTRY POINT //
function main() {
    console.log('program start');

    let currentAlgorithm = GrahamScan;

    const S = [
        { x: 200, y: 200 },
        { x: 100, y: 200 },
        { x: 200, y: 100 },
        { x: 150, y: 500 },
        { x: 300, y: 300 },
        { x: 50,  y: 300 },
        { x: 100, y: 100 },
        { x: 150, y: 150 },
        { x: 150, y: 450 },
    ];

    drawPoints(ctx, S);

    let convexHull = currentAlgorithm.construct(S);

    drawConvexHull(ctx, convexHull);

    // EVENTS //
    canvas.addEventListener('click', (event) => {
        for (const point of S) {
            if (point.x == event.x && point.y == event.y) {
                return;
            }
        }
        
        clearCanvas();

        S.push({ x: event.x, y: event.y });

        drawPoints(ctx, S);

        let convexHull = currentAlgorithm.construct(S);

        drawConvexHull(ctx, convexHull);
    });

    algorithmSelect.addEventListener('change', (event) => {

        currentAlgorithmText.innerText = event.target.value;

        switch (event.target.value) {
            case 'Graham\'s Scan':
                currentAlgorithm = GrahamScan;
                break;

            case 'Jarvis\'s March':
                currentAlgorithm = JarvisMarch;
                break;

            case 'QuickHull':
                currentAlgorithm = QuickHull;
                break;
            
            case 'MergeHull':
                currentAlgorithm = MergeHull;
                break;
        }

        clearCanvas();

        drawPoints(ctx, S);

        let convexHull = currentAlgorithm.construct(S);

        drawConvexHull(ctx, convexHull);
    })
}

window.onload = main;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}