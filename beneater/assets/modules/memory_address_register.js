import sn74157 from '../logic/sn74157';
import sn74173 from '../logic/sn74173';

export default ({
    namespace,
    mi,
    CLK = 'CLK',
    CLR = 'CLR',
}) => ({
    namespaced: true,

    state: {
        manualAddressingMode: false,
        address: [false, false, false, false],
    },

    getters: {
        addr(state, getters) {
            return [
                getters['multiplexer/pin12'],
                getters['multiplexer/pin9'],
                getters['multiplexer/pin7'],
                getters['multiplexer/pin4'],
            ];
        },

        // is program being executed?
        prog(state) {
            return !state.manualAddressingMode;
        },

        a0: (state, getters) => getters.addr[0],
        a1: (state, getters) => getters.addr[1],
        a2: (state, getters) => getters.addr[2],
        a3: (state, getters) => getters.addr[3],
    },

    modules: {
        multiplexer: sn74157({
            pin1: (s, g) => g[`${namespace}/prog`],

            pin2: (s) => s[namespace].address[3],
            pin3: (s, g) => g[`${namespace}/latch/pin6`],
            pin5: (s) => s[namespace].address[2],
            pin6: (s, g) => g[`${namespace}/latch/pin5`],
            pin11: (s) => s[namespace].address[1],
            pin10: (s, g) => g[`${namespace}/latch/pin4`],
            pin14: (s) => s[namespace].address[0],
            pin13: (s, g) => g[`${namespace}/latch/pin3`], // 2^^0

            pin15: () => false,
        }),

        latch: sn74173({
            pin7: CLK,
            pin15: CLR,

            pin9: (s, g) => g[mi],
            pin10: (s, g) => g[mi],

            pin1: () => false,
            pin2: () => false,

            pin14: (s, g) => g.bus[0],
            pin13: (s, g) => g.bus[1],
            pin12: (s, g) => g.bus[2],
            pin11: (s, g) => g.bus[3],
        }),
    },

    mutations: {
        setAddr(state, payload) {
            const newArr = [...state.address];

            newArr[payload.key] = !newArr[payload.key];

            state.address = newArr;
        },

        setAddrWord(state, payload) {
            state.address = [...payload];
        },

        setManualAddressingMode(state, payload) {
            state.manualAddressingMode = payload;
        },
    },
});
