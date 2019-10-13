export default ({
    pin2 = () => undefined, // B2
    pin3 = () => undefined, // A2

    pin5 = () => undefined, // A1
    pin6 = () => undefined, // B1
    pin7 = () => undefined, // C0

    pin11 = () => undefined, // B4
    pin12 = () => undefined, // A4

    pin14 = () => undefined, // A3
    pin15 = () => undefined, // B3
}) => ({
    namespaced: true,

    getters: {
        output: (s, g, rs, rg) => {
            let carry = pin7(rs, rg);

            const a = [
                pin5(rs, rg),
                pin3(rs, rg),
                pin14(rs, rg),
                pin12(rs, rg),
            ];

            const b = [
                pin6(rs, rg),
                pin2(rs, rg),
                pin15(rs, rg),
                pin11(rs, rg),
            ];

            for (let i = 0; i < 4; i += 1) {
                if (a[i] && b[i] && carry) {
                    // do nothing
                } else if ((a[i] && b[i]) || (a[i] && carry) || (b[i] && carry)) {
                    a[i] = false;
                    carry = true;
                } else if (
                    (!a[i] && !b[i] && carry)
                    || (!a[i] && !carry && b[i])
                    || (!b[i] && !carry && a[i])
                ) {
                    a[i] = true;
                    carry = false;
                } else {
                    a[i] = false;
                    carry = false;
                }
            }

            a.push(carry);

            return a;
        },

        pin4: (s, g) => g.output[0],
        pin1: (s, g) => g.output[1],
        pin13: (s, g) => g.output[2],
        pin10: (s, g) => g.output[3],

        pin9: (s, g) => g.output[4],
    },
});
