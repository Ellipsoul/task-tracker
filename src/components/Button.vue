<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">
    {{ text }}
  </button>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  // Methods are also defined here
  methods: {
    onClick(): void {
      console.log("Button clicked!");
    },
  },
};
</script>
