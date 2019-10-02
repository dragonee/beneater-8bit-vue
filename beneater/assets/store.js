import ClockModule from './modules/clock'
import RegisterModule from './modules/register'
import InstructionRegisterModule from './modules/instruction_register'
import MemoryAddressRegisterModule from './modules/memory_address_register'
import MemoryModule from './modules/memory'
import ProgramCounterModule from './modules/program_counter'
import ALUModule from './modules/alu'
import ControlModule from './modules/control'
import OutputModule from './modules/output'

import { offsetToAddr, promisifyTimeout } from './util'

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
        
        registerI: InstructionRegisterModule({
            namespace: 'registerI',
            ri: 'ii',
            ro: 'io',
            CLK: 'CLK',
            CLR: 'CLR'
        }),
        
        memoryAddressRegister: MemoryAddressRegisterModule({
            namespace: 'memoryAddressRegister',
            mi: 'mi', 
            CLK:'CLK', 
            CLR: 'CLR'
        }),
        
        memory: MemoryModule({
            namespace: 'memory', 
            prog: 'memoryAddressRegister/prog', 
            ri: 'ri', 
            ro: 'ro', 
            a0: 'memoryAddressRegister/a0', 
            a1: 'memoryAddressRegister/a1', 
            a2: 'memoryAddressRegister/a2', 
            a3: 'memoryAddressRegister/a3', 
            CLK: 'CLK'
        }),
        
        programCounter: ProgramCounterModule({
            namespace: 'programCounter',
            ce: 'ce',
            co: 'co',
            j: 'j',
            CLK: 'CLK',
            CLR: 'CLR'
        }),
        
        alu: ALUModule({
            namespace: 'alu',
            fi: 'fi',
            su: 'su',
            eo: 'eo',
            a: 'registerA/out',
            b: 'registerB/out',
            CLK: 'CLK',
            CLR: 'CLR'
        }),
        
        control: ControlModule({
            namespace: 'control', 
            cf: 'alu/cf', 
            zf: 'alu/zf', 
            ir: 'registerI/out',
            CLK: 'CLK'
        }),
        
        output: OutputModule({
            namespace: 'output',
            oi: 'oi',
            CLK: 'CLK'
        })
    },
    
    getters: {
        hlt: (s, g) => g['control/out'].hlt, // high act
        ai: (s, g) => g['control/out'].ai, // low act
        ao: (s, g) => g['control/out'].ao, // low act
        bi: (s, g) => g['control/out'].bi, // low act
        bo: (s, g) => g['control/out'].bo, // low act
        
        mi: (s, g) => g['control/out'].mi, // low act
        
        ii: (s, g) => g['control/out'].ii, // low act
        io: (s, g) => g['control/out'].io, // low act
        
        ri: (s, g) => g['control/out'].ri, // low act
        ro: (s, g) => g['control/out'].ro, // high act
        
        ce: (s, g) => g['control/out'].ce, // high act
        co: (s, g) => g['control/out'].co, // low act
        j: (s, g) => g['control/out'].j, // low act
        
        fi: (s, g) => g['control/out'].fi, // low act
        eo: (s, g) => g['control/out'].eo, // low act
        su: (s, g) => g['control/out'].su, // high act
        
        oi: (s, g) => g['control/out'].oi, // high act

        bus: (state, getters) => merge(
            getters['registerA/bus'], 
            getters['registerI/bus'], 
            getters['memory/bus'],
            getters['programCounter/bus'],
            getters['alu/bus'],
            state.bus
        )
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
        // payload is array of 8-bit words
        async program({ commit, dispatch, getters }, payload) {
            const mode = getters['memoryAddressRegister/prog']
            
            commit('memoryAddressRegister/setManualAddressingMode', true)
            
            for (let i = 0; i < payload.length; i++) {
                const word = payload[i]
                
                commit('memory/setSwitchStateWord', word)
                commit('memoryAddressRegister/setAddrWord', offsetToAddr(i))
                
                dispatch('memory/pressWriteToMemoryButton')
                
                await promisifyTimeout(500)
            }
            
            commit('memoryAddressRegister/setAddrWord', offsetToAddr(0))
            commit('memory/setSwitchStateWord', offsetToAddr(0, 8))
            commit('memoryAddressRegister/setManualAddressingMode', !mode)
        },
        
        // payload is array of objects with unspecified yet semantics
        async programMicrocode({ commit, getters }, payload) {
            const EO = 128, SU = 64, BI = 32, OI = 16, CE = 8, CO = 4, J = 2, FI = 1 
            const HLT = 32768, MI = 16384, RI = 8192, RO = 4096, IO = 2048, II = 1024, AI = 512, AO = 256
            
            
            const ldaInstruction = [
                CO|MI,
                RO|II|CE,
                IO|MI,
                RO|AI
            ]
            
            const addInstruction = [
                CO|MI,
                RO|II|CE,
                IO|MI,
                RO|BI,
                EO|AI
            ]
            
            const hltInstuction = [
                CO|MI,
                RO|II|CE,
                HLT
            ]
            
            const outInstruction = [
                CO|MI,
                RO|II|CE,
                AO|OI
            ]
            
            const instructionsToMicrocode = (instructions) => {
                let microcodeLow = Array(2048).fill(null).map(() => Array(8).fill(false))
                let microcodeHigh = Array(2048).fill(null).map(() => Array(8).fill(false))
                
                const MICROCODE_LOW = 128
                const MICROCODE_HIGH = 0
                
                for (let i = 0; i < instructions.length; i++) {
                    let instruction = instructions[i]
                    
                    for (let step = 0; step < instruction.length; step++) {
                        let microinstruction = instruction[step]
                        
                        // XXX does not handle cf/zf properly
                        for(let cfzf = 0; cfzf < 4; cfzf++) {
                            let addr = step + (i << 3) + (cfzf << 8)
                            
                            microcodeLow[addr + MICROCODE_LOW] = offsetToAddr(microinstruction & 255, 8)
                            microcodeHigh[addr + MICROCODE_HIGH] = offsetToAddr(microinstruction >> 8, 8)
                        }
                    }
                }
                
                return [microcodeLow, microcodeHigh]
            }
            
            const [microcodeLow, microcodeHigh] = instructionsToMicrocode([
                ldaInstruction,
                addInstruction,
                outInstruction,
                hltInstuction
            ])
            
            commit('control/memoryLow/setContents', microcodeLow)
            commit('control/memoryHigh/setContents', microcodeHigh)
        }
    }
}