import sn74161 from "../logic/sn74161";
import sn74138 from "../logic/sn74138";

import sn7400 from "../logic/sn7400";
import sn7404 from "../logic/sn7404";
import at28c16 from "../logic/at28c16";

import { promisifyTimeout } from "../util";

export default ({ namespace, cf, zf, ir, CLK = "CLK" }) => ({
  namespaced: true,

  state: {
    resetButton: false,
  },

  getters: {
    out(state, g) {
      return {
        hlt: g["memoryHigh/pin17"],
        mi: g["inverterHigh/pin2"],
        ri: g["memoryHigh/pin15"],
        ro: g["inverterHigh/pin4"],
        io: g["inverterHigh/pin6"],
        ii: g["inverterHigh/pin12"],
        ai: g["inverterHigh/pin10"],
        ao: g["inverterHigh/pin8"],
        eo: g["inverterLow/pin2"],
        su: g["memoryLow/pin16"],
        bi: g["inverterLow/pin4"],
        oi: g["memoryLow/pin14"],
        ce: g["memoryLow/pin13"],
        co: g["inverterLow/pin12"],
        j: g["inverterLow/pin10"],
        fi: g["inverterLow/pin6"],
      };
    },

    outPositive(state, g) {
      return [
        g["memoryLow/pin9"],
        g["memoryLow/pin10"],
        g["memoryLow/pin11"],
        g["memoryLow/pin13"],
        g["memoryLow/pin14"],
        g["memoryLow/pin15"],
        g["memoryLow/pin16"],
        g["memoryLow/pin17"],
        g["memoryHigh/pin9"],
        g["memoryHigh/pin10"],
        g["memoryHigh/pin11"],
        g["memoryHigh/pin13"],
        g["memoryHigh/pin14"],
        g["memoryHigh/pin15"],
        g["memoryHigh/pin16"],
        g["memoryHigh/pin17"],
      ];
    },

    outPositiveLabels() {
      return [
        "FI",
        "J",
        "CO",
        "CE",
        "OI",
        "BI",
        "SU",
        "EO",
        "AO",
        "AI",
        "II",
        "IO",
        "RO",
        "RI",
        "MI",
        "HLT",
      ];
    },

    binaryMicroinstruction(state, g) {
      return [
        g["microinstructionCounter/pin14"],
        g["microinstructionCounter/pin13"],
        g["microinstructionCounter/pin12"],
      ];
    },

    decodedMicroinstruction(state, g) {
      return [
        g["microinstructionDecoder/pin15"],
        g["microinstructionDecoder/pin14"],
        g["microinstructionDecoder/pin13"],
        g["microinstructionDecoder/pin12"],
        g["microinstructionDecoder/pin11"],
      ];
    },

    clr(state, getters) {
      return getters["resetNand/pin11"];
    },

    clr〇(state, getters) {
      return getters["resetNand/pin8"];
    },
  },

  mutations: {
    setResetButton(state, payload) {
      state.resetButton = payload;
    },
  },

  actions: {
    async pressResetButton({ commit }) {
      commit("setResetButton", true);

      await promisifyTimeout(100);

      commit("setResetButton", false);
    },
  },

  modules: {
    microinstructionDecoder: sn74138({
      pin1: (s, g) => g[`${namespace}/microinstructionCounter/pin14`],
      pin2: (s, g) => g[`${namespace}/microinstructionCounter/pin13`],
      pin3: (s, g) => g[`${namespace}/microinstructionCounter/pin12`],

      pin6: () => true,
      pin5: () => false,
      pin4: () => false,
    }),

    microinstructionCounter: sn74161({
      pin1: "C_MICROINSTRUCTION_CLR",
      pin2: CLK,

      pin7: () => true,
      pin9: () => true,
      pin10: () => true,
    }),

    // ao, ai, ii, io, ro, ri, mi, hlt
    memoryHigh: at28c16({
      pin21: "C_MICROINSTRUCTION_WE",

      pin8: (s, g) => g[`${namespace}/microinstructionCounter/pin14`],
      pin7: (s, g) => g[`${namespace}/microinstructionCounter/pin13`],
      pin6: (s, g) => g[`${namespace}/microinstructionCounter/pin12`],
      pin5: (s, g) => g[ir][4],
      pin4: (s, g) => g[ir][5],
      pin3: (s, g) => g[ir][6],
      pin2: (s, g) => g[ir][7],
      pin1: () => false,
      pin23: (s, g) => g[cf],
      pin22: (s, g) => g[zf],
      pin19: () => false,

      pin20: () => false,
      pin18: () => false,
    }),

    // fi, j, co, ce, oi, bi, su, eo
    memoryLow: at28c16({
      // XXX TODO?
      pin21: "C_MICROINSTRUCTION_WE",

      pin8: (s, g) => g[`${namespace}/microinstructionCounter/pin14`],
      pin7: (s, g) => g[`${namespace}/microinstructionCounter/pin13`],
      pin6: (s, g) => g[`${namespace}/microinstructionCounter/pin12`],
      pin5: (s, g) => g[ir][4],
      pin4: (s, g) => g[ir][5],
      pin3: (s, g) => g[ir][6],
      pin2: (s, g) => g[ir][7],
      pin1: () => true,
      pin23: (s, g) => g[cf],
      pin22: (s, g) => g[zf],
      pin19: () => false,

      pin20: () => false,
      pin18: () => false,
    }),

    inverterHigh: sn7404({
      pin1: (s, g) => g[`${namespace}/memoryHigh/pin16`],
      pin3: (s, g) => g[`${namespace}/memoryHigh/pin14`],
      pin5: (s, g) => g[`${namespace}/memoryHigh/pin13`],
      pin9: (s, g) => g[`${namespace}/memoryHigh/pin9`],
      pin11: (s, g) => g[`${namespace}/memoryHigh/pin10`],
      pin13: (s, g) => g[`${namespace}/memoryHigh/pin11`],
    }),

    inverterLow: sn7404({
      pin1: (s, g) => g[`${namespace}/memoryLow/pin17`],
      pin3: (s, g) => g[`${namespace}/memoryLow/pin15`],
      pin5: (s, g) => g[`${namespace}/memoryLow/pin9`],
      pin11: (s, g) => g[`${namespace}/memoryLow/pin10`],
      pin13: (s, g) => g[`${namespace}/memoryLow/pin11`],
    }),

    resetNand: sn7400({
      pin1: (s, g) => g[`${namespace}/resetNand/pin6`],
      pin2: (s, g) => g[`${namespace}/resetNand/pin6`],

      pin4: (s, g) => g[`${namespace}/resetNand/pin8`],
      pin5: (s, g) => g[`${namespace}/microinstructionDecoder/pin10`],

      pin9: (s) => s[namespace].resetButton,
      pin10: (s) => s[namespace].resetButton,

      pin12: (s, g) => g[`${namespace}/resetNand/pin8`],
      pin13: (s, g) => g[`${namespace}/resetNand/pin8`],
    }),
  },
});
