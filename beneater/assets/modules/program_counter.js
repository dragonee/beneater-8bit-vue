import sn74245 from '../logic/sn74245';
import sn74161 from '../logic/sn74161';

export default ({
    namespace,
    co,
    ce,
    j,
    CLK = 'CLK',
    CLR = 'CLR',
}) => ({
    namespaced: true,

    state: {
    },

    getters: {
        out(state, getters) {
            return [
                getters['counter/pin14'],
                getters['counter/pin13'],
                getters['counter/pin12'],
                getters['counter/pin11'],
            ];
        },

        bus(state, getters) {
            return [
                getters['buffer/pin18'],
                getters['buffer/pin17'],
                getters['buffer/pin16'],
                getters['buffer/pin15'],
                false,
                false,
                false,
                false,
            ];
        },
    },

    modules: {
        buffer: sn74245({
            pin1: () => true,

            pin2: (s, g) => g[`${namespace}/counter/pin14`], // 2^^0
            pin3: (s, g) => g[`${namespace}/counter/pin13`],
            pin4: (s, g) => g[`${namespace}/counter/pin12`],
            pin5: (s, g) => g[`${namespace}/counter/pin11`],

            pin19: (s, g) => g[co],
        }),

        counter: sn74161({
            pin1: CLR,
            pin2: CLK,

            pin3: (s, g) => g.bus[0], // A
            pin4: (s, g) => g.bus[1],
            pin5: (s, g) => g.bus[2],
            pin6: (s, g) => g.bus[3], // D

            pin7: (s, g) => g[ce],
            pin9: (s, g) => g[j],
            pin10: (s, g) => g[ce],

            pin15: () => false,
        }),

    },
});
