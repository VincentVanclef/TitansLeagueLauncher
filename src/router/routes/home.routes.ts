import { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

export const HomeRoutes: RouteConfig = {
  path: "/",
  name: "Home",
  component: Home,
  meta: {
    requiresAuth: false
  }
};
