<template>
    <div class="board">    
        <div class="module">
            <div class="title">Hello world</div>
            
            <led :on="output" color="red"></led> Clock<br>
            
            <led8bit :word="bus" color="blue" :reverse="true"></led8bit> BUS<br>
            <led8bit :word="aout" color="red" :reverse="true"></led8bit> A<br>
            <led8bit :word="bout" color="red" :reverse="true"></led8bit> B<br>
            <led8bit :word="iout" :color="['blue', 'blue', 'blue', 'blue', 'yellow', 'yellow', 'yellow', 'yellow']" :reverse="true"></led8bit> I<br>
            
            <switches :config="busconfig" :options="BUS_OPTS"></switches>
            
            <button @click="loadProgram">LOAD PROGRAM</button>
        </div>

        <clock></clock>
        
        <alu></alu>
                
        <memory-address-register></memory-address-register>
        <memory></memory>
        
        <program-counter></program-counter>
        
        <control></control>
        <output-module></output-module>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import Clock from './clock'
import LED8Bit from './led8bit'
import Switches from './switches'
import MemoryAddressRegister from './memory_address_register_module'
import Memory from './memory_module'
import ProgramCounter from './program_counter'
import ALU from './alu'
import Control from './control'
import OutputModule from './output'

import { offsetToAddr } from '../util'

const SWITCHES_OPTS = {
    mutation: 'toggle',
    getter($store) {
        return (item) => $store.state[item.key]
    }
}

const BUS_OPTS = {
    mutation: 'setBus',
    getter($store) {
        return (item) => $store.state.bus[item.key]
    }
}

const PROGRAM = [
    0b00011000, // LDA 8
    0b00101001, // ADD 9
    0b00110000, // OUT
    0b01000000, // HLT
    0b00000000,
    0b00000000,
    0b00000000,
    0b00000000,
    0b00101010, // value at 8
    0b00000011, // value at 9
].map(x => offsetToAddr(x, 8))

export default {
    data: () => ({
        SWITCHES_OPTS,
        BUS_OPTS,
        PROGRAM
    }),
    
    components: {
        Clock,
        led8bit: LED8Bit,
        Switches,
        MemoryAddressRegister,
        Memory,
        ProgramCounter,
        alu: ALU,
        Control,
        OutputModule,
    },
    
    computed: {
        ...mapGetters('clock', ['output']),
        ...mapGetters(['bus']),
        ...mapGetters('registerA', {aout: 'out'}),
        ...mapGetters('registerB', {bout: 'out'}),
        ...mapGetters('registerI', {iout: 'out'}),
        
        busconfig: () => [
            { key: 7, label: 'Bus7' },
            { key: 6, label: 'Bus6' },
            { key: 5, label: 'Bus5' },
            { key: 4, label: 'Bus4' },
            { key: 3, label: 'Bus3' },
            { key: 2, label: 'Bus2' },
            { key: 1, label: 'Bus1' },
            { key: 0, label: 'Bus0' },
        ]
    },
    
    methods: {
        loadProgram() {
            this.$store.dispatch('program', this.PROGRAM)
        }
    }
}
</script>
