import ClockModule from './modules/clock'
import RegisterModule from './modules/register'

const merge = (...args) => {
    return args.reduce((list, next) => {
        for (let i = 0; i < 8; i++) {
            if (next[i]) {
                list[i] = next[i]
            }
        }
        
        return list
    }, [false, false, false, false, false, false, false, false])
}

export default {
    state: {
        ai: true,
        ao: true,
        bi: true,
        bo: true,
        
        bus:  [false, false, false, false, false, false, false, false]
    },
    
    modules: {
        clock: ClockModule,
        registerA: RegisterModule({
            namespace: 'registerA',
            ri: 'ai',
            ro: 'ao',
            CLK: 'CLK',
            CLR: 'CLR'
        }),
        
        registerB: RegisterModule({
            namespace: 'registerB',
            ri: 'bi',
            ro: 'bo',
            CLK: 'CLK',
            CLR: 'CLR'
        }),
    },
    
    getters: {
        hlt: () => false,
        ai: (s) => s.ai, // low act
        ao: (s) => s.ao, // low act
        bi: (s) => s.bi, // low act
        bo: (s) => s.bo, // low act

        bus: (state, getters) => merge(getters['registerA/bus'], state.bus)
    },
    
    mutations: {
        toggle(state, payload) {
            state[payload.key] = !state[payload.key]
        },
        
        setBus(state, payload) {
            let newArr = [...state.bus]
            
            newArr[payload.key] = !newArr[payload.key]
            
            state.bus = newArr
        }
    },
    
    actions: {
    }
}