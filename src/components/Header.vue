<template>
  <!-- Header component -->
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="homePage"
      @btn-click="$emit('toggle-add-task')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :color="showAddTask ? 'red' : 'green'"
    />
  </header>
</template>

<script lang="ts">
import Button from "./Button.vue";
import { defineComponent } from "vue";

export default defineComponent({
  // All components must have a name
  name: "Header",
  // Define the props that this component will accept
  props: {
    title: {
      type: String,
      default: "Task Tracker",
    },
    showAddTask: {
      type: Boolean,
      default: false,
    },
  },
  // Define the components that will be used in this component
  components: {
    Button,
  },
  emits: ["toggle-add-task"],
  computed: {
    // Redirect to home page from root route
    homePage(): boolean {
      return this.$route.path === "/";
    },
  },
});
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
