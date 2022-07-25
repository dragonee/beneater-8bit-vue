import sn7404 from "../logic/sn7404";
import sn7408 from "../logic/sn7408";
import sn7432 from "../logic/sn7432";

import { promisifyTimeout } from "../util";

export default {
  namespaced: true,

  state: {
    miliseconds: 500,

    astable: false,
    manualButton: false,

    manualMode: false,

    vcc: true,

    countdownMode: false,
    countdownCounter: 0,
  },

  modules: {
    notGates: sn7404({
      pin1: (s) => s.clock.manualMode,
      pin3: (s, g) => g.hlt,
    }),

    andGates: sn7408({
      pin1: (s) => s.clock.manualButton,
      pin2: (s) => s.clock.manualMode,

      pin4: (s, g) => g["clock/notGates/pin2"],
      pin5: (s) => s.clock.astable,

      // HLT + clock output
      pin9: (s, g) => g["clock/orGates/pin3"],
      pin10: (s, g) => g["clock/notGates/pin4"],
    }),

    orGates: sn7432({
      pin1: (s, g) => g["clock/andGates/pin3"],
      pin2: (s, g) => g["clock/andGates/pin6"],
    }),
  },

  getters: {
    output: (s, g) => g["andGates/pin8"],
  },

  mutations: {
    impulse(state, payload) {
      state.astable = payload;

      if (state.countdownMode && state.countdownCounter > 0 && state.astable) {
        state.countdownCounter -= 1;
      }

      if (state.countdownMode && state.countdownCounter === 0) {
        state.vcc = false;
        state.manualMode = true;
        state.countdownMode = false;
      }
    },

    selectManualMode(state, payload) {
      state.manualMode = payload;
    },

    setManualButton(state, payload) {
      state.manualButton = payload;
    },

    setMiliseconds(state, payload) {
      state.miliseconds = payload;
    },

    setVoltage(state, payload) {
      state.vcc = !!payload;
    },

    setCountdownMode(state, payload) {
      state.countdownMode = payload;
    },

    setCountdownCounter(state, payload) {
      state.countdownCounter = payload;
    },
  },

  actions: {
    async start({ state, commit }) {
      /* eslint-disable-next-line no-constant-condition */
      while (true) {
        await promisifyTimeout(state.miliseconds);

        if (!state.vcc) {
          continue;
        }

        if (state.countdownMode && state.countdownCounter === 0) {
          continue;
        }

        commit("impulse", !state.astable);
      }
    },
  },
};
