<template>
  <div id="app">
    <Hello
      title="Vue Poke Info"
      subtitle="Get pokemon data. Data based at Pokémon API. Pokémon and Pokémon character names are trademarks of Nintendo."
    />
    <SearchBox />
    <PokeTiles :pokemons="pokemons" />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import Hello from "./components/Hello.vue";
import PokeTiles from "./components/PokeTiles/PokeTiles";
import SearchBox from "./components/SearchBox";

import { PokeApi } from "./utilities/PokeApi";

@Component({
  components: {
    Hello,
    PokeTiles,
    SearchBox
  }
})
class App extends Vue {
  pokemons = [];

  created() {
    this.api = new PokeApi();
  }

  async mounted() {
    const res = await this.api.getPokemons();
    this.pokemons = res && res.results ? res.results : [];
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
