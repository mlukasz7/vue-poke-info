<template>
  <div id="app">
    <Hello
      title="Vue Poke Info"
      subtitle="Get pokemon data. Data based at Pokémon API. Pokémon and Pokémon character names are trademarks of Nintendo."
    />
    <router-view />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAlignJustify,
  faCheckSquare,
  faSquare,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Hello from "./components/Hello.vue";

library.add(faAlignJustify);
library.add(faCheckSquare);
library.add(faSquare);
library.add(faTimes);

Vue.component("font-awesome-icon", FontAwesomeIcon);

@Component({
  components: {
    Hello
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

* {
  font-family: "Roboto";
}
</style>
