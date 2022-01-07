<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <Tasks
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
    :tasks="tasks"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
import { TaskObject } from "../App.vue";
export default defineComponent({
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [] as TaskObject[],
    };
  },
  methods: {
    async addTask(task: TaskObject): Promise<void> {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      this.tasks.push(data);
    },
    async deleteTask(id: number): Promise<void> {
      if (confirm("Are you sure?")) {
        const response = await fetch(`/api/tasks/${id}`, {
          method: "DELETE",
        });

        response.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Something went wrong");
        console.log(`Delete task with id: ${id}`);
      }
    },
    async toggleReminder(id: number): Promise<void> {
      const taskToToggle = await this.fetchTask(id);
      const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTask),
      });

      const data: TaskObject = await response.json();

      // Find the task with the given id and toggle the reminder property
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.reminder = data.reminder;
      }
    },
    // Fetch the tasks from the mock server
    async fetchTasks(): Promise<TaskObject[]> {
      const response = await fetch("api/tasks");
      const data = await response.json();
      return data;
    },
    // Fetch a specific task from the mock server
    async fetchTask(id: number): Promise<TaskObject> {
      const response = await fetch(`api/tasks/${id}`);
      const data = await response.json();
      return data;
    },
  },
  // This is a lifecycle hook that is called when the component is mounted
  async created() {
    // Add any code that you want to run when the component is created here
    this.tasks = await this.fetchTasks();
  },
});
</script>
