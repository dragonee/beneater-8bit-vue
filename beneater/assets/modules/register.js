import sn74245 from '../logic/sn74245';
import sn74173 from '../logic/sn74173';

export default ({
    namespace,
    ri,
    ro,
    CLK = 'CLK',
    CLR = 'CLR',
}) => ({
    namespaced: true,

    state: {
    },

    getters: {
        bus(state, getters) {
            return [
                getters['buffer/pin11'],
                getters['buffer/pin12'],
                getters['buffer/pin13'],
                getters['buffer/pin14'],
                getters['buffer/pin15'],
                getters['buffer/pin16'],
                getters['buffer/pin17'],
                getters['buffer/pin18'],
            ];
        },

        out(state, getters) {
            return [
                getters['latchBottom/pin3'],
                getters['latchBottom/pin4'],
                getters['latchBottom/pin5'],
                getters['latchBottom/pin6'],
                getters['latchTop/pin3'],
                getters['latchTop/pin4'],
                getters['latchTop/pin5'],
                getters['latchTop/pin6'],
            ];
        },
    },

    modules: {
        buffer: sn74245({
            pin1: () => true,

            pin2: (s, g) => g[`${namespace}/latchTop/pin6`], // 2^^7
            pin3: (s, g) => g[`${namespace}/latchTop/pin5`],
            pin4: (s, g) => g[`${namespace}/latchTop/pin4`],
            pin5: (s, g) => g[`${namespace}/latchTop/pin3`],
            pin6: (s, g) => g[`${namespace}/latchBottom/pin6`],
            pin7: (s, g) => g[`${namespace}/latchBottom/pin5`],
            pin8: (s, g) => g[`${namespace}/latchBottom/pin4`],
            pin9: (s, g) => g[`${namespace}/latchBottom/pin3`], // 2^^0

            pin19: (s, g) => g[ro],
        }),

        latchTop: sn74173({
            pin7: CLK,
            pin15: CLR,

            pin9: (s, g) => g[ri],
            pin10: (s, g) => g[ri],

            pin1: () => false,
            pin2: () => false,

            pin14: (s, g) => g.bus[4],
            pin13: (s, g) => g.bus[5],
            pin12: (s, g) => g.bus[6],
            pin11: (s, g) => g.bus[7],
        }),

        latchBottom: sn74173({
            pin7: CLK,
            pin15: CLR,

            pin9: (s, g) => g[ri],
            pin10: (s, g) => g[ri],

            pin1: () => false,
            pin2: () => false,

            pin14: (s, g) => g.bus[0],
            pin13: (s, g) => g.bus[1],
            pin12: (s, g) => g.bus[2],
            pin11: (s, g) => g.bus[3],
        }),
    },
});
