import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { HomeRoutes } from "./routes/home.routes";

Vue.use(VueRouter);

const PageNotFoundRoute: RouteConfig = {
  path: "*",
  name: "Page Not found",
  redirect: "/"
};

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes: [PageNotFoundRoute, HomeRoutes]
});

export default router;
