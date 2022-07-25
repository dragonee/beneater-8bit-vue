<template>
  <div class="module alu">
    <div class="title">ALU</div>

    <led8bit color="red" :reverse="true" :word="sum"></led8bit>

    <div>
      <led-diode :on="cf" color="green"></led-diode> CF
      <led-diode :on="zf" color="green"></led-diode> ZF
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import LED8Bit from "./led8bit-line.vue";

const { mapGetters } = createNamespacedHelpers("alu");

export default {
  components: {
    led8bit: LED8Bit,
  },

  computed: {
    ...mapGetters(["sum", "cf", "zf"]),
  },
};
</script>
