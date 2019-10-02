<template>
    <div class="module output">
        <div class="title">Output</div>
        
        <div class="number">
            {{ number }}
        </div>
    </div>
</template>
<script>
// A haphazard output module

import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('output')

export default {
    computed: {
        ...mapState([
            'number'
        ])
    }
}
</script>
