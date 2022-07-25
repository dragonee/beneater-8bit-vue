import sn74245 from "../logic/sn74245";
import sn74157 from "../logic/sn74157";
import sn74189 from "../logic/sn74189";
import sn7404 from "../logic/sn7404";
import sn7400 from "../logic/sn7400";

import { promisifyTimeout } from "../util";

export default ({ namespace, prog, ri, ro, a0, a1, a2, a3 }) => ({
  namespaced: true,

  state: {
    storeInMemoryButton〇: true, // act low
    switchState: [false, false, false, false, false, false, false, false],
  },

  getters: {
    memory(state, getters) {
      return [
        getters["inverterLow/pin2"],
        getters["inverterLow/pin4"],
        getters["inverterLow/pin6"],
        getters["inverterLow/pin8"],
        getters["inverterHigh/pin2"],
        getters["inverterHigh/pin4"],
        getters["inverterHigh/pin6"],
        getters["inverterHigh/pin8"],
      ];
    },

    bus(state, getters) {
      return [
        getters["buffer/pin18"],
        getters["buffer/pin17"],
        getters["buffer/pin16"],
        getters["buffer/pin15"],
        getters["buffer/pin14"],
        getters["buffer/pin13"],
        getters["buffer/pin12"],
        getters["buffer/pin11"],
      ];
    },
  },

  mutations: {
    setWriteToMemoryButton(state, payload) {
      state.storeInMemoryButton〇 = payload;
    },

    setSwitchState(state, payload) {
      const newArr = [...state.switchState];

      newArr[payload.key] = !newArr[payload.key];

      state.switchState = newArr;
    },

    setSwitchStateWord(state, payload) {
      state.switchState = [...payload];
    },
  },

  actions: {
    async pressWriteToMemoryButton({ commit }) {
      commit("setWriteToMemoryButton", false);
      await promisifyTimeout(100);
      commit("setWriteToMemoryButton", true);
    },
  },

  modules: {
    buffer: sn74245({
      pin1: () => true,

      pin2: (s, g) => g[`${namespace}/inverterLow/pin2`], // 2^^0
      pin3: (s, g) => g[`${namespace}/inverterLow/pin4`],
      pin4: (s, g) => g[`${namespace}/inverterLow/pin6`],
      pin5: (s, g) => g[`${namespace}/inverterLow/pin8`],
      pin6: (s, g) => g[`${namespace}/inverterHigh/pin2`],
      pin7: (s, g) => g[`${namespace}/inverterHigh/pin4`],
      pin8: (s, g) => g[`${namespace}/inverterHigh/pin6`],
      pin9: (s, g) => g[`${namespace}/inverterHigh/pin8`], // 2^^7

      pin19: (s, g) => g[ro],
    }),

    multiplexerHigh: sn74157({
      pin1: (s, g) => g[prog],

      pin2: (s) => s[namespace].switchState[7],
      pin3: (s, g) => g.bus[7],
      pin5: (s) => s[namespace].switchState[6],
      pin6: (s, g) => g.bus[6],
      pin11: (s) => s[namespace].switchState[5],
      pin10: (s, g) => g.bus[5],
      pin14: (s) => s[namespace].switchState[4],
      pin13: (s, g) => g.bus[4],

      pin15: () => false,
    }),

    multiplexerLow: sn74157({
      pin1: (s, g) => g[prog],

      pin2: (s) => s[namespace].switchState[3],
      pin3: (s, g) => g.bus[3],
      pin5: (s) => s[namespace].switchState[2],
      pin6: (s, g) => g.bus[2],
      pin11: (s) => s[namespace].switchState[1],
      pin10: (s, g) => g.bus[1],
      pin14: (s) => s[namespace].switchState[0],
      pin13: (s, g) => g.bus[0], // 2^^0

      pin15: () => false,
    }),

    memoryHigh: sn74189({
      pin2: () => false,
      WE: "WE",

      pin4: (s, g) => g[`${namespace}/multiplexerHigh/pin12`],
      pin6: (s, g) => g[`${namespace}/multiplexerHigh/pin9`],
      pin10: (s, g) => g[`${namespace}/multiplexerHigh/pin7`],
      pin12: (s, g) => g[`${namespace}/multiplexerHigh/pin4`],

      pin1: (s, g) => g[a0],
      pin15: (s, g) => g[a1],
      pin14: (s, g) => g[a2],
      pin13: (s, g) => g[a3],
    }),

    memoryLow: sn74189({
      pin2: () => false,
      WE: "WE",

      pin4: (s, g) => g[`${namespace}/multiplexerLow/pin12`],
      pin6: (s, g) => g[`${namespace}/multiplexerLow/pin9`],
      pin10: (s, g) => g[`${namespace}/multiplexerLow/pin7`],
      pin12: (s, g) => g[`${namespace}/multiplexerLow/pin4`],

      pin1: (s, g) => g[a0],
      pin15: (s, g) => g[a1],
      pin14: (s, g) => g[a2],
      pin13: (s, g) => g[a3],
    }),

    multiplexerManual: sn74157({
      pin1: (s, g) => g[prog],

      pin14: (s) => s[namespace].storeInMemoryButton〇,
      pin13: (s, g) => g[`${namespace}/clockGate/pin3`],

      pin15: () => false,
    }),

    clockGate: sn7400({
      pin1: (s, g) => g["clock/output"],
      pin2: (s, g) => g[ri],
    }),

    inverterHigh: sn7404({
      pin1: (s, g) => g[`${namespace}/memoryHigh/pin5`],
      pin3: (s, g) => g[`${namespace}/memoryHigh/pin7`],
      pin5: (s, g) => g[`${namespace}/memoryHigh/pin9`],
      pin9: (s, g) => g[`${namespace}/memoryHigh/pin11`],
    }),

    inverterLow: sn7404({
      pin1: (s, g) => g[`${namespace}/memoryLow/pin5`],
      pin3: (s, g) => g[`${namespace}/memoryLow/pin7`],
      pin5: (s, g) => g[`${namespace}/memoryLow/pin9`],
      pin9: (s, g) => g[`${namespace}/memoryLow/pin11`],
    }),
  },
});
