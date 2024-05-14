export function randomGenerator(S, number, windowWidth, windowHeight) {
    for (let i = 0; i < number; i++) {
        const x = Math.random() * (windowWidth - windowWidth / 20) + windowWidth * 1 / 200;
        const y = Math.random() * (windowHeight - windowHeight * 4 / 40) + windowHeight * 8 / 100;
        S.push({x: x, y: y});
    }
    console.log(S);
}