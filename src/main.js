import Vue from "vue";
import VueLazyload from "vue-lazyload";

import router from "./router";
import store from "./store";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(VueLazyload);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
