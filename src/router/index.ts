import { createRouter, createWebHistory, Router } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "Task Tracker - About",
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Task Tracker - Home",
    },
  },
];

const router: Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
