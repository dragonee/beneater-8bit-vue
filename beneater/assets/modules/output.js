import sn74161 from '../logic/sn74161'
import sn74138 from '../logic/sn74138'

import sn7400 from '../logic/sn7400'
import sn7404 from '../logic/sn7404'
import at28c16 from '../logic/at28c16'

import { promisifyTimeout, addrToOffset } from '../util'

export default ({ namespace, oi, CLK='CLK' }) => ({
    namespaced: true,
    
    state: {
        number: 0
    },
    
    getters: {
    }, 
    
    mutations: {
        setNumber(state, payload) {
            state.number = payload
        }
    },
    
    actions: {
        [CLK]: {
            root: true,
            handler({ state, commit, dispatch, rootGetters }) {
                if (rootGetters[oi]) {
                    commit('setNumber', addrToOffset(rootGetters.bus))
                }
            }
        }
    },
})