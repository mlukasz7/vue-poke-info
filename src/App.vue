<template>
  <div id="app">
    <Hello
      title="Vue Poke Info"
      subtitle="Get pokemon data. Data based at Pokémon API. Pokémon and Pokémon character names are trademarks of Nintendo."
    />
    <SearchBox />
    <SwitchButton @onChange="onHandlePokeViewChange" />
    <PokeTiles v-if="pokeView === 0" :pokemons="pokemons" />
    <PokeListTable v-if="pokeView === 1" :pokemons="pokemons" />
    <Button text="Load more" v-if="canLoadMore" @onClick="loadMore" />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAlignJustify, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Button from "./components/Button";
import Hello from "./components/Hello.vue";
import PokeListTable from "./components/PokeListTable/PokeListTable";
import PokeTiles from "./components/PokeTiles/PokeTiles";
import SearchBox from "./components/SearchBox";
import SwitchButton from "./components/SwitchButton";

import { PokeApi } from "./utilities/PokeApi";

library.add(faAlignJustify);
library.add(faSquare);

Vue.component("font-awesome-icon", FontAwesomeIcon);

@Component({
  components: {
    Button,
    Hello,
    PokeListTable,
    PokeTiles,
    SearchBox,
    SwitchButton
  }
})
class App extends Vue {
  canLoadMore = false;

  pokemons = [];

  pokeViewStates = {
    list: 0,
    table: 1
  };

  pokeView = 0;

  created() {
    this.api = new PokeApi();
  }

  async mounted() {
    const res = await this.api.getPokemons();
    this.canLoadMore = Boolean(res.next);
    this.pokemons = res && res.results ? res.results : [];
  }

  async loadMore() {
    const offset = this.pokemons.length;
    const res = await this.api.getPokemons(offset);

    if (res && res.results) {
      this.canLoadMore = Boolean(res.next);
      this.pokemons = [...this.pokemons, ...res.results];
    }
  }

  onHandlePokeViewChange(mode) {
    this.pokeView = mode;
  }
}

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
