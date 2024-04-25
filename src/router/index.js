import { createRouter, createWebHistory } from "vue-router";
import FirstPage from "@/views/FirstPage.vue";
import CategoryLink from "@/views/CategoryLink.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "FirstPage",
      component: FirstPage,
    },
    {
      path: "/category/:categoryId",
      name: "CategoryLink",
      component: CategoryLink,
      props: true,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
    },
  ],
});

export default router;
