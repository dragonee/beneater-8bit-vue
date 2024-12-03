<template>
  <div class="board">
    <div class="module">
      <div class="title">Ben Eater's 8-Bit computer</div>

      <div class="flex">
      <div class="board-display"><LedDiode :on="output" color="red"></LedDiode> Clock<br />
      <LedPanel class="bus" :word="bus" color="blue" :reverse="true"></LedPanel> BUS<br />
      <LedPanel :word="aout" color="red" :reverse="true"></LedPanel> <span class="register">A</span> <code class="value">{{ aoutNumber }}</code><br />
      <LedPanel :word="bout" color="red" :reverse="true"></LedPanel> <span class="register">B</span> <code class="value">{{ boutNumber }}</code><br />
      <LedPanel class="instruction"
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
      <span class="register">I</span> <code class="disasm">{{ disasm }}</code>
      <br />
      <label><input type="checkbox" v-model="showPanels" /> Show panels</label>
      </div>

      <div class="program">
        <pre><code
          v-for="([highlight, line], index) in programWithHighlight"
          :class="{ highlight: highlight }"
          :data-line="index"
        >{{ line + "\n" }}</code></pre>
        <button @click="loadProgram">LOAD PROGRAM</button>
      </div>
    </div>
    </div>

    <ClockModule></ClockModule>
    <AluModule v-if="showPanels"></AluModule>
    <MemoryAddressRegister v-if="showPanels"></MemoryAddressRegister>
    <MemoryModule v-if="showPanels"></MemoryModule>
    <ProgramCounter v-if="showPanels"></ProgramCounter>
    <ControlModule v-if="showPanels"></ControlModule>
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

import { addrToOffset } from "./util";

import { assembleFromText, parseText } from "./instructions";

import text from "./text.S?raw";

const PROGRAM = assembleFromText(text);

const instructions = [
  "NOP",
  "LDA",
  "LDB",
  "ADD",

  "OUT",
  "HLT",
  "STA",
  "JMP",

  "SUB",
  "LDAI",
  "LDBI",
  "JC",

  "JZ",
  "???",
  "???",
  "???",
];

const instructionHasArgument = [
  "LDA",
  "LDB",
  "STA",
  "JMP",
  "LDAI",
  "LDBI",
  "JC",
  "JZ",
];

export default {
  data: () => ({
    PROGRAM,
    showPanels: true,
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

    programWithHighlight() {
      const instruction = this.disasm.toLowerCase();

      return parseText(text).map((line, index) => {
        return line === instruction ?
          [true, line] :
          [false, line];
      });
    },

    aoutNumber() {
      return addrToOffset(this.aout);
    },

    boutNumber() {
      return addrToOffset(this.bout);
    },
  },

  methods: {
    loadProgram() {
      this.$store.dispatch("program", this.PROGRAM);
    },
  },
};
</script>
