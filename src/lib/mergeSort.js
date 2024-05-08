import { calculateAngle } from "./calculateAngle.js";

export function mergeSort(points, pivot) {
    if (points.length <= 1) {
        return points;
    }
  
    const middle = Math.floor(points.length / 2);
    const left = points.slice(0, middle);
    const right = points.slice(middle);
  
    return merge(mergeSort(left, pivot), mergeSort(right, pivot), pivot);
}
  
function merge(left, right, pivot) {
    const merged = [];
    let i = 0;
    let j = 0;

    if (left[0].x == pivot.x && left[0].y == pivot.y) {
        merged.push(pivot);
        i = 1;
    }
  
    while (i < left.length && j < right.length) {
        const angleLeft = calculateAngle(left[i], pivot);
        const angleRight = calculateAngle(right[j], pivot);
  
        if (angleLeft < angleRight) {
            merged.push(left[i++]);
        } else {
            merged.push(right[j++]);
        }
    }
  
    merged.push(...left.slice(i));
    merged.push(...right.slice(j));
  
    return merged;
}
