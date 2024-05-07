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

const dropdownButton = document.getElementById('dropbtn');

const grahamButton = document.getElementById('graham');
const jarvisButton = document.getElementById('jarvis');
const quickButton = document.getElementById('quick');
const mergeButton = document.getElementById('merge');

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

        pointCount.innerText = `${S.length}`;
        
        drawPoints(ctx, S);
    });

    grahamButton.addEventListener('mouseover', () => {
        dropdownButton.parentElement.classList.add('open');
    });

    grahamButton.addEventListener('mouseout', () => {
        dropdownButton.parentElement.classList.remove('open');
    });

    grahamButton.addEventListener('click', () => {
        runButton.innerText = 'Run Graham\'s Scan';

        currentAlgorithm = GrahamScan;
    });


    jarvisButton.addEventListener('mouseover', () => {
        dropdownButton.parentElement.classList.add('open');
    });

    jarvisButton.addEventListener('mouseout', () => {
        dropdownButton.parentElement.classList.remove('open');
    });

    jarvisButton.addEventListener('click', () => {
        runButton.innerText = 'Run Jarvis\'s March';

        currentAlgorithm = JarvisMarch;
    });

    quickButton.addEventListener('mouseover', () => {
        dropdownButton.parentElement.classList.add('open');
    });

    quickButton.addEventListener('mouseout', () => {
        dropdownButton.parentElement.classList.remove('open');
    });

    quickButton.addEventListener('click', () => {
        runButton.innerText = 'Run QuickHull';

        currentAlgorithm = QuickHull;
    });

    mergeButton.addEventListener('mouseover', () => {
        dropdownButton.parentElement.classList.add('open');
    });

    mergeButton.addEventListener('mouseout', () => {
        dropdownButton.parentElement.classList.remove('open');
    });

    mergeButton.addEventListener('click', () => {
        runButton.innerText = 'Run MergeHull';

        currentAlgorithm = MergeHull;        
    });

    animationCheckbox.addEventListener('change', (event) => {
        globals.isAnimationEnabled = animationCheckbox.checked;
    });

    runButton.addEventListener('click', async () => {
        let convexHull = await currentAlgorithm.construct(S);

        drawConvexHull(ctx, convexHull, S);

        pointCountOnHull.innerText = `${convexHull.points.length}`;
    });

    clearButton.addEventListener('click', () => {
        while (S.length > 0) {
            S.pop();
        }

        pointCount.innerText = '0';
        pointCountOnHull.innerText = '0';

        clearCanvas(ctx);
        drawPoints(ctx, S);
    });    

    resetButton.addEventListener('click', () => {
        pointCountOnHull.innerText = '0';

        clearCanvas(ctx);
        drawPoints(ctx, S);
    });
}

export const globals = {
    isAnimationEnabled: isAnimationEnabled,
    ctx: ctx,
};

window.onload = main;