import { RouteRecordRaw, NavigationGuardWithThis } from "vue-router";
import store from "../store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "chat/:id",
        component: () => import("pages/chat.vue"),
      },
      {
        path: "/found",
        component: () => import("pages/found.vue"),
      },
      {
        path: "/found/community",
        component: () => import("pages/community.vue"),
      },
      {
        path: "my",
        component: () => import("pages/my.vue"),
      },
      {
        path: "apps",
        component: () => import("pages/apps.vue"),
      },
      {
        path: "app",
        component: () => import("pages/app.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/login.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/register.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
