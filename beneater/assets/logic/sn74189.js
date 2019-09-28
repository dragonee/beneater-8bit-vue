// fill array with values
const n = (k) => Array(k).fill(false)

// Create numeric address from array of true/false values
// e.g. [t,f,t] becomes 5
const addr = (arr) => arr.reduce(({ sum, power }, val) => ({ 
    sum: sum + power * (val ? 1: 0),
    power: power * 2
}), { sum: 0, power: 1}).sum

export default ({ 
    pin1 = () => undefined, // A0
    pin15 = () => undefined,
    pin14 = () => undefined,
    pin13 = () => undefined, // ...A3
    
    pin2 = () => undefined, // CS_
    pin3 = 'WE', // WE_
    
    pin4 = () => undefined, // D0
    pin6 = () => undefined,
    pin10 = () => undefined,
    pin12 = () => undefined, // D3
    
}) => {
    return {
        namespaced: true,
        
        state: () => ({
            words: Array(16).fill(null).map(() => n(4))
        }),
        
        mutations: {
            setState(state, payload) {    
                let newWords = state.words.map((word) => [...word])
                
                newWords[addr(payload.address)] = [
                    ...payload.word
                ]
                
                state.words = newWords
            }
        },
        
        actions: {
            [pin3]: {
                root: true,
                handler({ state, rootState, rootGetters, commit }, payload) {
                    if(!pin2(rootState, rootGetters)) {
                        commit('setState', {
                            address: [
                                pin1(rootState, rootGetters),
                                pin15(rootState, rootGetters),
                                pin14(rootState, rootGetters),
                                pin13(rootState, rootGetters),
                            ],
                            
                            word: [
                                pin4(rootState, rootGetters),
                                pin6(rootState, rootGetters),
                                pin10(rootState, rootGetters),
                                pin12(rootState, rootGetters),
                            ]
                        })
                    }
                }
            },
        },
        
        getters: {
            currentWord: (s, g, rs, rg) => {
                if(pin2(rs, rg)) {
                    return [undefined, undefined, undefined, undefined]
                }
                
                return s.words[addr([
                    pin1(rs, rg),
                    pin15(rs, rg),
                    pin14(rs, rg),
                    pin13(rs, rg),
                ])].map((x) => !x)
            },
            
            pin5: (s, g, rs, rg) => g.currentWord[0],
            pin7: (s, g, rs, rg) => g.currentWord[1],
            pin9: (s, g, rs, rg) => g.currentWord[2],
            pin11: (s, g, rs, rg) => g.currentWord[3],
        }
    }
}