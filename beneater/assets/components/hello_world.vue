<template>
    <div class="board">
        <h1>Hello from the Vue component</h1>
    
        <led :on="output" color="red"></led>

        <clock></clock>
        
        <led8bit :word="bus" color="blue" :reverse="true"></led8bit> BUS<br>
        <led8bit :word="aout" color="red" :reverse="true"></led8bit> A<br>
        <led8bit :word="bout" color="red" :reverse="true"></led8bit> B<br>
        <led8bit :word="iout" :color="['blue', 'blue', 'blue', 'blue', 'yellow', 'yellow', 'yellow', 'yellow']" :reverse="true"></led8bit> I<br>


        <switches :config="config" :options="SWITCHES_OPTS"></switches>

        <switches :config="busconfig" :options="BUS_OPTS"></switches>
        
        <memory-address-register></memory-address-register>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import Clock from './clock'
import LED8Bit from './led8bit'
import Switches from './switches'
import MemoryAddressRegister from './memory_address_register_module'

const SWITCHES_OPTS = {
    mutation: 'toggle',
    getter($store) {
        return (item) => $store.state[item.key]
    }
}

const BUS_OPTS = {
    mutation: 'setBus',
    getter($store) {
        return (item) => $store.state.bus[item.key]
    }
}

export default {
    data: () => ({
        SWITCHES_OPTS,
        BUS_OPTS
    }),
    
    components: {
        Clock,
        led8bit: LED8Bit,
        Switches,
        MemoryAddressRegister
    },
    
    computed: {
        ...mapGetters('clock', ['output']),
        ...mapGetters(['bus']),
        ...mapGetters('registerA', {aout: 'out'}),
        ...mapGetters('registerB', {bout: 'out'}),
        ...mapGetters('registerI', {iout: 'out'}),
        
        config: () => [
            { key: 'ai', label: 'AI' },
            { key: 'ao', label: 'AO' },
            { key: 'bi', label: 'BI' },
            { key: 'bo', label: 'BO' },
            { key: 'ii', label: 'II' },
            { key: 'io', label: 'IO' },
            { key: 'mi', label: 'MI' },

        ],
        
        busconfig: () => [
            { key: 7, label: 'Bus7' },
            { key: 6, label: 'Bus6' },
            { key: 5, label: 'Bus5' },
            { key: 4, label: 'Bus4' },
            { key: 3, label: 'Bus3' },
            { key: 2, label: 'Bus2' },
            { key: 1, label: 'Bus1' },
            { key: 0, label: 'Bus0' },
        ]
    }
}
</script>
