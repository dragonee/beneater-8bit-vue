export default ({
    pin1 = 'CLR', // A0
    pin2 = 'CLK', // CS_

    pin3 = () => undefined, // A
    pin4 = () => undefined,
    pin5 = () => undefined,
    pin6 = () => undefined, // D

    pin7 = () => undefined, // ENP
    pin9 = () => undefined, // LOAD_
    pin10 = () => undefined, // ENT

}) => ({
    namespaced: true,

    state: () => ({
        counter: [false, false, false, false],
        rco: false,
    }),

    mutations: {
        setState(state, payload) {
            state.counter = [...payload];
        },

        nextState(state, payload) {
            let carry = true;

            const newArr = [...state.counter];

            for (let i = 0; i < 4; i += 1) {
                if (carry && newArr[i]) {
                    newArr[i] = false;
                } else if (carry || newArr[i]) {
                    newArr[i] = true;
                    carry = false;
                } else {
                    newArr[i] = false;
                    carry = false;
                }
            }

            state.counter = newArr;

            state.rco = (
                state.counter[0]
                && state.counter[1]
                && state.counter[2]
                && state.counter[3]
                && payload.rco
            );
        },

        reset(state) {
            state.counter = [false, false, false, false];
            state.rco = false;
        },
    },

    actions: {
        [pin2]: {
            root: true,
            handler({ rootState, rootGetters, commit }, payload) {
                if (!payload.rising) {
                    return;
                }

                if (!pin9(rootState, rootGetters)) {
                    commit('setState', [
                        pin3(rootState, rootGetters),
                        pin4(rootState, rootGetters),
                        pin5(rootState, rootGetters),
                        pin6(rootState, rootGetters),
                    ]);

                    return;
                }

                if (pin7(rootState, rootGetters) && pin10(rootState, rootGetters)) {
                    commit('nextState', {
                        rco: pin10(rootState, rootGetters),
                    });
                }
            },
        },

        [pin1]: {
            root: true,
            handler({ commit }) {
                commit('reset');
            },
        },
    },

    getters: {
        pin14: (s) => s.counter[0],
        pin13: (s) => s.counter[1],
        pin12: (s) => s.counter[2],
        pin11: (s) => s.counter[3],

        pin15: (s) => s.rco,
    },
});
