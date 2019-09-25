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
        ai: () => true, // low act
        ao: () => true, // low act
        bi: () => true, // low act
        bo: () => true, // low act

        bus: (state, getters) => merge(getters['registerA/bus'])
    },
    
    mutations: {
    },
    
    actions: {
    }
}