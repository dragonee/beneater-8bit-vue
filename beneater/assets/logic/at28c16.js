import { addrToOffset as addr } from "../util";

// fill array with values
const n = (k) => Array(k).fill(false);

export default ({
  pin8 = () => undefined, // A0
  pin7 = () => undefined,
  pin6 = () => undefined,
  pin5 = () => undefined,
  pin4 = () => undefined,
  pin3 = () => undefined,
  pin2 = () => undefined,
  pin1 = () => undefined,
  pin23 = () => undefined,
  pin22 = () => undefined,
  pin19 = () => undefined, // ...A10

  pin20 = () => undefined, // OE_
  pin18 = () => undefined, // CE_
  pin21 = "WE", // WE_

  pin17 = () => undefined, // D7
  pin16 = () => undefined,
  pin15 = () => undefined,
  pin14 = () => undefined,
  pin13 = () => undefined,
  pin11 = () => undefined,
  pin10 = () => undefined,
  pin9 = () => undefined, // D0
}) => ({
  namespaced: true,

  state: () => ({
    words: Array(2048)
      .fill(null)
      .map(() => n(8)),
  }),

  mutations: {
    setState(state, payload) {
      state.words.splice(addr(payload.address), 1, [...payload.word]);
    },

    // XXX DEBUG
    setContents(state, payload) {
      state.words = payload;
    },
  },

  actions: {
    [pin21]: {
      root: true,
      handler({ rootState, rootGetters, commit }) {
        if (!pin18(rootState, rootGetters)) {
          commit("setState", {
            address: [
              pin8(rootState, rootGetters),
              pin7(rootState, rootGetters),
              pin6(rootState, rootGetters),
              pin5(rootState, rootGetters),
              pin4(rootState, rootGetters),
              pin3(rootState, rootGetters),
              pin2(rootState, rootGetters),
              pin1(rootState, rootGetters),
              pin23(rootState, rootGetters),
              pin22(rootState, rootGetters),
              pin19(rootState, rootGetters),
            ],

            word: [
              pin9(rootState, rootGetters),
              pin10(rootState, rootGetters),
              pin11(rootState, rootGetters),
              pin13(rootState, rootGetters),
              pin14(rootState, rootGetters),
              pin15(rootState, rootGetters),
              pin16(rootState, rootGetters),
              pin17(rootState, rootGetters),
            ],
          });
        }
      },
    },
  },

  getters: {
    currentWord: (s, g, rs, rg) => {
      if (pin18(rs, rg) || pin20(rs, rg)) {
        return [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ];
      }

      return s.words[
        addr([
          pin8(rs, rg),
          pin7(rs, rg),
          pin6(rs, rg),
          pin5(rs, rg),
          pin4(rs, rg),
          pin3(rs, rg),
          pin2(rs, rg),
          pin1(rs, rg),
          pin23(rs, rg),
          pin22(rs, rg),
          pin19(rs, rg),
        ])
      ];
    },

    pin9: (s, g) => g.currentWord[0],
    pin10: (s, g) => g.currentWord[1],
    pin11: (s, g) => g.currentWord[2],
    pin13: (s, g) => g.currentWord[3],
    pin14: (s, g) => g.currentWord[4],
    pin15: (s, g) => g.currentWord[5],
    pin16: (s, g) => g.currentWord[6],
    pin17: (s, g) => g.currentWord[7],
  },
});
