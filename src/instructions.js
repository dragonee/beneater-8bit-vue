import { offsetToAddr } from "./util";

const instruction = (opcode, arg = 0) => (opcode << 4) | arg;

const OPCODE_NOP = 0b0000;
const OPCODE_LDA = 0b0001;
const OPCODE_LDB = 0b0010;
const OPCODE_ADD = 0b0011;
const OPCODE_OUT = 0b0100;
const OPCODE_HLT = 0b0101;
const OPCODE_STA = 0b0110;
const OPCODE_JMP = 0b0111;
const OPCODE_SUB = 0b1000;
const OPCODE_LDAI = 0b1001;
const OPCODE_LDBI = 0b1010;
const OPCODE_JC = 0b1011;
const OPCODE_JZ = 0b1100;

export const nop = instruction(OPCODE_NOP);
export const lda = (v) => instruction(OPCODE_LDA, v);
export const ldb = (v) => instruction(OPCODE_LDB, v);
export const add = (v) => instruction(OPCODE_ADD, v);
export const out = instruction(OPCODE_OUT);
export const hlt = instruction(OPCODE_HLT);
export const sta = (v) => instruction(OPCODE_STA, v);
export const jmp = (v) => instruction(OPCODE_JMP, v);
export const sub = (v) => instruction(OPCODE_SUB, v);
export const ldai = (v) => instruction(OPCODE_LDAI, v);
export const ldbi = (v) => instruction(OPCODE_LDBI, v);
export const jc = (v) => instruction(OPCODE_JC, v);
export const jz = (v) => instruction(OPCODE_JZ, v);
export const db = (v) => v;

export const ops = {
    nop: () => nop,
    lda,
    ldb,
    add,
    out: () => out,
    hlt: () => hlt,
    sta,
    jmp,
    sub,
    ldai,
    ldbi,
    jc,
    jz,
    db,
};

export const assembleFromOpcodes = (instructions) => {
  return instructions.map((x) => offsetToAddr(x, 8));
};

export const opcodesFromList = (list) => {
    return list.map((x) => {
        const [op, arg] = x.split(" ");
        return ops[op](parseInt(arg));
    });
};

export const parseText = (text) => {
  return text
      .split("\n")
      .map((x) => x.replace(/@.*$/, "").trim())
      .filter((x) => x !== "");
};

export const opcodesFromText = (text) => {
  return opcodesFromList(parseText(text));
};

export const assembleFromText = (text) => {
  return assembleFromOpcodes(opcodesFromText(text));
};

export const assembleFromList = (list) => {
  return assembleFromOpcodes(opcodesFromList(list));
};
