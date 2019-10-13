export default ({
    pin1 = () => undefined,
    pin2 = () => undefined,
    pin3 = () => undefined,
    pin4 = () => undefined,
    pin5 = () => undefined,
    pin6 = () => undefined,
    pin7 = () => undefined,
    pin8 = () => undefined,
    pin9 = () => undefined,

    pin11 = () => undefined,
    pin12 = () => undefined,
    pin13 = () => undefined,
    pin14 = () => undefined,
    pin15 = () => undefined,
    pin16 = () => undefined,
    pin17 = () => undefined,
    pin18 = () => undefined,
    pin19 = () => undefined,
}) => ({
    namespaced: true,

    getters: {
        pin2: (s, g, rs, rg) => {
            if (!pin1(rs, rg) && !pin19(rs, rg)) {
                return pin18(rs, rg);
            }

            return undefined;
        },
        pin3: (s, g, rs, rg) => {
            if (!pin1(rs, rg) && !pin19(rs, rg)) {
                return pin17(rs, rg);
            }

            return undefined;
        },
        pin4: (s, g, rs, rg) => {
            if (!pin1(rs, rg) && !pin19(rs, rg)) {
                return pin16(rs, rg);
            }

            return undefined;
        },
        pin5: (s, g, rs, rg) => {
            if (!pin1(rs, rg) && !pin19(rs, rg)) {
                return pin15(rs, rg);
            }

            return undefined;
        },
        pin6: (s, g, rs, rg) => {
            if (!pin1(rs, rg) && !pin19(rs, rg)) {
                return pin14(rs, rg);
            }

            return undefined;
        },
        pin7: (s, g, rs, rg) => {
            if (!pin1(rs, rg) && !pin19(rs, rg)) {
                return pin13(rs, rg);
            }

            return undefined;
        },
        pin8: (s, g, rs, rg) => {
            if (!pin1(rs, rg) && !pin19(rs, rg)) {
                return pin12(rs, rg);
            }

            return undefined;
        },
        pin9: (s, g, rs, rg) => {
            if (!pin1(rs, rg) && !pin19(rs, rg)) {
                return pin11(rs, rg);
            }

            return undefined;
        },

        pin11: (s, g, rs, rg) => {
            if (pin1(rs, rg) && !pin19(rs, rg)) {
                return pin9(rs, rg);
            }

            return undefined;
        },
        pin12: (s, g, rs, rg) => {
            if (pin1(rs, rg) && !pin19(rs, rg)) {
                return pin8(rs, rg);
            }

            return undefined;
        },
        pin13: (s, g, rs, rg) => {
            if (pin1(rs, rg) && !pin19(rs, rg)) {
                return pin7(rs, rg);
            }

            return undefined;
        },
        pin14: (s, g, rs, rg) => {
            if (pin1(rs, rg) && !pin19(rs, rg)) {
                return pin6(rs, rg);
            }

            return undefined;
        },
        pin15: (s, g, rs, rg) => {
            if (pin1(rs, rg) && !pin19(rs, rg)) {
                return pin5(rs, rg);
            }

            return undefined;
        },
        pin16: (s, g, rs, rg) => {
            if (pin1(rs, rg) && !pin19(rs, rg)) {
                return pin4(rs, rg);
            }

            return undefined;
        },
        pin17: (s, g, rs, rg) => {
            if (pin1(rs, rg) && !pin19(rs, rg)) {
                return pin3(rs, rg);
            }

            return undefined;
        },
        pin18: (s, g, rs, rg) => {
            if (pin1(rs, rg) && !pin19(rs, rg)) {
                return pin2(rs, rg);
            }

            return undefined;
        },
    },
});
