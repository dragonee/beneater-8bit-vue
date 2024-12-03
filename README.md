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

A test program is available in the `src/text.S` file.

Instruction addresses in the program are counted from 0. For example `jmp 4` means *jump to the position of the 5th instruction in the program*.

```assembly
ldbi 1  @ Load the value 1 into register b
ldai 12 @ Load the value 12 into register a
out     @ Output the value in register a
sub     @ Subtract the value in register b from register a
jz 1    @ Jump to the first instruction if zero flag is set
jmp 2   @ Jump to the second instruction
```

## Project Setup

```sh
docker compose up
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


