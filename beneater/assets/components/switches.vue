<template>
    <div>
        <span v-for="item in config">
            
            <button  @click="toggle(item)">{{ item.label }}</button>
            <led :on="state(item)" :color="item.color || 'red'"></led>
        </span>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        state() {
            return this.options.getter(this.$store)
        }
    },
    props: {
        config: Array,
        options: Object
    },
    methods: {
        toggle(item) {
            this.$store.commit(this.options.mutation, item)
        }
    }
}
</script>
