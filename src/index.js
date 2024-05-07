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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const grahamButton = document.getElementById('graham');
const jarvisButton = document.getElementById('jarvis');
const quickButton = document.getElementById('quick');
const mergeButton = document.getElementById('merge');

const currentAlgorithmText = document.getElementById('currentAlgorithm');
const animationCheckbox = document.getElementById('animation');
const runButton = document.getElementById('runButton');
const clearButton = document.getElementById('clearButton');
const resetButton = document.getElementById('resetButton');

const pointCount = document.getElementById('pointCount');
const pointCountOnHull = document.getElementById('pointCountOnHull');

// ENTRY POINT //
async function main() {
    console.log('program start');

    let currentAlgorithm = GrahamScan;

    const S = [];

    // EVENTS //
    canvas.addEventListener('click', async (event) => {

        const x = event.x - parseInt(canvas.getBoundingClientRect().left);
        const y = event.y - parseInt(canvas.getBoundingClientRect().top);

        for (const point of S) {
            if (point.x == x && point.y == y) {
                return;
            }
        }
        
        S.push({ x: x, y: y });
        
        drawPoints(ctx, S);
    });

    grahamButton.addEventListener('click', async () => {
        currentAlgorithmText.innerText = 'Graham\'s Scan';

        currentAlgorithm = GrahamScan;
    });

    jarvisButton.addEventListener('click', async () => {
        currentAlgorithmText.innerText = 'Jarvis\'s March';

        currentAlgorithm = JarvisMarch;
    });

    quickButton.addEventListener('click', async () => {
        currentAlgorithmText.innerText = 'QuickHull';

        currentAlgorithm = QuickHull;
    });

    mergeButton.addEventListener('click', async () => {
        currentAlgorithmText.innerText = 'MergeHull';

        currentAlgorithm = MergeHull;        
    });

    animationCheckbox.addEventListener('change', (event) => {
        globals.isAnimationEnabled = animationCheckbox.checked;
    });

    runButton.addEventListener('click', async () => {
        let convexHull = await currentAlgorithm.construct(S);

        drawConvexHull(ctx, convexHull, S);

        pointCount.innerText = `${S.length}`;
        pointCountOnHull.innerText = `${convexHull.points.length}`
    });

    clearButton.addEventListener('click', () => {
        while (S.length > 0) {
            S.pop();
        }

        clearCanvas(ctx);
        drawPoints(ctx, S);
    });    

    resetButton.addEventListener('click', () => {
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });
}

export const globals = {
    isAnimationEnabled: isAnimationEnabled,
    ctx: ctx,
};

window.onload = main;