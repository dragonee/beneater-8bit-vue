export default ({ 
    pin2 = () => undefined, 
    pin3 = () => undefined,
    
    pin5 = () => undefined, 
    pin6 = () => undefined, 
    
    pin10 = () => undefined, 
    pin11 = () => undefined, 
    
    pin13 = () => undefined, 
    pin14 = () => undefined, 
    
    pin1 = () => undefined,  // S (A_, B)
    pin15 = () => undefined, // G_
}) => {
    return {
        namespaced: true,
        
        getters: {
            pin4: (s, g, rs, rg) => {
                if (pin15(rs, rg)) {
                    return false
                }
                
                return pin1(rs, rg) ? pin3(rs, rg) : pin2(rs, rg)
            },
            
            pin7: (s, g, rs, rg) => {
                if (pin15(rs, rg)) {
                    return false
                }
                
                return pin1(rs, rg) ? pin6(rs, rg) : pin5(rs, rg)
            },
            
            pin9: (s, g, rs, rg) => {
                if (pin15(rs, rg)) {
                    return false
                }
                
                return pin1(rs, rg) ? pin10(rs, rg) : pin11(rs, rg)
            },
            
            pin12: (s, g, rs, rg) => {
                if (pin15(rs, rg)) {
                    return false
                }
                
                return pin1(rs, rg) ? pin13(rs, rg) : pin14(rs, rg)
            },
        }
    }
}