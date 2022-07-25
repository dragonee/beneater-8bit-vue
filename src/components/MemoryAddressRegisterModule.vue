<template>
  <div class="module memory-register">
    <div class="title">Memory Register</div>
    <div>
      <button @click="setManualAddressingMode(prog)">PROG</button>
      <LedDiode :on="prog" color="red"></LedDiode>
      <LedDiode :on="!prog" color="green"></LedDiode>
    </div>

    <div>
      <LedPanel
        color="yellow"
        :bits="4"
        :reverse="true"
        :word="addr"
      ></LedPanel>
    </div>

    <SwitchesPanel :config="config" :options="SWITCHES_OPTS"></SwitchesPanel>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import LedPanel from "./LedPanel.vue";
import SwitchesPanel from "./SwitchesPanel.vue";

const { mapGetters, mapMutations } = createNamespacedHelpers(
  "memoryAddressRegister"
);

const SWITCHES_OPTS = {
  mutation: "memoryAddressRegister/setAddr",
  getter($store) {
    return (item) => $store.state.memoryAddressRegister.address[item.key];
  },
  withoutLED: true,
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
    ...mapGetters(["addr", "prog"]),

    config: () => [
      { key: 3, label: "A3" },
      { key: 2, label: "A2" },
      { key: 1, label: "A1" },
      { key: 0, label: "A0" },
    ],
  },

  methods: {
    ...mapMutations(["setManualAddressingMode"]),
  },
};
</script>
