<template>
  <h3>Version 1.0.0</h3>
  <router-link to="/">Go Back</router-link>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "About",
  inheritAttrs: false, // disable 'non-props' warning
});
</script>
