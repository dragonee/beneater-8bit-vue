# Ben Eater's 8-Bit Computer

Ben Eater's computer in Vue2. Works with node@v16.

![Computer in action](computer.gif)

For more information about the reference implementation of the computer, check out [Ben Eater's homepage](https://beneater.net/8bit).

# Quickstart

```
npm install
npm run dev
```

## Running test program

To run the test program, follow these steps:

1. Uncheck the *Enable astable generator* flag in the Clock module;
2. Click *Reset* to clear bus;
3. Click *Load program* – wait until it finishes;
4. Check back the *Enable astable generator* flag in the module;

The program will start counting down by 32 to 0 and back up.

## Modifying the test program

A test program is available in the `src/MainApplication.vue` file in the `PROGRAM` constant.

Instruction addresses in the program are counted from 0. For example `jmp 4` means *jump to the position of the 5th instruction in the program*.

```assembly
sub 9   ; substract from address 9
jz  4   ; jump-if-zero to address 4
out     ; display A register
jmp 0
add 9   ; add from address 9
jc  0   ; jump-if-carry to address 0
out     ; display A register
jmp 4
db  10  ; value of 10, unused
db  32  ; value of 32
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


