import { mod } from "./lib/mod.js";

export class ConvexHull {

    #points;

    constructor() {
        this.#points = [];
    }

    get points() {
        return this.#points;
    }

    set points(newPoints) {
        this.#points = newPoints;
    }

    getPoint(index) {
        let temp = index;

        if (index >= this.#points.length || index < 0) {
            temp = mod(index, this.#points.length);
        }

        return this.#points[temp];
    }

    addPoint(x, y) {
        if (typeof y == 'undefined') {
            this.#points.push(x);
            return;
        }

        this.#points.push({ x: x, y: y });
    }

    removePoint(index) {
        if (this.#points.length < index) {
            throw new Error(`Index out of bounds: ${index}`);
        }

        this.#points.splice(index, 1);
    }
}