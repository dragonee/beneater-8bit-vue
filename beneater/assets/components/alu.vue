<template>
    <div class="module alu">
        <div class="title">ALU</div>
        
        <led8bit color="red" :reverse="true" :word="sum"></led8bit>
        
        <div>
            <led :on="cf" color="green"></led> CF
            <led :on="zf" color="green"></led> ZF
        </div>
    </div>
    

</template>
<script>

import LED8Bit from './led8bit'

import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('alu')

export default {
    components: {
        led8bit: LED8Bit
    },
    
    computed: {    
        ...mapGetters([
            'sum',
            'cf',
            'zf'
        ])
    },
    
    methods: {
    }
}
</script>
