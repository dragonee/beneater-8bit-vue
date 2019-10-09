export default ({ 
    
    pin11 = 'CLK',

    pin18 = () => undefined, // 8D
    pin17 = () => undefined, // 7D
    pin14 = () => undefined, // 6D
    pin13 = () => undefined, // 5D
    pin8 = () => undefined, // 4D
    pin7 = () => undefined, // 3D
    pin4 = () => undefined, // 2D
    pin3 = () => undefined, // 1D
    
    pin1 = 'CLR'

}) => {
    return {
        namespaced: true,
        
        state: () => ({
            d1: false,
            d2: false,
            d3: false,
            d4: false,
            d5: false,
            d6: false,
            d7: false,
            d8: false,
        }),
        
        mutations: {
            setState(state, payload) {    
                state.d1 = payload.d1
                state.d2 = payload.d2
                state.d3 = payload.d3
                state.d4 = payload.d4
                state.d5 = payload.d5
                state.d6 = payload.d6
                state.d7 = payload.d7
                state.d8 = payload.d8
            }
        },
        
        actions: {
            [pin11]: {
                root: true,
                handler({ state, rootState, rootGetters, commit }, payload) {
                    if(!payload.rising) {
                        return
                    }
                    
                    commit('setState', {
                        d1: pin3(rootState, rootGetters),
                        d2: pin4(rootState, rootGetters),
                        d3: pin7(rootState, rootGetters),
                        d4: pin8(rootState, rootGetters),
                        d5: pin13(rootState, rootGetters),
                        d6: pin14(rootState, rootGetters),
                        d7: pin17(rootState, rootGetters),
                        d8: pin18(rootState, rootGetters),
                    })
                }
            },
            
            [pin1]: {
                root: true,
                handler({ state, rootState, rootGetters, commit }, payload) {
                    commit('setState', {
                        d1: false,
                        d2: false,
                        d3: false,
                        d4: false,
                        d5: false,
                        d6: false,
                        d7: false,
                        d8: false,
                    })
                }
            }
        },
        
        getters: {
            pin2: (s, g, rs, rg) => s.d1,
            pin5: (s, g, rs, rg) => s.d2,
            pin6: (s, g, rs, rg) => s.d3,
            pin9: (s, g, rs, rg) => s.d4,
            pin12: (s, g, rs, rg) => s.d5,
            pin15: (s, g, rs, rg) => s.d6,
            pin16: (s, g, rs, rg) => s.d7,
            pin19: (s, g, rs, rg) => s.d8
        }
    }
}