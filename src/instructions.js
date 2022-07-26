const instruction = (opcode, arg = 0) => (opcode << 4) | arg;

const OPCODE_NOP = 0b0000;
const OPCODE_LDA = 0b0001;
const OPCODE_ADD = 0b0010;
const OPCODE_OUT = 0b0011;
const OPCODE_HLT = 0b0100;
const OPCODE_STA = 0b0101;
const OPCODE_JMP = 0b0110;
const OPCODE_SUB = 0b0111;
const OPCODE_LDI = 0b1000;
const OPCODE_JC = 0b1001;
const OPCODE_JZ = 0b1010;

export const nop = instruction(OPCODE_NOP);
export const lda = (v) => instruction(OPCODE_LDA, v);
export const add = (v) => instruction(OPCODE_ADD, v);
export const out = instruction(OPCODE_OUT);
export const hlt = instruction(OPCODE_HLT);
export const sta = (v) => instruction(OPCODE_STA, v);
export const jmp = (v) => instruction(OPCODE_JMP, v);
export const sub = (v) => instruction(OPCODE_SUB, v);
export const ldi = (v) => instruction(OPCODE_LDI, v);
export const jc = (v) => instruction(OPCODE_JC, v);
export const jz = (v) => instruction(OPCODE_JZ, v);
export const db = (v) => v;
