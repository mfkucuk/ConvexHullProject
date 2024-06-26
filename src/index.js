import { GrahamScan } from "./algorithms/GrahamScan.js";
import { JarvisMarch } from "./algorithms/JarvisMarch.js";
import { QuickHull } from "./algorithms/QuickHull.js";
import { drawConvexHull } from "./rendering/drawConvexHull.js";
import { drawPoints } from "./rendering/drawPoints.js";
import { MergeHull } from "./algorithms/MergeHull.js";
import { clearCanvas } from "./rendering/clearCanvas.js";
import { randomGenerator } from "./rendering/randomGenerator.js";
import { gaussGenerator } from "./rendering/gaussGenerator.js";

let isAnimationEnabled = false;
let isAnimationPlaying = false;
let animationSpeed = 1;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth - (window.innerWidth / 20);
canvas.height = window.innerHeight - (window.innerHeight / 20) ;

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

const zoomSlider = document.getElementById('zoomSlider');

const btn1k = document.getElementById('1k');
const btn10k = document.getElementById('10k');
const btn100k = document.getElementById('100k');
const btn1m = document.getElementById('1m');
const btn1kg = document.getElementById('1kg');
const btn10kg = document.getElementById('10kg');
const btn100kg = document.getElementById('100kg');
const btn1mg = document.getElementById('1mg');

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// ENTRY POINT //
async function main() {
    console.log('program start');

    let currentAlgorithm = GrahamScan;
    const S = [];

    // EVENTS //
    canvas.addEventListener('click', async (event) => {
        if (!isAnimationPlaying) {
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
        }
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
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";

        if (globals.isAnimationEnabled) {
            runButton.disabled = true;
            clearButton.disabled = true;
            resetButton.disabled = true;
            isAnimationPlaying = true;

            console.log(clearButton.disabled);
        }

        const startTime = Date.now(); 
        
        pointCountOnHull.innerText = '0';
        
        if (currentAlgorithm == MergeHull) {
            currentAlgorithm.reset();
        }

        let convexHull = await currentAlgorithm.construct(S);

        drawConvexHull(ctx, convexHull, S);

        pointCountOnHull.innerText = `${convexHull.points.length}`;

        const endTime = Date.now();

        const elapsedTimeMs = endTime - startTime;

        secondsEl.innerText = `${((elapsedTimeMs / 1000) % 60).toFixed(2)}`;
        minutesEl.innerText = `${parseInt(elapsedTimeMs / 60000)}`;

        runButton.disabled = false;
        clearButton.disabled = false;
        resetButton.disabled = false;
        isAnimationPlaying = false;
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

    zoomSlider.addEventListener('input', () => {
        const zoomLevel = zoomSlider.value;
        const zoomOptions = [0.25, 0.5, 1, 2, 4]; 
        globals.animationSpeed = 1 / zoomOptions[zoomLevel];
    });

    btn1k.addEventListener('click', () => {
        
        randomGenerator(S, 1000, canvas.width, canvas.height);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });
    
    btn10k.addEventListener('click', () => {
        
        randomGenerator(S, 10000, canvas.width, canvas.height);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn100k.addEventListener('click', () => {
        
        randomGenerator(S, 100000, canvas.width, canvas.height);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn1m.addEventListener('click', () => {
        
        randomGenerator(S, 1000000, canvas.width, canvas.height);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn1kg.addEventListener('click', () => {
        
        gaussGenerator(S, 1000, canvas.width/2, canvas.width/9, canvas.height/2, canvas.height/9);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn10kg.addEventListener('click', () => {
        
        gaussGenerator(S, 10000, canvas.width/2, canvas.width/9, canvas.height/2, canvas.height/9);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
        console.log(S);
    });

    btn100kg.addEventListener('click', () => {
        
        gaussGenerator(S, 100000, canvas.width/2, canvas.width/9, canvas.height/2, canvas.height/9);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn1mg.addEventListener('click', () => {
        
        gaussGenerator(S, 1000000, canvas.width/2, canvas.width/9, canvas.height/2, canvas.height/9);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });
}

export const globals = {
    isAnimationEnabled: isAnimationEnabled,
    ctx: ctx,
    animationSpeed: animationSpeed,
};

window.onload = main;