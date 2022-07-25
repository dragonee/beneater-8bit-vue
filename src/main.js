import Vue from "vue";
import Vuex from "vuex";

import MainApplication from "./components/MainApplication.vue";

import store from "./store";

import LedDiode from "./components/LedDiode.vue";

import "./assets/example.scss";

Vue.use(Vuex);
Vue.component("LedDiode", LedDiode);

const vuexStore = new Vuex.Store(store);

vuexStore.watch(
  (s, g) => g["clock/output"],
  (val) => {
    vuexStore.dispatch("CLK", { rising: val });
  }
);

vuexStore.watch(
  (s, g) => g["memory/multiplexerManual/pin12"],
  (val) => {
    if (!val) {
      vuexStore.dispatch("WE");
    }
  }
);

vuexStore.watch(
  (s, g) => g["control/resetNand/pin3"],
  (val) => {
    if (!val) {
      vuexStore.dispatch("C_MICROINSTRUCTION_CLR");
    }
  }
);

vuexStore.watch(
  (s, g) => g["control/resetNand/pin11"],
  (val) => {
    if (val) {
      vuexStore.dispatch("CLR");
    }
  }
);

vuexStore.watch(
  (s, g) => g["output/andGate/pin3"],
  (val) => {
    vuexStore.dispatch("CLKOI", { rising: val });
  }
);

vuexStore.watch(
  (s, g) => g["output/counter/pin14"],
  (val) => {
    vuexStore.dispatch("CLK2", { rising: val });
  }
);

const vm = new Vue({
  render: (h) => h(MainApplication),
  store: vuexStore,

  mounted() {
    this.$store.dispatch("programMicrocode");
    this.$store.dispatch("programOutputCode");

    if (window.location.hash === "#debug") {
      this.$store.commit("output/setVcc", false);
      this.$store.commit("clock/setVoltage", false);
    }

    this.$store.dispatch("clock/start");
    this.$store.dispatch("output/start");
  },
});

vm.$mount("#app");
