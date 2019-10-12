<template>
    <div class="module output">
        <div class="title">Output <input type="checkbox" v-model="vcc"></div>
                
        <div class="display-box">
            <seven-segment-display 
                :word="output"
                :cathode="cathodeD"
            >
            </seven-segment-display>
            <seven-segment-display 
                :word="output"
                :cathode="cathodeC"
            >
            </seven-segment-display>
            <seven-segment-display 
                :word="output"
                :cathode="cathodeB"
            >
            </seven-segment-display>
            <seven-segment-display 
                :word="output"
                :cathode="cathodeA"
            >
            </seven-segment-display>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import SevenSegmentDisplay from './seven_segment_display'

const { mapGetters } = createNamespacedHelpers('output')

export default {
    components: {
        SevenSegmentDisplay,
    },
    
    computed: {
        ...mapGetters([
            'output',
            'cathodeA',
            'cathodeB',
            'cathodeC',
            'cathodeD',
        ]),
        
        vcc: {
            get() {
                return this.$store.state.output.vcc
            },
            
            set(value) {
                this.$store.commit('output/setVcc', value)
            }
        }
    }
}
</script>
