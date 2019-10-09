<template>
    <div class="board">    
        <div class="module">
            <div class="title">Hello world</div>
            
            <led :on="output" color="red"></led> Clock<br>
            
            <led8bit :word="bus" color="blue" :reverse="true"></led8bit> BUS<br>
            <led8bit :word="aout" color="red" :reverse="true"></led8bit> A<br>
            <led8bit :word="bout" color="red" :reverse="true"></led8bit> B<br>
            <led8bit :word="iout" :color="['blue', 'blue', 'blue', 'blue', 'yellow', 'yellow', 'yellow', 'yellow']" :reverse="true"></led8bit> I<br>
                        
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
import MemoryAddressRegister from './memory_address_register_module'
import Memory from './memory_module'
import ProgramCounter from './program_counter'
import ALU from './alu'
import Control from './control'
import OutputModule from './output'

import { offsetToAddr } from '../util'

const PROGRAM = [
    0b00011000, // LDA 8
    0b00101001, // ADD 9
    0b00110000, // OUT
    0b01000000, // HLT
    
    0b00000000,
    0b00000000,
    0b00000000,
    0b00000000,
    
    0b00001010, // value at 8
    0b01000000, // value at 9
].map(x => offsetToAddr(x, 8))

export default {
    data: () => ({
        PROGRAM
    }),
    
    components: {
        Clock,
        led8bit: LED8Bit,
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
    },
    
    methods: {
        loadProgram() {
            this.$store.dispatch('program', this.PROGRAM)
        }
    }
}
</script>
