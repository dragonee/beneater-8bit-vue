const nextState = (j, k, current) => {
    if(typeof(current) === 'undefined') {
        current = Math.random() >= 0.5
    }
    
    if(j && !k) {
        return true
    } else if (!j && k) {
        return false
    } else if (j) {
        return !current
    }
    
    return current                       
}


export default ({ 
    CLK = 'CLK', // 1CLK
    
    PRE = 'PRE',
    CLR = 'CLR',
    
    j = () => undefined, // 1J
    k = () => undefined, // 1K
    
}) => {
    return {
        namespaced: true,
        
        state: () => ({
            master: false,
            slave: false,
        }),
        
        mutations: {
            setMaster(state, payload) {    
                state.master = payload
            },

            setSlave(state, payload) {
                state.slave = payload
            }
        },
        
        actions: {
            [CLK]: {
                root: true,
                handler({ state, rootState, rootGetters, commit }, payload) {
                    if(payload.rising) {
                        commit('setMaster', nextState(
                            j(rootState, rootGetters), 
                            k(rootState, rootGetters), 
                            state.slave
                        ))
                    } else if(state.slave !== state.master) {
                        commit('setSlave', state.master)
                    }
                }
            },
            
            [CLR]: {
                root: true,
                handler({ state, rootState, rootGetters, commit }, payload) {
                    commit('setMaster', false)
                    commit('setSlave', false)
                }
            },
            
            [PRE]: {
                root: true,
                handler({ state, rootState, rootGetters, commit }, payload) {
                    commit('setMaster', true)
                    commit('setSlave', true)
                }
            },
        },
        
        getters: {
            q: (s, g) => s.slave,
            q〇: (s, g) => !s.slave,
        }
    }
}