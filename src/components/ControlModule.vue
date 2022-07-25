<template>
  <div class="module control">
    <div class="title">Control Logic</div>
    <div>
      <LedPanel
        color="blue"
        :reverse="true"
        :word="outPositive"
        :labels="outPositiveLabels"
        :bits="16"
      ></LedPanel>
    </div>

    <div>
      <LedPanel
        color="red"
        :reverse="true"
        :word="binaryMicroinstruction"
        :bits="3"
      ></LedPanel>

      <LedPanel
        color="green"
        :reverse="false"
        :word="decodedMicroinstruction"
        :bits="5"
      ></LedPanel>
    </div>

    <div>
      <button @click="pressResetButton">Reset</button>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import LedPanel from "./LedPanel.vue";

const { mapGetters, mapActions } = createNamespacedHelpers("control");

export default {
  components: {
    LedPanel,
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
