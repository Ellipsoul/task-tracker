<template>
  <div v-for="task in tasks" :key="task.id">
    <h3>
      {{ task.text }}
    </h3>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Task } from "../App.vue";

export default {
  name: "Tasks",
  props: {
    tasks: Array as PropType<Task[]>,
  },
};
</script>
