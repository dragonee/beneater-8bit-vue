
import sn74157 from '../logic/sn74157'
import sn74173 from '../logic/sn74173'


export default ({ namespace, mi, CLK='CLK', CLR='CLR' }) => ({
    namespaced: true,
    
    state: {
        manualAddressingMode: false,
        address: [false, false, false, false],
    },
    
    getters: {
        addr(state, getters) {
            return [
                getters['multiplexer/pin12'],
                getters['multiplexer/pin9'],
                getters['multiplexer/pin7'],
                getters['multiplexer/pin4']
            ]
        },
        
        prog(state, getters) {
            return !state.manualAddressingMode
        },
    },
    
    modules: {
        multiplexer: sn74157({
            pin1: (s, g) => g[`${namespace}/prog`],
            
            pin2: (s, g) => s[namespace].address[3],
            pin3: (s, g) => g[`${namespace}/latch/pin6`],
            pin5: (s, g) => s[namespace].address[2],
            pin6: (s, g) => g[`${namespace}/latch/pin5`],
            pin11: (s, g) => s[namespace].address[1],
            pin10: (s, g) => g[`${namespace}/latch/pin4`],
            pin14: (s, g) => s[namespace].address[0],
            pin13: (s, g) => g[`${namespace}/latch/pin3`], //2^^0

            pin15: () => false,
        }),
        
        latch: sn74173({
            pin7: CLK,
            pin15: CLR,
            
            pin9: (s, g) => g[mi],
            pin10: (s, g) => g[mi],
            
            pin1: () => false,
            pin2: () => false,
            
            pin14: (s, g) => g.bus[0],
            pin13: (s, g) => g.bus[1],
            pin12: (s, g) => g.bus[2],
            pin11: (s, g) => g.bus[3],
        }),
    },
    
    mutations: {
        setAddr(state, payload) {
            let newArr = [...state.address]
            
            newArr[payload.key] = !newArr[payload.key]
            
            state.address = newArr
        },
        
        setManualAddressingMode(state, payload) {
            state.manualAddressingMode = payload
        }
    }
})