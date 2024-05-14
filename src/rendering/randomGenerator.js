export function randomGenerator(S, number, windowWidth, windowHeight) {
    for (let i = 0; i < number; i++) {
        const x = Math.random() * (windowWidth + 1) + 0;
        const y = Math.random() * (920 - 80 + 1) + 70;
        S.push({x: x, y: y});
    }
    console.log(S);
}