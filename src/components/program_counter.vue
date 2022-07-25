<template>
  <div class="module program-counter">
    <div class="title">Program Counter</div>
    <led8bit color="green" :reverse="true" :bits="4" :word="out"></led8bit>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import LED8Bit from "./led8bit-line.vue";

const { mapGetters } = createNamespacedHelpers("programCounter");

export default {
  components: {
    led8bit: LED8Bit,
  },

  computed: {
    ...mapGetters(["out"]),
  },
};
</script>
