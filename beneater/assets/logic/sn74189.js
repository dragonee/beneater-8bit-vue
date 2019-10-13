import { addrToOffset as addr } from '../util';

// fill array with values
const n = (k) => Array(k).fill(false);

export default ({
    pin1 = () => undefined, // A0
    pin15 = () => undefined,
    pin14 = () => undefined,
    pin13 = () => undefined, // ...A3

    pin2 = () => undefined, // CS_
    pin3 = 'WE', // WE_

    pin4 = () => undefined, // D0
    pin6 = () => undefined,
    pin10 = () => undefined,
    pin12 = () => undefined, // D3
}) => ({
    namespaced: true,

    state: () => ({
        words: Array(16).fill(null).map(() => n(4)),
    }),

    mutations: {
        setState(state, payload) {
            const newWords = state.words.map((word) => [...word]);

            newWords[addr(payload.address)] = [
                ...payload.word,
            ];

            state.words = newWords;
        },
    },

    actions: {
        [pin3]: {
            root: true,
            handler({ rootState, rootGetters, commit }) {
                if (!pin2(rootState, rootGetters)) {
                    commit('setState', {
                        address: [
                            pin1(rootState, rootGetters),
                            pin15(rootState, rootGetters),
                            pin14(rootState, rootGetters),
                            pin13(rootState, rootGetters),
                        ],

                        word: [
                            pin4(rootState, rootGetters),
                            pin6(rootState, rootGetters),
                            pin10(rootState, rootGetters),
                            pin12(rootState, rootGetters),
                        ],
                    });
                }
            },
        },
    },

    getters: {
        currentWord: (s, g, rs, rg) => {
            if (pin2(rs, rg)) {
                return [undefined, undefined, undefined, undefined];
            }

            return s.words[addr([
                pin1(rs, rg),
                pin15(rs, rg),
                pin14(rs, rg),
                pin13(rs, rg),
            ])].map((x) => !x);
        },

        pin5: (s, g) => g.currentWord[0],
        pin7: (s, g) => g.currentWord[1],
        pin9: (s, g) => g.currentWord[2],
        pin11: (s, g) => g.currentWord[3],
    },
});
