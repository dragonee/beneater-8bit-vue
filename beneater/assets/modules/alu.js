import sn74245 from '../logic/sn74245'
import sn74173 from '../logic/sn74173'
import sn74283 from '../logic/sn74283'
import sn7486 from '../logic/sn7486'
import sn7408 from '../logic/sn7408'
import sn7402 from '../logic/sn7402'

export default ({ namespace, eo, su, a, b, fi, CLK='CLK', CLR='CLR' }) => ({
    namespaced: true,
    
    state: {
    },
    
    getters: {
        sum(state, getters) {
            return [
                getters['adderLow/pin4'],
                getters['adderLow/pin1'],
                getters['adderLow/pin13'],
                getters['adderLow/pin10'],
                getters['adderHigh/pin4'],
                getters['adderHigh/pin1'],
                getters['adderHigh/pin13'],
                getters['adderHigh/pin10'],
            ]
        },
        
        bus(state, getters) {
            return [
                getters['buffer/pin18'],
                getters['buffer/pin17'],
                getters['buffer/pin16'],
                getters['buffer/pin15'],
                getters['buffer/pin14'],
                getters['buffer/pin13'],
                getters['buffer/pin12'],
                getters['buffer/pin11'],
            ]
        },
        
        cf(state, getters) {
            return getters['flags/pin3']
        },
        
        zf(state, getters) {
            return getters['flags/pin4']
        }
    }, 
    
    mutations: {
    },
    
    actions: {
    },

    modules: {
        buffer: sn74245({
            pin1: () => true,
            
            pin2: (s, g) => g[`${namespace}/adderLow/pin4`], // 2^^0
            pin3: (s, g) => g[`${namespace}/adderLow/pin1`],
            pin4: (s, g) => g[`${namespace}/adderLow/pin13`],
            pin5: (s, g) => g[`${namespace}/adderLow/pin10`],
            pin6: (s, g) => g[`${namespace}/adderHigh/pin4`],
            pin7: (s, g) => g[`${namespace}/adderHigh/pin1`],
            pin8: (s, g) => g[`${namespace}/adderHigh/pin13`],
            pin9: (s, g) => g[`${namespace}/adderHigh/pin10`], //2^^7
            
            pin19: (s, g) => g[eo],
        }),
        
        xorLow: sn7486({
            pin1: (s, g) => g[su],
            pin2: (s, g) => g[b][0],
            
            pin4: (s, g) => g[su],
            pin5: (s, g) => g[b][1],
            
            pin9: (s, g) => g[su],
            pin10: (s, g) => g[b][2],
            
            pin12: (s, g) => g[su],
            pin13: (s, g) => g[b][3],
        }),
        
        xorHigh: sn7486({
            pin1: (s, g) => g[su],
            pin2: (s, g) => g[b][4],
            
            pin4: (s, g) => g[su],
            pin5: (s, g) => g[b][5],
            
            pin9: (s, g) => g[su],
            pin10: (s, g) => g[b][6],
            
            pin12: (s, g) => g[su],
            pin13: (s, g) => g[b][7],
        }),
        
        adderLow: sn74283({
            pin2: (s, g) => g[`${namespace}/xorLow/pin6`], // B2
            pin3: (s, g) => g[a][1], // A2
            
            pin5: (s, g) => g[a][0], // A1
            pin6: (s, g) => g[`${namespace}/xorLow/pin3`], // B1
            pin7: (s, g) => g[su], // C0
            
            pin11: (s, g) => g[`${namespace}/xorLow/pin11`], // B4
            pin12: (s, g) => g[a][3], // A4
            
            pin14: (s, g) => g[a][2], // A3
            pin15: (s, g) => g[`${namespace}/xorLow/pin8`], // B3
        }),
        
        adderHigh: sn74283({
            pin2: (s, g) => g[`${namespace}/xorHigh/pin6`], // B2
            pin3: (s, g) => g[a][5], // A2
            
            pin5: (s, g) => g[a][4], // A1
            pin6: (s, g) => g[`${namespace}/xorHigh/pin3`], // B1
            pin7: (s, g) => g[`${namespace}/adderLow/pin9`], // C0
            
            pin11: (s, g) => g[`${namespace}/xorHigh/pin11`], // B4
            pin12: (s, g) => g[a][7], // A4
            
            pin14: (s, g) => g[a][6], // A3
            pin15: (s, g) => g[`${namespace}/xorHigh/pin8`], // B3
        }),    
        
        flags: sn74173({
            pin7: CLK,
            pin15: CLR,
            
            pin9: (s, g) => g[fi],
            pin10: (s, g) => g[fi],
            
            pin1: () => false,
            pin2: () => false,
            
            pin14: (s, g) => g[`${namespace}/adderHigh/pin9`],
            pin13: (s, g) => g[`${namespace}/flagsAnd/pin8`],
        }),
        
        flagsNor: sn7402({
            pin1: (s, g) => g[`${namespace}/adderLow/pin4`],
            pin2: (s, g) => g[`${namespace}/adderLow/pin1`],
            
            pin4: (s, g) => g[`${namespace}/adderLow/pin13`],
            pin5: (s, g) => g[`${namespace}/adderLow/pin10`],
            
            pin9: (s, g) => g[`${namespace}/adderHigh/pin4`],
            pin10: (s, g) => g[`${namespace}/adderHigh/pin1`],
            
            pin12: (s, g) => g[`${namespace}/adderHigh/pin13`],
            pin13: (s, g) => g[`${namespace}/adderHigh/pin10`],
        }),
        
        flagsAnd: sn7408({
            pin1: (s, g) => g[`${namespace}/flagsNor/pin3`],
            pin2: (s, g) => g[`${namespace}/flagsNor/pin6`],
            
            pin4: (s, g) => g[`${namespace}/flagsNor/pin8`],
            pin5: (s, g) => g[`${namespace}/flagsNor/pin11`],
            
            pin9: (s, g) => g[`${namespace}/flagsAnd/pin6`],
            pin10: (s, g) => g[`${namespace}/flagsAnd/pin3`],
        }),
        
    },
})