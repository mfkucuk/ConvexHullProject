import { ConvexHull } from "./ConvexHull.js";
import { GrahamScan } from "./algorithms/GrahamScan.js";
import { JarvisMarch } from "./algorithms/JarvisMarch.js";
import { QuickHull } from "./algorithms/QuickHull.js";
import { mergeSort } from "./lib/mergeSort.js";
import { drawConvexHull } from "./rendering/drawConvexHull.js";
import { drawPoints } from "./rendering/drawPoints.js";
import { MergeHull } from "./algorithms/MergeHull.js";
import { clearCanvas } from "./rendering/clearCanvas.js";

let isAnimationEnabled = false;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const algorithmSelect = document.getElementById('algorithmSelect');
const currentAlgorithmText = document.getElementById('currentAlgorithm');
const animationCheckbox = document.getElementById('animation');

// ENTRY POINT //
async function main() {
    console.log('program start');

    let currentAlgorithm = GrahamScan;

    const S = [
        { x: 200, y: 200 },
        { x: 100, y: 200 },
        { x: 200, y: 100 },
        { x: 151, y: 500 },
        { x: 300, y: 300 },
        { x: 50,  y: 300 },
        { x: 100, y: 100 },
        { x: 150, y: 150 },
        { x: 149, y: 450 },
    ];

    let convexHull = await currentAlgorithm.construct(S);

    drawConvexHull(ctx, convexHull, S);

    // EVENTS //
    canvas.addEventListener('click', async (event) => {
        for (const point of S) {
            if (point.x == event.x && point.y == event.y) {
                return;
            }
        }
        
        S.push({ x: event.x, y: event.y });

        let convexHull = await currentAlgorithm.construct(S);

        drawConvexHull(ctx, convexHull, S);
    });

    algorithmSelect.addEventListener('change', async (event) => {

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

        let convexHull = await currentAlgorithm.construct(S);

        drawConvexHull(ctx, convexHull, S);
    });

    animationCheckbox.addEventListener('change', (event) => {
        globals.isAnimationEnabled = animationCheckbox.checked;
    });
}

export const globals = {
    isAnimationEnabled: isAnimationEnabled,
    ctx: ctx,
};

window.onload = main;