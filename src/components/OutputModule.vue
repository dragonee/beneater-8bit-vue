<template>
  <div class="module output">
    <div class="title">Output <input type="checkbox" v-model="vcc" /></div>

    <div class="display-box">
      <SevenSegmentDisplay :word="output" :cathode="cathodeD">
      </SevenSegmentDisplay>
      <SevenSegmentDisplay :word="output" :cathode="cathodeC">
      </SevenSegmentDisplay>
      <SevenSegmentDisplay :word="output" :cathode="cathodeB">
      </SevenSegmentDisplay>
      <SevenSegmentDisplay :word="output" :cathode="cathodeA">
      </SevenSegmentDisplay>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import SevenSegmentDisplay from "./SevenSegmentDisplay.vue";

const { mapGetters } = createNamespacedHelpers("output");

export default {
  components: {
    SevenSegmentDisplay,
  },

  computed: {
    ...mapGetters(["output", "cathodeA", "cathodeB", "cathodeC", "cathodeD"]),

    vcc: {
      get() {
        return this.$store.state.output.vcc;
      },

      set(value) {
        this.$store.commit("output/setVcc", value);
      },
    },
  },
};
</script>
