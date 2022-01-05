<!-- Top level app to be mounted to the DOM -->
<template>
  <div class="container">
    <Header />
    <!-- Bind the tasks prop to the tasks data here -->
    <Tasks :tasks="tasks" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Tasks from "./components/Tasks.vue";

export type Task = {
  id: number;
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
  },
  data() {
    return {
      // Add any data that you want to be accessible to the components here
      tasks: [] as Task[],
    };
  },
  // This is a lifecycle hook that is called when the component is mounted
  created() {
    // Add any code that you want to run when the component is created here
    this.tasks = [
      {
        id: 1,
        text: "Learn Vue",
        day: "Monday",
        reminder: true,
      },
      {
        id: 2,
        text: "Learn TypeScript",
        day: "Tuesday",
        reminder: false,
      },
      {
        id: 3,
        text: "Learn Vuex",
        day: "Wednesday",
        reminder: true,
      },
    ];
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
