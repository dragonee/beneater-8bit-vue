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

new Vue({
   render: h => h(HelloWorldComponent),
   store: vuex_store,
   
   mounted() {
       this.$store.dispatch('clock/start')
   }
}).$mount('#app')
