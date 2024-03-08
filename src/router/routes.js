import { createRouter, createWebHistory } from "vue-router";
import ViewHome from "@/views/ViewHome.vue";
import ViewProduct from "@/views/ViewProduct.vue";
import ViewCart from "../../src/views/ViewCart.vue";
import ViewNotFont from "@/views/ViewNotFont.vue";

const routes = [
  { path: "/", component: ViewHome },
  { path: "/product/:id", component: ViewProduct },
  { path: "/cart", component: ViewCart },
  { path: '/:catchAll(.*)*', component: ViewNotFont }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;