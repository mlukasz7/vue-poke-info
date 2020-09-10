import Vue from "vue";
import Router from "vue-router";

import PokeDetails from "./pages/PokeDetails/PokeDetails";
import PokeList from "./pages/PokeList/PokeList";
import Poke404 from "./pages/Poke404/Poke404.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "list",
      component: PokeList
    },
    {
      path: "/details/:id",
      name: "details",
      component: PokeDetails
    },
    {
      path: "/404",
      name: "not found",
      component: Poke404
    },
    { path: "*", redirect: "/404" }
  ]
});

export default router;
