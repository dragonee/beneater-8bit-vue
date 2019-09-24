export default ({ 
    pin1 = () => undefined, 
    pin3 = () => undefined, 
    pin5 = () => undefined, 
    pin9 = () => undefined, 
    pin11 = () => undefined, 
    pin13 = () => undefined, 
}) => {
    return {
        namespaced: true,
        
        getters: {
            pin2: (s, g, rs, rg) => !pin1(rs, rg),
            pin4: (s, g, rs, rg) => !pin3(rs, rg),
            pin6: (s, g, rs, rg) => !pin5(rs, rg),
            pin8: (s, g, rs, rg) => !pin9(rs, rg),
            pin10: (s, g, rs, rg) => !pin11(rs, rg),
            pin12: (s, g, rs, rg) => !pin13(rs, rg),
        }
    }
}