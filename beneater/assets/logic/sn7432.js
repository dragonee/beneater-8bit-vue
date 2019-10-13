export default ({
    pin1 = () => undefined,
    pin2 = () => undefined,

    pin4 = () => undefined,
    pin5 = () => undefined,

    pin9 = () => undefined,
    pin10 = () => undefined,

    pin12 = () => undefined,
    pin13 = () => undefined,
}) => ({
    namespaced: true,

    getters: {
        pin3: (s, g, rs, rg) => pin1(rs, rg) || pin2(rs, rg),
        pin6: (s, g, rs, rg) => pin4(rs, rg) || pin5(rs, rg),
        pin8: (s, g, rs, rg) => pin9(rs, rg) || pin10(rs, rg),
        pin11: (s, g, rs, rg) => pin12(rs, rg) || pin13(rs, rg),
    },
});
