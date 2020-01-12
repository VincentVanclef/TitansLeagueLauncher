import { RouteConfig } from "vue-router";

export const HomeRoutes: RouteConfig = {
  path: "/",
  name: "Home",
  component: () => import("@/views/Home.vue"),
  meta: {
    requiresAuth: false
  }
};
