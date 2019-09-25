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

}) => {
    return {
        namespaced: true,
        
        getters: {
            pin2: (s, g, rs, rg) => {
                if(!pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin18(rs, rg)
                }
            },
            pin3: (s, g, rs, rg) => {
                if(!pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin17(rs, rg)
                }
            },
            pin4: (s, g, rs, rg) => {
                if(!pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin16(rs, rg)
                }
            },
            pin5: (s, g, rs, rg) => {
                if(!pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin15(rs, rg)
                }
            },
            pin6: (s, g, rs, rg) => {
                if(!pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin14(rs, rg)
                }
            },
            pin7: (s, g, rs, rg) => {
                if(!pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin13(rs, rg)
                }
            },
            pin8: (s, g, rs, rg) => {
                if(!pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin12(rs, rg)
                }
            },
            pin9: (s, g, rs, rg) => {
                if(!pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin11(rs, rg)
                }
            },
            
            pin11: (s, g, rs, rg) => {
                if(pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin9(rs, rg)
                }
            },
            pin12: (s, g, rs, rg) => {
                if(pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin8(rs, rg)
                }
            },
            pin13: (s, g, rs, rg) => {
                if(pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin7(rs, rg)
                }
            },
            pin14: (s, g, rs, rg) => {
                if(pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin6(rs, rg)
                }
            },
            pin15: (s, g, rs, rg) => {
                if(pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin5(rs, rg)
                }
            },
            pin16: (s, g, rs, rg) => {
                if(pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin4(rs, rg)
                }
            },
            pin17: (s, g, rs, rg) => {
                if(pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin3(rs, rg)
                }
            },
            pin18: (s, g, rs, rg) => {
                if(pin1(rs, rg) && !pin19(rs, rg)) {
                    return pin2(rs, rg)
                }
            },
        }
    }
}