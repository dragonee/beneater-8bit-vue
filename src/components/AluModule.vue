<template>
  <div class="module alu">
    <div class="title">ALU</div>

    <LedPanel color="red" :reverse="true" :word="sum"></LedPanel>

    <div>
      <LedDiode :on="cf" color="green"></LedDiode> CF
      <LedDiode :on="zf" color="green"></LedDiode> ZF
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import LedPanel from "./LedPanel.vue";

const { mapGetters } = createNamespacedHelpers("alu");

export default {
  components: {
    LedPanel,
  },

  computed: {
    ...mapGetters(["sum", "cf", "zf"]),
  },
};
</script>
