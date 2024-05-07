export function randomGenerator(S, number) {
    for (let i = 0; i < number; i++) {
        const x = Math.floor(Math.random() * (1800 - 10 + 1)) + 0;
        const y = Math.floor(Math.random() * (920 - 80 + 1)) + 70;
        S.push({x: x, y: y});
    }
    console.log(S);
}