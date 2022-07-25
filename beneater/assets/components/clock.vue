<template>
  <div class="module clock">
    <div class="title">Clock</div>
    <div>
      <input v-model="miliseconds" />
      <label
        ><input type="checkbox" v-model="enabled" /> Enable astable
        generator</label
      >
    </div>

    <div>
      <button @click="toggleManualMode">X</button>

      <led :on="manualMode"></led> Manual mode
    </div>

    <div>
      <button
        @mousedown="pressManualButton"
        @mouseup="stopPressingManualButton"
      >
        X
      </button>
      <led :on="manualButton"></led> Manual button
    </div>

    <div>
      <button @click="toggleCountdown">X</button>
      <led :on="countdownMode"></led> Countdown mode

      <input v-model="countdownCounter" />
    </div>

    <led color="blue" :on="output"></led> Output
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
