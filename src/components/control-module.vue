<template>
  <div class="module control">
    <div class="title">Control Logic</div>
    <div>
      <led8bit
        color="blue"
        :reverse="true"
        :word="outPositive"
        :labels="outPositiveLabels"
        :bits="16"
      ></led8bit>
    </div>

    <div>
      <led8bit
        color="red"
        :reverse="true"
        :word="binaryMicroinstruction"
        :bits="3"
      ></led8bit>

      <led8bit
        color="green"
        :reverse="false"
        :word="decodedMicroinstruction"
        :bits="5"
      ></led8bit>
    </div>

    <div>
      <button @click="pressResetButton">Reset</button>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import LED8Bit from "./led8bit-line.vue";

const { mapGetters, mapActions } = createNamespacedHelpers("control");

export default {
  components: {
    led8bit: LED8Bit,
  },

  computed: {
    ...mapGetters([
      "decodedMicroinstruction",
      "binaryMicroinstruction",
      "outPositive",
      "outPositiveLabels",
    ]),
  },

  methods: {
    ...mapActions(["pressResetButton"]),
  },
};
</script>
