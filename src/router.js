import Vue from "vue";
import Router from "vue-router";

import PokeDetails from "./pages/PokeDetails/PokeDetails";
import PokeList from "./pages/PokeList/PokeList";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/list",
      name: "list",
      component: PokeList
    },
    {
      path: "/details",
      name: "details",
      component: PokeDetails
    }
  ]
});

export default router;
