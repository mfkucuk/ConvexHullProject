export class ConvexHull {

    #points;

    constructor() {
        this.#points = [];
    }

    get points() {
        return this.#points;
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