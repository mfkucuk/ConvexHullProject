import { ConvexHull } from "./ConvexHull.js";
import { GrahamScan } from "./algorithms/GrahamScan.js";
import { JarvisMarch } from "./algorithms/JarvisMarch.js";
import { QuickHull } from "./algorithms/QuickHull.js";
import { mergeSort } from "./lib/mergeSort.js";
import { drawConvexHull } from "./rendering/drawConvexHull.js";
import { drawPoints } from "./rendering/drawPoints.js";
import { MergeHull } from "./algorithms/MergeHull.js";
import { clearCanvas } from "./rendering/clearCanvas.js";
import { randomGenerator } from "./rendering/randomGenerator.js";
import { gaussGenerator } from "./rendering/gaussGenerator.js";

let isAnimationEnabled = false;
let animationSpeed = 1;

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

const zoomSlider = document.getElementById('zoomSlider');

const btn1k = document.getElementById('1k');
const btn10k = document.getElementById('10k');
const btn100k = document.getElementById('100k');
const btn1m = document.getElementById('1m');
const btn1kg = document.getElementById('1kg');
const btn10kg = document.getElementById('10kg');
const btn100kg = document.getElementById('100kg');
const btn1mg = document.getElementById('1mg');

let seconds = 0;
let minutes = 0;
let intervalId = null;
let isTimerRunning = false; // Flag to track timer state

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

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
        seconds = 0;
        minutes = 0;
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        startTimer();
        
        pointCountOnHull.innerText = '0';
        
        let convexHull = await currentAlgorithm.construct(S);

        drawConvexHull(ctx, convexHull, S);

        pointCountOnHull.innerText = `${convexHull.points.length}`;

        stopTimer();
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
        
        randomGenerator(S, 1000);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });
    
    btn10k.addEventListener('click', () => {
        
        randomGenerator(S, 10000);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn100k.addEventListener('click', () => {
        
        randomGenerator(S, 100000);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn1m.addEventListener('click', () => {
        
        randomGenerator(S, 1000000);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn1kg.addEventListener('click', () => {
        
        gaussGenerator(S, 1000);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn10kg.addEventListener('click', () => {
        
        gaussGenerator(S, 10000);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
        console.log(S);
    });

    btn100kg.addEventListener('click', () => {
        
        gaussGenerator(S, 100000);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });

    btn1mg.addEventListener('click', () => {
        
        gaussGenerator(S, 1000000);
        pointCount.innerText = `${S.length}`;
        clearCanvas(ctx);
        drawPoints(ctx, S);
    });


    const updateTime = () => {
        seconds++;
      
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
        }
      
        minutesEl.textContent = minutes.toString().padStart(2, "0");
        secondsEl.textContent = seconds.toString().padStart(2, "0");
        console.log("Timer updated:", minutes, ":", seconds); // Add for debugging
      };
      
      const startTimer = () => {
        if (!isTimerRunning) {
          intervalId = setInterval(updateTime, 100); // Update every 1/10th of a second
          isTimerRunning = true;
        }
      };
      
      const stopTimer = () => {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
          isTimerRunning = false;
        }
    }
}

export const globals = {
    isAnimationEnabled: isAnimationEnabled,
    ctx: ctx,
    animationSpeed: animationSpeed,
};

window.onload = main;