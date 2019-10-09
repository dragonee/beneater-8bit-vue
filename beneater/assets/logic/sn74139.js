export default ({ 
    pin2 = () => undefined,  // A0
    pin3 = () => undefined,  // A1
    
    pin14 = () => undefined,  // B0
    pin13 = () => undefined,  // B1
    
    pin1 = () => undefined,  // EA_
    pin15 = () => undefined,  // EB_
    
}) => {
    return {
        namespaced: true,
        
        getters: {
            outputA: (s, g, rs, rg) => {
                let arr = [true, true, true, true]
                
                if (pin1(rs, rg)) {
                    return arr
                }
                
                const offset = (pin2(rs, rg) 
                    + 2 * pin3(rs, rg) 
                )
                
                arr[offset] = false
                
                return arr
            },
            
            outputB: (s, g, rs, rg) => {
                let arr = [true, true, true, true]
                
                if (pin15(rs, rg)) {
                    return arr
                }
                
                const offset = (pin14(rs, rg) 
                    + 2 * pin13(rs, rg) 
                )
                
                arr[offset] = false
                
                return arr
            },
            
            pin4: (s, g, rs, rg) => g.outputA[0],
            pin5: (s, g, rs, rg) => g.outputA[1],
            pin6: (s, g, rs, rg) => g.outputA[2],
            pin7: (s, g, rs, rg) => g.outputA[3],
            
            pin9: (s, g, rs, rg) => g.outputB[3],
            pin10: (s, g, rs, rg) => g.outputB[2],
            pin11: (s, g, rs, rg) => g.outputB[1],
            pin12: (s, g, rs, rg) => g.outputB[0],
        }
    }
}