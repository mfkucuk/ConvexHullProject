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
      do {
        x = meanX + stdDevX * randomGaussian();
      } while (x < 10 || x > 1790)
      do {
        y = meanY + stdDevY * randomGaussian();
      } while ( y < 80 || y > 920)

      S.push({x, y});
  }
}