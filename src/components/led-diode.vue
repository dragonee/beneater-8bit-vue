<template>
  <div class="led" :class="ledClasses"></div>
</template>
<script>
export default {
  computed: {
    ledClasses() {
      return [this.color, this.on ? "on" : "off"];
    },
  },

  props: {
    on: Boolean,
    color: {
      validator(value) {
        return ["red", "green", "blue", "yellow"].indexOf(value) !== -1;
      },

      default: "red",
    },
  },
};
</script>
