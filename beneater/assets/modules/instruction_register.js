
import sn74245 from '../logic/sn74245'
import register from './register'

export default ({ namespace, ri, ro, CLK='CLK', CLR='CLR' }) => {
    let reg = register({ namespace, ro, ro, CLK, CLR })
    
    reg.modules.buffer = sn74245({
        pin1: () => true,
        
        pin2: (s, g) => false,
        pin3: (s, g) => false,
        pin4: (s, g) => false,
        pin5: (s, g) => false,
        pin6: (s, g) => g[`${namespace}/latchBottom/pin6`],
        pin7: (s, g) => g[`${namespace}/latchBottom/pin5`],
        pin8: (s, g) => g[`${namespace}/latchBottom/pin4`],
        pin9: (s, g) => g[`${namespace}/latchBottom/pin3`],

        pin19: (s, g) => g[ro],
    })
    
    return reg    
}