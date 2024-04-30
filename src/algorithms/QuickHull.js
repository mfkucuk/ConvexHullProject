export class QuickHull {

    /**
     * 
     * Generates a convex hull for a set of given points using Quick Hull algorithm.
     * 
     * @param {Object[]} S - List of points to generate the convex hull. 
     */
    static construct(S) {

        let lowestXPoint = { x: Number.MAX_SAFE_INTEGER, y: 0 };
        let highestXPoint = { x: Number.MIN_SAFE_INTEGER, y: 0 };
        
        for (const point of S) {
            if (lowestXPoint.x > point.x) {
                lowestXPoint.x = point.x;
                lowestXPoint.y = point.y;
            }

            if (highestXPoint < point.x) {
                highestXPoint.x = point.x;
                highestXPoint.y = point.y;
            }
        }
    }

}