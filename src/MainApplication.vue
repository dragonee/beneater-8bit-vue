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

import ClockModule from "./components/ClockModule.vue";
import LedPanel from "./components/LedPanel.vue";
import MemoryAddressRegister from "./components/MemoryAddressRegisterModule.vue";
import MemoryModule from "./components/MemoryModule.vue";
import ProgramCounter from "./components/ProgramCounter.vue";
import AluModule from "./components/AluModule.vue";
import ControlModule from "./components/ControlModule.vue";
import OutputModule from "./components/OutputModule.vue";

import { offsetToAddr, addrToOffset } from "./util";

import { sub, jz, out, jmp, add, jc, db } from "./instructions";

const PROGRAM = [
  sub(9),
  jz(4),
  out,
  jmp(0),
  add(9),
  jc(0),
  out,
  jmp(4),
  db(10),
  db(32),
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
