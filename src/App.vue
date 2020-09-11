<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAlignJustify,
  faArrowLeft,
  faArrowRight,
  faCheckSquare,
  faSquare,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Footer from "./components/Footer";

library.add(
  faAlignJustify,
  faArrowLeft,
  faArrowRight,
  faCheckSquare,
  faSquare,
  faTimes
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

@Component({
  components: {
    Footer
  }
})
class App extends Vue {}

export default App;
</script>

<style>
@font-face {
  font-family: "Roboto";
  src: url("./fonts/Roboto-Light.ttf");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Roboto";
  src: url("./fonts/Roboto-Bold.ttf");
  font-weight: bold;
  font-style: bold;
}

body {
  padding: 0;
  margin: 0;
}

* {
  font-family: "Roboto";
  box-sizing: border-box;
}
</style>
