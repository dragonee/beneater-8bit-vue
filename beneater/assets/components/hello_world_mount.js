import Vue from 'vue'
import Vuex from 'vuex'
import HelloWorldComponent from './hello_world.vue'

import store from '../store'
import LED from './led'

Vue.use(Vuex)
Vue.component('led', LED)



new Vue({
   render: h => h(HelloWorldComponent),
   store: new Vuex.Store(store),
   
   mounted() {
       this.$store.dispatch('clock/start')
   }
}).$mount('#app')
