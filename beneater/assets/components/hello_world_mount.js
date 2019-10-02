import Vue from 'vue'
import Vuex from 'vuex'
import HelloWorldComponent from './hello_world.vue'

import store from '../store'
import LED from './led'


Vue.use(Vuex)
Vue.component('led', LED)

const vuex_store = new Vuex.Store(store)

vuex_store.watch((s, g) => g['clock/output'], (val) => {
    if (val) {
        vuex_store.dispatch('CLK')
    }
})

vuex_store.watch((s, g) => g['memory/multiplexerManual/pin12'], (val) => {
    if (!val) {
        vuex_store.dispatch('WE')
    }
})

vuex_store.watch((s, g) => g['control/resetNand/pin3'], (val) => {
    if (!val) {
        vuex_store.dispatch('C_MICROINSTRUCTION_CLR')
    }
})

vuex_store.watch((s, g) => g['control/resetNand/pin11'], (val) => {
    if (val) {
        vuex_store.dispatch('CLR')
    }
})

new Vue({
   render: h => h(HelloWorldComponent),
   store: vuex_store,
   
   mounted() {
       this.$store.dispatch('programMicrocode')
       this.$store.dispatch('clock/start')
   }
}).$mount('#app')
