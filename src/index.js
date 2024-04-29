import { ConvexHull } from "./ConvexHull.js";
import { GrahamScan } from "./algorithms/GrahamScan.js";
import { JarvisMarch } from "./algorithms/JarvisMarch.js";
import { mergeSort } from "./lib/mergeSort.js";

// ENTRY POINT //
function main() {
    console.log('program start');

    const S = [
        { x: 20, y: 20 },
        { x: 10, y: 20 },
        { x: 20, y: 10 },
        { x: 30, y: 30 },
        { x: 10, y: 10 },
        { x: 15, y: 15 }
    ];

    //let convexHull = GrahamScan.construct(S);
    let convexHull = JarvisMarch.construct(S);

    console.log(convexHull.points);
}

window.onload = main;