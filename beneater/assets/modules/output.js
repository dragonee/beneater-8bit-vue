import sn74273 from '../logic/sn74273'
import sn74139 from '../logic/sn74139'

import sn7408 from '../logic/sn7408'
import sn7476 from '../logic/sn7476'
import at28c16 from '../logic/at28c16'

import { promisifyTimeout, addrToOffset } from '../util'

export default ({ namespace, CLKOI='CLKOI', CLR='CLR', O_OUTPUT_WE='O_OUTPUT_WE' }) => ({
    namespaced: true,
    
    state: {
        miliseconds: 100,
        astable: false,
        
        vcc: true,
    },
    
    getters: {
        cathodeA: (s, g) => g['decoder/pin4'],
        cathodeB: (s, g) => g['decoder/pin5'],
        cathodeC: (s, g) => g['decoder/pin6'],
        cathodeD: (s, g) => g['decoder/pin7'],
        
        output: (s, g) => [
            g['memory/pin9'],
            g['memory/pin10'],
            g['memory/pin11'],
            g['memory/pin13'],
            g['memory/pin14'],
            g['memory/pin15'],
            g['memory/pin16'],
            g['memory/pin17'],
        ]
    }, 
    
    mutations: {
        impulse(state, payload) {
            state.astable = payload
        },
        
        setVcc(state, payload) {
            state.vcc = payload
        }
    },
    
    modules: {
        // requires external watch set in hello_world_mount.js
        counter: sn7476({
            pin1: 'CLK1',
            
            pin4: () => true,
            pin16: () => true,
            
            pin6: 'CLK2',
            
            pin9: () => true,
            pin12: () => true,
        }),
        
        // requires external watch set in hello_world_mount.js
        andGate: sn7408({
            pin1: (rs, rg) => rg.oi,
            pin2: (rs, rg) => rg['clock/output'],
        }),
        
        memory: at28c16({
            pin8: (s, g) => g[`${namespace}/latch/pin2`],
            pin7: (s, g) => g[`${namespace}/latch/pin5`],
            pin6: (s, g) => g[`${namespace}/latch/pin6`],
            pin5: (s, g) => g[`${namespace}/latch/pin9`],
            pin4: (s, g) => g[`${namespace}/latch/pin12`],
            pin3: (s, g) => g[`${namespace}/latch/pin15`],
            pin2: (s, g) => g[`${namespace}/latch/pin16`],
            pin1: (s, g) => g[`${namespace}/latch/pin19`],
            pin23: (s, g) => g[`${namespace}/counter/pin14`],
            pin22: (s, g) => g[`${namespace}/counter/pin10`],
            pin19: (s, g) => false,
            
            pin21: O_OUTPUT_WE,
            pin20: (s, g) => false,
            pin18: (s, g) => false,
            
        }),
        
        latch: sn74273({
            pin11: CLKOI,
            
            pin3: (s, g) => g.bus[0],
            pin4: (s, g) => g.bus[1],
            pin7: (s, g) => g.bus[2],
            pin8: (s, g) => g.bus[3],
            pin13: (s, g) => g.bus[4],
            pin14: (s, g) => g.bus[5],
            pin17: (s, g) => g.bus[6],
            pin18: (s, g) => g.bus[7],
            
            pin1: CLR
        }),
        
        decoder: sn74139({
            pin2: (s, g) => g[`${namespace}/counter/pin14`],
            pin3: (s, g) => g[`${namespace}/counter/pin10`],
            pin1: () => false,
        })
    },
    
    actions: {
        async start({ state, commit, dispatch }) {
            while(true) {
                await promisifyTimeout(state.miliseconds)
            
                if (!state.vcc) {
                    continue;
                }
                    
                dispatch('CLK1', { rising: true }, { root: true })
                
                await promisifyTimeout(state.miliseconds)
                
                dispatch('CLK1', { rising: false }, { root: true })
            }
        },
        
        async load({ state, commit, dispatch }) {
            for(let i = 0; i < 4; i++) {
                await promisifyTimeout(state.miliseconds)
            
                dispatch('CLK1', { rising: true }, { root: true })
                
                await promisifyTimeout(state.miliseconds)
                
                dispatch('CLK1', { rising: false }, { root: true })

            }
        }
    },
})