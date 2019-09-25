<template>
    <div class="board">
        <h1>Hello from the Vue component</h1>
    
        <led :on="output" color="red"></led>

        <clock></clock>
        
        <led8bit :word="bus" color="blue"></led8bit> BUS<br>
        <led8bit :word="aout" color="red"></led8bit> A<br>
        <led8bit :word="bout" color="red"></led8bit> B<br>


    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import Clock from './clock'
import LED8Bit from './led8bit'

export default {
    components: {
        Clock,
        led8bit: LED8Bit
    },
    
    computed: {
        ...mapGetters('clock', ['output']),
        ...mapGetters(['bus']),
        ...mapGetters('registerA', {aout: 'out'}),
        ...mapGetters('registerB', {bout: 'out'})

    }
}
</script>
