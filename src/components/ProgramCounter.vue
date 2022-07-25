<template>
  <div class="module program-counter">
    <div class="title">Program Counter</div>
    <LedPanel color="green" :reverse="true" :bits="4" :word="out"></LedPanel>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import LedPanel from "./LedPanel.vue";

const { mapGetters } = createNamespacedHelpers("programCounter");

export default {
  components: {
    LedPanel,
  },

  computed: {
    ...mapGetters(["out"]),
  },
};
</script>
