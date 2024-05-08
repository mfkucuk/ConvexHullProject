export function gaussGenerator(S, number, meanX = 905, stdDevX = 1790, meanY = 420, stdDevY = 840) {
    // Function to generate a single standard normal random variate using Box-Muller transform
    function randomGaussian() {
      let u = 0, v = 0;
      while (u === 0) u = Math.random(); // While u is 0, regenerate
      while (v === 0) v = Math.random();
      const s = u + v - 1;
      const mul = Math.sqrt( s / -2.0 );
      const x = u === 0 ? mul : mul * Math.cos(Math.PI * v);
      return x;
    }
  
    for (let i = 0; i < number; i++) {
      // Rejection sampling to ensure coordinates are within limits
      let x, y;
      do {
        x = meanX + stdDevX * randomGaussian();
      } while (x < 0 || x > 1800);
      do {
        y = meanY + stdDevY * randomGaussian();
      } while (y < 80 || y > 920);
  
      S.push({x, y});
    }
  }