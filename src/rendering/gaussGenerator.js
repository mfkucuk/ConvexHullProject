export function gaussGenerator(S, number, meanX = 895, stdDevX = 400, meanY = 420, stdDevY = 180) {
  function randomGaussian() {
      let u = 0, v = 0, s;
      do {
          u = Math.random() * 2 - 1;
          v = Math.random() * 2 - 1;
          s = u * u + v * v;
      } while (s >= 1 || s === 0);

      const mul = Math.sqrt(-2.0 * Math.log(s) / s);
      const x = u * mul;
      return x;
  }

  for (let i = 0; i < number; i++) {
      let x, y;
      x = meanX + stdDevX * randomGaussian();
      y = meanY + stdDevY * randomGaussian();

      S.push({x, y});
  }
}