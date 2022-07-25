export default ({
  pin1 = () => undefined, // A
  pin2 = () => undefined, // B
  pin3 = () => undefined, // C

  pin4 = () => undefined, // G2A
  pin5 = () => undefined, // G2B
  pin6 = () => undefined, // G1
}) => ({
  namespaced: true,

  getters: {
    output: (s, g, rs, rg) => {
      const arr = [true, true, true, true, true, true, true, true];

      if (!pin6(rs, rg) || pin5(rs, rg) || pin4(rs, rg)) {
        return arr;
      }

      const offset = pin1(rs, rg) + 2 * pin2(rs, rg) + 4 * pin3(rs, rg);

      arr[offset] = false;

      return arr;
    },

    pin15: (s, g) => g.output[0],
    pin14: (s, g) => g.output[1],
    pin13: (s, g) => g.output[2],
    pin12: (s, g) => g.output[3],
    pin11: (s, g) => g.output[4],
    pin10: (s, g) => g.output[5],
    pin9: (s, g) => g.output[6],
    pin7: (s, g) => g.output[7],
  },
});
