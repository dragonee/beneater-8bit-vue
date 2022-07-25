<template>
  <div class="module memory-register">
    <div class="title">Memory Register</div>
    <div>
      <button @click="setManualAddressingMode(prog)">PROG</button>
      <led :on="prog" color="red"></led>
      <led :on="!prog" color="green"></led>
    </div>

    <div>
      <led8bit color="yellow" :bits="4" :reverse="true" :word="addr"></led8bit>
    </div>

    <switches :config="config" :options="SWITCHES_OPTS"></switches>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import LED8Bit from "./led8bit.vue";
import Switches from "./switches.vue";

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
    led8bit: LED8Bit,
    Switches,
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
