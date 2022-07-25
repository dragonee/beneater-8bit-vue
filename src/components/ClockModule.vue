<template>
  <div class="module clock">
    <div class="title">Clock</div>
    <div>
      <input type="text" v-model="miliseconds" />
      <label
        ><input type="checkbox" v-model="enabled" /> Enable astable
        generator</label
      >
    </div>

    <div>
      <button @click="toggleManualMode">X</button>

      <LedDiode :on="manualMode"></LedDiode> Manual mode
    </div>

    <div>
      <button
        @mousedown="pressManualButton"
        @mouseup="stopPressingManualButton"
      >
        X
      </button>
      <LedDiode :on="manualButton"></LedDiode> Manual button
    </div>

    <div>
      <button @click="toggleCountdown">X</button>
      <LedDiode :on="countdownMode"></LedDiode> Countdown mode

      <input type="text" v-model="countdownCounter" />
    </div>

    <LedDiode color="blue" :on="output"></LedDiode> Output
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers("clock");

export default {
  computed: {
    miliseconds: {
      get() {
        return this.$store.state.clock.miliseconds;
      },

      set(value) {
        this.$store.commit("clock/setMiliseconds", value);
      },
    },

    countdownCounter: {
      get() {
        return this.$store.state.clock.countdownCounter;
      },

      set(value) {
        this.$store.commit("clock/setCountdownCounter", value);
      },
    },

    enabled: {
      get() {
        return this.$store.state.clock.vcc;
      },

      set(value) {
        this.$store.commit("clock/setVoltage", value);
      },
    },

    ...mapState(["manualMode", "manualButton", "countdownMode"]),

    ...mapGetters(["output"]),
  },

  methods: {
    ...mapMutations([
      "setManualButton",
      "selectManualMode",
      "setCountdownMode",
    ]),

    toggleManualMode() {
      this.selectManualMode(!this.manualMode);
    },

    toggleCountdown() {
      this.setCountdownMode(!this.countdownMode);
    },

    pressManualButton() {
      this.setManualButton(true);
    },

    stopPressingManualButton() {
      this.setManualButton(false);
    },
  },
};
</script>
