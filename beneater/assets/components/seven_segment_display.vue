<template>
    <svg xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="0 0 57 80"
        
        :class="color"
        class="display"
    >
        <defs>
            <polyline id="h-seg" points="11 0, 37 0, 42 5, 37 10, 11 10, 6 5"></polyline>
            <polyline id="v-seg" points="0 11, 5 6, 10 11, 10 34, 5 39, 0 39"></polyline>
        </defs>
        
        <g class="segGroup">
            <use xlink:href="#h-seg" x="0" y="0" :class="storedWord[0] ? 'on': 'off'"></use>
            <use xlink:href="#v-seg" x="-48" y="0" :class="storedWord[1] ? 'on': 'off'" transform="scale(-1,1)"></use>
            <use xlink:href="#v-seg" x="-48" y="-80" :class="storedWord[2] ? 'on': 'off'" transform="scale(-1,-1)"></use>
            <use xlink:href="#h-seg" x="0" y="70" :class="storedWord[3] ? 'on': 'off'"></use>
            <use xlink:href="#v-seg" x="0" y="-80" :class="storedWord[4] ? 'on': 'off'" transform="scale(1,-1)"></use>
            <use xlink:href="#v-seg" x="0" y="0" :class="storedWord[5] ? 'on': 'off'"></use>
            <use xlink:href="#h-seg" x="0" y="35" :class="storedWord[6] ? 'on': 'off'"></use>
        </g>
        <circle cx="52" cy="75" r="5" :class="storedWord[7] ? 'on': 'off'"></circle>

    </svg>
    
</template>

<script>

// Based on a script from
// https://github.com/BrandonLWhite/sevenSeg.js/blob/gh-pages/sevenSeg.js

export default {
    data: () => ({
        // use state to prevent requirement to have a 1kHz clock
        storedWord: [false, false, false, false, false, false, false, false]
    }),
    
    computed: {
    },
    
    watch: {
        cathode(value) {
            if (!value) {
                this.storedWord = [...this.word]
            }
        }
    },
    
    props: {
        word: Array,
        color: {
            validator(value) {
                return ['red', 'green', 'blue', 'yellow'].indexOf(value) !== -1
            },
            
            default: 'red'
        },
        
        cathode: Boolean,
    }
}
</script>
