<template>
    <div class="board">
        <h1>Hello from the Vue component</h1>
    
        <led :on="output" color="red"></led>

        <clock></clock>

    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import Clock from './clock'

export default {
    components: {
        Clock,
    },
    
    computed: {
        ...mapGetters('clock', ['output']),
    }
}
</script>
