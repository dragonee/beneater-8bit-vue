export default ({ 
    pin1 = () => undefined, // M
    pin2 = () => undefined, // N
    
    pin7 = 'CLK',
    
    pin9 = () => undefined, // G1_
    pin10 = () => undefined, // G2_

    pin11 = () => undefined, // 4D
    pin12 = () => undefined, // 3D
    pin13 = () => undefined, // 2D
    pin14 = () => undefined, // 1D
    
    pin15 = 'CLR'

}) => {
    return {
        namespaced: true,
        
        state: () => ({
            d1: false,
            d2: false,
            d3: false,
            d4: false
        }),
        
        mutations: {
            setState(state, payload) {    
                state.d1 = payload.d1
                state.d2 = payload.d2
                state.d3 = payload.d3
                state.d4 = payload.d4
            }
        },
        
        actions: {
            [pin7]: {
                root: true,
                handler({ state, rootState, rootGetters, commit }, payload) {
                    if(!pin9(rootState, rootGetters) && !pin10(rootState, rootGetters)) {
                        commit('setState', {
                            d1: pin14(rootState, rootGetters),
                            d2: pin13(rootState, rootGetters),
                            d3: pin12(rootState, rootGetters),
                            d4: pin11(rootState, rootGetters),
                        })
                    }
                }
            },
            
            [pin15]: {
                root: true,
                handler({ state, rootState, rootGetters, commit }, payload) {
                    commit('setState', {
                        d1: 0,
                        d2: 0,
                        d3: 0,
                        d4: 0,
                    })
                }
            }
        },
        
        getters: {
            pin3: (s, g, rs, rg) => {
                // M = 1 || N = 1
                if(pin1(rs, rg) || pin2(rs, rg)) {
                    return undefined
                }
                
                return s.d1                
            },
            
            pin4: (s, g, rs, rg) => {
                // M = 1 || N = 1
                if(pin1(rs, rg) || pin2(rs, rg)) {
                    return undefined
                }
                
                return s.d2
            },
            
            pin5: (s, g, rs, rg) => {
                // M = 1 || N = 1
                if(pin1(rs, rg) || pin2(rs, rg)) {
                    return undefined
                }
                
                return s.d3
            },
            
            pin6: (s, g, rs, rg) => {
                // M = 1 || N = 1
                if(pin1(rs, rg) || pin2(rs, rg)) {
                    return undefined
                }
                
                return s.d4
            },
        }
    }
}