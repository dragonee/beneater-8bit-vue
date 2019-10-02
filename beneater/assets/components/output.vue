<template>
    <div>
        {{ number }}
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
