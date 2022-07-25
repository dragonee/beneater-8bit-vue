<template>
  <div class="module memory">
    <div class="title">Memory</div>
    <div>
      <LedPanel color="red" :reverse="true" :word="memory"></LedPanel>
    </div>

    <SwitchesPanel :config="config" :options="SWITCHES_OPTS"></SwitchesPanel>

    <div>
      <button @click="pressWriteToMemoryButton">PWORD</button>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import LedPanel from "./LedPanel.vue";
import SwitchesPanel from "./SwitchesPanel.vue";

const { mapGetters, mapActions } = createNamespacedHelpers("memory");

const SWITCHES_OPTS = {
  mutation: "memory/setSwitchState",
  getter($store) {
    return (item) => $store.state.memory.switchState[item.key];
  },
};

export default {
  data: () => ({
    SWITCHES_OPTS,
  }),

  components: {
    LedPanel,
    SwitchesPanel,
  },

  computed: {
    ...mapGetters(["memory"]),

    config: () => [
      { key: 7, label: "M7" },
      { key: 6, label: "M6" },
      { key: 5, label: "M5" },
      { key: 4, label: "M4" },
      { key: 3, label: "M3" },
      { key: 2, label: "M2" },
      { key: 1, label: "M1" },
      { key: 0, label: "M0" },
    ],
  },

  methods: {
    ...mapActions(["pressWriteToMemoryButton"]),
  },
};
</script>
