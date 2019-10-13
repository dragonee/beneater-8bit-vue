import JKFlipFlop from './sn7476_single';

export default ({
    pin1 = 'CLK', // 1CLK

    pin2 = 'PRE',
    pin3 = 'CLR',

    pin4 = () => undefined, // 1J
    pin16 = () => undefined, // 1K

    pin6 = 'CLK',

    pin7 = 'PRE',
    pin8 = 'CLR',

    pin9 = () => undefined, // 2J
    pin12 = () => undefined, // 2K
}) => ({
    namespaced: true,

    modules: {
        flipflopA: JKFlipFlop({
            CLK: pin1,
            PRE: pin2,
            CLR: pin3,

            j: pin4,
            k: pin16,
        }),

        flipflopB: JKFlipFlop({
            CLK: pin6,
            PRE: pin7,
            CLR: pin8,

            j: pin9,
            k: pin12,
        }),
    },

    getters: {
        pin15: (s, g) => g['flipflopA/q'],
        pin14: (s, g) => g['flipflopA/q〇'],
        pin11: (s, g) => g['flipflopB/q'],
        pin10: (s, g) => g['flipflopB/q〇'],
    },
});
