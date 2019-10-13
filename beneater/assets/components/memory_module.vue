<template>
    <div class="module memory">
        <div class="title">Memory</div>
        <div>
            <led8bit color="red" :reverse="true" :word="memory"></led8bit>
        </div>

        <switches :config="config" :options="SWITCHES_OPTS"></switches>

        <div>
            <button @click="pressWriteToMemoryButton">PWORD</button>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';

import LED8Bit from './led8bit.vue';
import Switches from './switches.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('memory');

const SWITCHES_OPTS = {
    mutation: 'memory/setSwitchState',
    getter($store) {
        return (item) => $store.state.memory.switchState[item.key];
    },
};

export default {
    data: () => ({
        SWITCHES_OPTS,
    }),

    components: {
        led8bit: LED8Bit,
        Switches,
    },

    computed: {
        ...mapGetters([
            'memory',
        ]),

        config: () => [
            { key: 7, label: 'M7' },
            { key: 6, label: 'M6' },
            { key: 5, label: 'M5' },
            { key: 4, label: 'M4' },
            { key: 3, label: 'M3' },
            { key: 2, label: 'M2' },
            { key: 1, label: 'M1' },
            { key: 0, label: 'M0' },
        ],
    },

    methods: {
        ...mapActions(['pressWriteToMemoryButton']),
    },
};
</script>
