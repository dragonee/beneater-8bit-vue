<template>
  <div>
    <span v-for="item in config" :key="item.key">
      <button @click="toggle(item)">{{ item.label }}</button>
      <led
        v-if="!options.withoutLED"
        :on="state(item)"
        :color="item.color || 'red'"
      ></led>
    </span>
  </div>
</template>
<script>
export default {
  computed: {
    state() {
      return this.options.getter(this.$store);
    },
  },
  props: {
    config: Array,
    options: Object,
  },
  methods: {
    toggle(item) {
      this.$store.commit(this.options.mutation, item);
    },
  },
};
</script>
