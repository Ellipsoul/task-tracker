<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  // Methods are also defined here
  methods: {
    onClick(): void {
      this.$emit("btn-click");
    },
  },
  emits: ["btn-click"],
});
</script>
