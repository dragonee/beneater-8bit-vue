ldbi 1  @ Load the value 1 into register b
ldai 12 @ Load the value 12 into register a
out     @ Output the value in register a
sub     @ Subtract the value in register b from register a
jz 1    @ Jump to the first instruction if zero flag is set
jmp 2   @ Jump to the second instruction