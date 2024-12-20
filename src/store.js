import ClockModule from "./modules/clock";
import RegisterModule from "./modules/register";
import InstructionRegisterModule from "./modules/instruction_register";
import MemoryAddressRegisterModule from "./modules/memory_address_register";
import MemoryModule from "./modules/memory";
import ProgramCounterModule from "./modules/program_counter";
import ALUModule from "./modules/alu";
import ControlModule from "./modules/control";
import OutputModule from "./modules/output";

import { offsetToAddr, promisifyTimeout } from "./util";

const merge = (...args) =>
  args.reduce(
    (list, next) => {
      for (let i = 0; i < 8; i += 1) {
        if (next[i]) {
          list[i] = next[i];
        }
      }

      return list;
    },
    [false, false, false, false, false, false, false, false]
  );

export default {
  state: {},

  modules: {
    clock: ClockModule,

    // order of modules regulates the timing
    // here ALU needs to be considered before the A Register
    // in order to execute FI and AI simultaneously
    alu: ALUModule({
      namespace: "alu",
      fi: "fi",
      su: "su",
      eo: "eo",
      a: "registerA/out",
      b: "registerB/out",
      CLK: "CLK",
      CLR: "CLR",
    }),

    registerA: RegisterModule({
      namespace: "registerA",
      ri: "ai",
      ro: "ao",
      CLK: "CLK",
      CLR: "CLR",
    }),

    registerB: RegisterModule({
      namespace: "registerB",
      ri: "bi",
      ro: "bo",
      CLK: "CLK",
      CLR: "CLR",
    }),

    registerI: InstructionRegisterModule({
      namespace: "registerI",
      ri: "ii",
      ro: "io",
      CLK: "CLK",
      CLR: "CLR",
    }),

    memoryAddressRegister: MemoryAddressRegisterModule({
      namespace: "memoryAddressRegister",
      mi: "mi",
      CLK: "CLK",
      CLR: "CLR",
    }),

    memory: MemoryModule({
      namespace: "memory",
      prog: "memoryAddressRegister/prog",
      ri: "ri",
      ro: "ro",
      a0: "memoryAddressRegister/a0",
      a1: "memoryAddressRegister/a1",
      a2: "memoryAddressRegister/a2",
      a3: "memoryAddressRegister/a3",
      CLK: "CLK",
    }),

    programCounter: ProgramCounterModule({
      namespace: "programCounter",
      ce: "ce",
      co: "co",
      j: "j",
      CLK: "CLK",
      CLR: "CLR",
    }),

    control: ControlModule({
      namespace: "control",
      cf: "alu/cf",
      zf: "alu/zf",
      ir: "registerI/out",
      CLK: "CLK",
    }),

    output: OutputModule({
      namespace: "output",
      oi: "oi",
      CLK: "CLK",
    }),
  },

  getters: {
    hlt: (s, g) => g["control/out"].hlt, // high act
    ai: (s, g) => g["control/out"].ai, // low act
    ao: (s, g) => g["control/out"].ao, // low act
    bi: (s, g) => g["control/out"].bi, // low act
    bo: (s, g) => g["control/out"].bo, // low act

    mi: (s, g) => g["control/out"].mi, // low act

    ii: (s, g) => g["control/out"].ii, // low act
    io: (s, g) => g["control/out"].io, // low act

    ri: (s, g) => g["control/out"].ri, // low act
    ro: (s, g) => g["control/out"].ro, // high act

    ce: (s, g) => g["control/out"].ce, // high act
    co: (s, g) => g["control/out"].co, // low act
    j: (s, g) => g["control/out"].j, // low act

    fi: (s, g) => g["control/out"].fi, // low act
    eo: (s, g) => g["control/out"].eo, // low act
    su: (s, g) => g["control/out"].su, // high act

    oi: (s, g) => g["control/out"].oi, // high act

    bus: (state, getters) =>
      merge(
        getters["registerA/bus"],
        getters["registerI/bus"],
        getters["memory/bus"],
        getters["programCounter/bus"],
        getters["alu/bus"]
      ),
  },

  mutations: {},

  actions: {
    // payload is array of 8-bit words
    async program({ commit, dispatch, getters }, payload) {
      const mode = getters["memoryAddressRegister/prog"];

      commit("memoryAddressRegister/setManualAddressingMode", true);

      for (let i = 0; i < payload.length; i += 1) {
        const word = payload[i];

        commit("memory/setSwitchStateWord", word);
        commit("memoryAddressRegister/setAddrWord", offsetToAddr(i));

        dispatch("memory/pressWriteToMemoryButton");

        await promisifyTimeout(500);
      }

      commit("memoryAddressRegister/setAddrWord", offsetToAddr(0));
      commit("memory/setSwitchStateWord", offsetToAddr(0, 8));
      commit("memoryAddressRegister/setManualAddressingMode", !mode);
    },

    // payload is array of objects with unspecified yet semantics
    async programMicrocode({ commit }) {
      // low microcode word
      /* eslint-disable-next-line one-var */
      const EO = 128,
        SU = 64,
        BI = 32,
        OI = 16,
        CE = 8,
        CO = 4,
        J = 2,
        FI = 1;

      // high microcode word
      /* eslint-disable-next-line one-var */
      const HLT = 32768,
        MI = 16384,
        RI = 8192,
        RO = 4096,
        IO = 2048,
        II = 1024,
        AI = 512,
        AO = 256;

      /* eslint-disable space-infix-ops */
      const nopInstruction = [CO | MI, RO | II | CE];

      const ldaInstruction = [CO | MI, RO | II | CE, IO | MI, RO | AI];
      const ldbInstruction = [CO | MI, RO | II | CE, IO | MI, RO | BI];

      const addInstruction = [
        CO | MI,
        RO | II | CE,
        // IO | MI,
        // RO | BI,
        EO | AI | FI,
      ];

      const hltInstuction = [CO | MI, RO | II | CE, HLT];

      const outInstruction = [CO | MI, RO | II | CE, AO | OI];

      const staInstruction = [CO | MI, RO | II | CE, IO | MI, AO | RI];

      const jmpInstruction = [CO | MI, RO | II | CE, IO | J];

      const subInstruction = [
        CO | MI,
        RO | II | CE,
        // IO | MI,
        // RO | BI,
        EO | SU | AI | FI,
      ];

      const ldaiInstruction = [CO | MI, RO | II | CE, IO | AI];
      const ldbiInstruction = [CO | MI, RO | II | CE, IO | BI];

      const jcInstruction = [
        CO | MI,
        RO | II | CE,
        { cf: IO | J, both: IO | J },
      ];

      const jzInstruction = [
        CO | MI,
        RO | II | CE,
        { zf: IO | J, both: IO | J },
      ];

      /* eslint-enable space-infix-ops */

      const instructionsToMicrocode = (instructions) => {
        const microcodeLow = Array(2048)
          .fill(null)
          .map(() => Array(8).fill(false));
        const microcodeHigh = Array(2048)
          .fill(null)
          .map(() => Array(8).fill(false));

        const MICROCODE_LOW = 128;
        const MICROCODE_HIGH = 0;

        const cfzfMap = ["default", "cf", "zf", "both"];

        for (let i = 0; i < instructions.length; i += 1) {
          const instruction = instructions[i];

          for (let step = 0; step < instruction.length; step += 1) {
            for (let cfzf = 0; cfzf < 4; cfzf += 1) {
              let microinstruction = instruction[step];

              // check object definition, e.g. {cf: RO|AI}
              if (!Number.isInteger(microinstruction)) {
                microinstruction = microinstruction[cfzfMap[cfzf]];

                // allow empty object definitions
                // and convert them to noop
                if (!Number.isInteger(microinstruction)) {
                  microinstruction = 0;
                }
              }

              const addr = step + (i << 3) + (cfzf << 8);

              microcodeLow[addr + MICROCODE_LOW] = offsetToAddr(
                microinstruction & 255,
                8
              );

              microcodeHigh[addr + MICROCODE_HIGH] = offsetToAddr(
                microinstruction >> 8,
                8
              );
            }
          }
        }

        return [microcodeLow, microcodeHigh];
      };

      const [microcodeLow, microcodeHigh] = instructionsToMicrocode([
        nopInstruction,
        ldaInstruction,
        ldbInstruction,
        addInstruction,
        outInstruction,
        hltInstuction,
        staInstruction,
        jmpInstruction,
        subInstruction,
        ldaiInstruction,
        ldbiInstruction,
        jcInstruction,
        jzInstruction,
      ]);

      commit("control/memoryLow/setContents", microcodeLow);
      commit("control/memoryHigh/setContents", microcodeHigh);
    },

    programOutputCode({ commit }) {
      const digits = [
        [true, true, true, true, true, true, false, false],
        [false, true, true, false, false, false, false, false],
        [true, true, false, true, true, false, true, false],
        [true, true, true, true, false, false, true, false],
        [false, true, true, false, false, true, true, false],
        [true, false, true, true, false, true, true, false],
        [true, false, true, true, true, true, true, false],
        [true, true, true, false, false, false, false, false],
        [true, true, true, true, true, true, true, false],
        [true, true, true, true, false, true, true, false],
      ];

      const outputCode = Array(2048)
        .fill(null)
        .map(() => Array(8).fill(false));

      for (let i = 0; i < 255; i += 1) {
        let j = i;

        for (let digit = 0; digit < 3; digit += 1) {
          outputCode[digit * 256 + i] = digits[j % 10];
          j = Math.floor(j / 10);

          if (j === 0) {
            break;
          }
        }
      }

      commit("output/memory/setContents", outputCode);
    },
  },
};
