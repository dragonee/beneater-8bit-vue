Comment code

Make refactors:
 - move assembler/disassembler code to own module
 - clock debug code - too much high-level logic?
 - setVcc, setVoltage
 - setContents function to program at28c16?

Styling

Features:
    Implement code editor for this assembler? 
    CodeMirror + lexer-tokenizer

It even can store programs in query param or hash editor.

Update README

Thoughts & challenges:
- Vue developer tools do fail with two clocks 100ms.
- Vue does choke up on higher clock speeds (allowing 5-10 microinstructions/s)
- The main architectural challenge is that sometimes STATE DOES CHANGE. 
In order to do mutations, you need to do actions. In order to do actions, 
you need watchers. Rx should be simpler in that question.
- 7476, or, really implementing a flip-flop poses a challenge,
- There's no way of faithfully implementing 7-segment display without additional
latches/state, due to 1kHz cycling not being available on this platform.
- Some modules were as simple and as fast as just translating the circuitry
to a Vuex module. Nice to have the schematics pritned.
- Wiring through configurable functions. Module-generating functions.
