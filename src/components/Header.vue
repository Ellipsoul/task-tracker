<template>
  <!-- Header component -->
  <header>
    <h1>{{ title }}</h1>
    <Button text="Add Task" color="green" />
  </header>
</template>

<script lang="ts">
import Button from "./Button.vue";

export default {
  // All components must have a name
  name: "Header",
  // Define the props that this component will accept
  props: {
    title: {
      type: String,
      default: "Task Tracker",
    },
  },
  // Define the components that will be used in this component
  components: {
    Button,
  },
};
</script>

<style scoped>
/* Scoped styles can be added here */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
