import { RouteConfig } from "vue-router";

export const HomeRoutes: RouteConfig = {
  path: "/",
  name: "Frontpage",
  component: () => import("@/views/Home.vue"),
  meta: {
    requiresAuth: false,
    showCaroussel: true
  }
};
