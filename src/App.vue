<!-- Top level app to be mounted to the DOM -->
<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask" :showAddTask="showAddTask" />
    <div v-if="showAddTask">
      <AddTask @add-task="addTask" />
    </div>
    <!-- Bind the tasks prop to the tasks data here -->
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="tasks"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Tasks from "./components/Tasks.vue";
import AddTask from "./components/AddTask.vue";

export type TaskObject = {
  id?: number;
  text: string;
  day: string;
  reminder: boolean;
};

// Define the top level component here
export default defineComponent({
  name: "App",
  components: {
    Header,
    Tasks,
    AddTask,
  },
  data() {
    return {
      // Add any data that you want to be accessible to the components here
      tasks: [] as TaskObject[],
      showAddTask: false,
    };
  },
  // This is a lifecycle hook that is called when the component is mounted
  async created() {
    // Add any code that you want to run when the component is created here
    this.tasks = await this.fetchTasks();
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
    toggleAddTask(): void {
      this.showAddTask = !this.showAddTask;
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
});
</script>

<style>
/* And global styles belong here */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
