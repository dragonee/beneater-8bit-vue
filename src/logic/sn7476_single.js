const nextState = (j, k, current) => {
  let currentState = current;
  if (typeof current === "undefined") {
    currentState = Math.random() >= 0.5;
  }

  if (j && !k) {
    return true;
  } else if (!j && k) {
    return false;
  } else if (j) {
    return !currentState;
  }

  return currentState;
};

export default ({
  CLK = "CLK",

  PRE = "PRE",
  CLR = "CLR",

  j = () => undefined,
  k = () => undefined,
}) => ({
  namespaced: true,

  state: () => ({
    master: false,
    slave: false,
  }),

  mutations: {
    setMaster(state, payload) {
      state.master = payload;
    },

    setSlave(state, payload) {
      state.slave = payload;
    },
  },

  actions: {
    [CLK]: {
      root: true,
      /* eslint-disable-next-line object-curly-newline */
      handler({ state, rootState, rootGetters, commit }, payload) {
        if (payload.rising) {
          commit(
            "setMaster",
            nextState(
              j(rootState, rootGetters),
              k(rootState, rootGetters),
              state.slave
            )
          );

          return;
        }

        if (state.slave !== state.master) {
          commit("setSlave", state.master);
        }
      },
    },

    [CLR]: {
      root: true,
      handler({ commit }) {
        commit("setMaster", false);
        commit("setSlave", false);
      },
    },

    [PRE]: {
      root: true,
      handler({ commit }) {
        commit("setMaster", true);
        commit("setSlave", true);
      },
    },
  },

  getters: {
    q: (s) => s.slave,
    q〇: (s) => !s.slave,
  },
});
