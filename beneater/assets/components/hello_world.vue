<template>
    <div class="board">
        <div class="module">
            <div class="title">Hello world</div>

            <led :on="output" color="red"></led> Clock<br>

            <led8bit :word="bus" color="blue" :reverse="true"></led8bit> BUS<br>
            <led8bit :word="aout" color="red" :reverse="true"></led8bit> A<br>
            <led8bit :word="bout" color="red" :reverse="true"></led8bit> B<br>
            <led8bit
                :word="iout"
                :color="['blue', 'blue', 'blue', 'blue', 'yellow', 'yellow', 'yellow', 'yellow']"
                :reverse="true"
            ></led8bit> I <code class="disasm">{{ disasm }}</code><br>

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
import { mapGetters } from 'vuex';

import Clock from './clock.vue';
import LED8Bit from './led8bit.vue';
import MemoryAddressRegister from './memory_address_register_module.vue';
import Memory from './memory_module.vue';
import ProgramCounter from './program_counter.vue';
import ALU from './alu.vue';
import Control from './control.vue';
import OutputModule from './output.vue';

import { offsetToAddr, addrToOffset } from '../util';

const PROGRAM = [
    0b01111001, // SUB 9
    0b10100100, // JZ 4
    0b00110000, // OUT
    0b01100000, // JMP 0

    0b00101001, // ADD 9
    0b10010000, // JC 0
    0b00110000, // OUT
    0b01100100, // JMP 4

    0b00001010, // value at 8
    0b00100000, // value at 9
].map((x) => offsetToAddr(x, 8));

const instructions = [
    'NOP',
    'LDA',
    'ADD',
    'OUT',

    'HLT',
    'STA',
    'JMP',
    'SUB',

    'LDI',
    'JC',
    'JZ',
    '???',

    '???',
    '???',
    '???',
    '???',
];

const instructionHasArgument = [
    'LDA', 'ADD', 'STA', 'JMP', 'SUB', 'LDI', 'JC', 'JZ',
];

export default {
    data: () => ({
        PROGRAM,
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
        ...mapGetters('registerA', { aout: 'out' }),
        ...mapGetters('registerB', { bout: 'out' }),
        ...mapGetters('registerI', { iout: 'out' }),

        // XXX see instructionsToMicrocode
        // actually a asm/disasm module should be moved someplace else.
        disasm() {
            const registerIContents = addrToOffset(this.iout);

            const registerIInstruction = registerIContents >> 4;
            const registerIValue = registerIContents & 0b1111;

            const instructionName = instructions[registerIInstruction];

            if (instructionHasArgument.includes(instructionName)) {
                return `${instructionName} ${registerIValue}`;
            }

            return instructionName;
        },
    },

    methods: {
        loadProgram() {
            this.$store.dispatch('program', this.PROGRAM);
        },
    },
};
</script>
