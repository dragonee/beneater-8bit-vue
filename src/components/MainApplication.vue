<template>
  <div class="board">
    <div class="module">
      <div class="title">Ben Eater's 8-Bit computer</div>

      <LedDiode :on="output" color="red"></LedDiode> Clock<br />

      <LedPanel :word="bus" color="blue" :reverse="true"></LedPanel> BUS<br />
      <LedPanel :word="aout" color="red" :reverse="true"></LedPanel> A<br />
      <LedPanel :word="bout" color="red" :reverse="true"></LedPanel> B<br />
      <LedPanel
        :word="iout"
        :color="[
          'blue',
          'blue',
          'blue',
          'blue',
          'yellow',
          'yellow',
          'yellow',
          'yellow',
        ]"
        :reverse="true"
      ></LedPanel>
      I <code class="disasm">{{ disasm }}</code>
      <br />

      <button @click="loadProgram">LOAD PROGRAM</button>
    </div>

    <ClockModule></ClockModule>
    <AluModule></AluModule>
    <MemoryAddressRegister></MemoryAddressRegister>
    <MemoryModule></MemoryModule>
    <ProgramCounter></ProgramCounter>
    <ControlModule></ControlModule>
    <OutputModule></OutputModule>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import ClockModule from "./ClockModule.vue";
import LedPanel from "./LedPanel.vue";
import MemoryAddressRegister from "./MemoryAddressRegisterModule.vue";
import MemoryModule from "./MemoryModule.vue";
import ProgramCounter from "./ProgramCounter.vue";
import AluModule from "./AluModule.vue";
import ControlModule from "./ControlModule.vue"
import OutputModule from "./OutputModule.vue";

import { offsetToAddr, addrToOffset } from "../util";

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
  "NOP",
  "LDA",
  "ADD",
  "OUT",

  "HLT",
  "STA",
  "JMP",
  "SUB",

  "LDI",
  "JC",
  "JZ",
  "???",

  "???",
  "???",
  "???",
  "???",
];

const instructionHasArgument = [
  "LDA",
  "ADD",
  "STA",
  "JMP",
  "SUB",
  "LDI",
  "JC",
  "JZ",
];

export default {
  data: () => ({
    PROGRAM,
  }),

  components: {
    ClockModule,
    LedPanel,
    MemoryAddressRegister,
    MemoryModule,
    ProgramCounter,
    AluModule,
    ControlModule,
    OutputModule,
  },

  computed: {
    ...mapGetters("clock", ["output"]),
    ...mapGetters(["bus"]),
    ...mapGetters("registerA", { aout: "out" }),
    ...mapGetters("registerB", { bout: "out" }),
    ...mapGetters("registerI", { iout: "out" }),

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
      this.$store.dispatch("program", this.PROGRAM);
    },
  },
};
</script>
