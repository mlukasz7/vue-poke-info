<template>
  <section>
    <SearchBox @onSearch="handleOnSearch" />
    <SwitchButton @onChange="onHandlePokeViewChange" />
    <PokeTiles v-if="pokeView === 0" :pokemons="loadedPokemons" />
    <PokeListTable v-if="pokeView === 1" :pokemons="loadedPokemons" />
    <Button text="Load more" v-if="canLoadMore" @onClick="loadMore" />
  </section>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import Button from "../Button";
import PokeListTable from "../PokeListTable/PokeListTable";
import PokeTiles from "../PokeTiles/PokeTiles";
import SearchBox from "../SearchBox";
import SwitchButton from "../SwitchButton";

import { PokeApi } from "../../utilities/PokeApi";

const POKEMON_PER_VIEW = 40;

@Component({
  components: {
    Button,
    PokeListTable,
    PokeTiles,
    SearchBox,
    SwitchButton
  }
})
class PokeSearchAndResults extends Vue {
  canLoadMore = false;

  loadedPokemons = [];

  lodaedViews = 0;

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
    let results = res && res.results ? res.results : [];

    results = results.map(el => ({
      ...el,
      id: el.url
        .replace("https://pokeapi.co/api/v2/pokemon/", "")
        .replace("/", "")
    }));

    this.pokemons = results;
    this.loadedPokemons = this.pokemons.slice(0, POKEMON_PER_VIEW);

    this.canLoadMore = this.loadedPokemons.length < this.pokemons.length;
    this.lodaedViews += 1;
  }

  async loadMore() {
    this.loadedPokemons = this.pokemons.slice(
      0,
      POKEMON_PER_VIEW * (this.lodaedViews + 1)
    );
    this.canLoadMore = this.loadedPokemons.length < this.pokemons.length;

    this.lodaedViews += 1;
  }

  handleOnSearch(query) {
    this.lodaedViews = 0;

    this.loadedPokemons = this.pokemons
      .filter(pokemon => pokemon.name.includes(query))
      .slice(0, POKEMON_PER_VIEW * (this.lodaedViews + 1));

    this.lodaedViews += 1;
  }

  onHandlePokeViewChange(mode) {
    this.pokeView = mode;
  }
}

export default PokeSearchAndResults;
</script>
