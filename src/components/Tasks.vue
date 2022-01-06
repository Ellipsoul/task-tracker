<template>
  <div v-for="task in tasks" :key="task.id">
    <!-- Emit up one more level -->
    <Task
      @toggle-reminder="$emit('toggle-reminder', task.id)"
      @delete-task="$emit('delete-task', task.id)"
      :task="task"
    />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { TaskObject } from "../App.vue";
import Task from "./Task.vue";

export default {
  name: "Tasks",
  props: {
    tasks: Array as PropType<TaskObject[]>,
  },
  components: {
    Task,
  },
  emits: ["delete-task", "toggle-reminder"],
};
</script>
