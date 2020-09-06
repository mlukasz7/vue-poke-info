<template>
  <section>
    <SearchBox @onSearch="handleOnSearch" />
    <div class="container align-right">
      <SwitchButton @onChange="onHandlePokeViewChange" />
    </div>
    <PokeTiles v-if="pokeView === 0" :pokemons="loadedPokemons" />
    <PokeListTable v-if="pokeView === 1" :pokemons="loadedPokemons" />
    <div class="container align-center">
      <Button text="Load more" v-if="canLoadMore" @onClick="loadMore" />
    </div>
  </section>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import Button from "../../components/Button";
import PokeListTable from "../../components/PokeListTable/PokeListTable";
import PokeTiles from "../../components/PokeTiles/PokeTiles";
import SearchBox from "../../components/SearchBox";
import SwitchButton from "../../components/SwitchButton";

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
class PokeList extends Vue {
  canLoadMore = false;

  loadedPokemons = [];

  lodaedViews = 0;

  pokemons = [];

  pokeViewStates = {
    list: 0,
    table: 1
  };

  pokeView = 0;

  query = "";

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
    this.searchData();
  }

  handleOnSearch(query) {
    this.query = query;

    this.lodaedViews = 0;

    this.searchData();
  }

  searchData() {
    this.loadedPokemons = this.pokemons
      .filter(pokemon => pokemon.name.includes(this.query))
      .slice(0, POKEMON_PER_VIEW * (this.lodaedViews + 1));

    const filteredAllPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.includes(this.query)
    );

    this.canLoadMore = this.loadedPokemons.length < filteredAllPokemons.length;

    this.lodaedViews += 1;
  }

  onHandlePokeViewChange(mode) {
    this.pokeView = mode;
  }
}

export default PokeList;
</script>

<style lang="scss">
.container {
  width: 1200px;
  margin: 0 auto 20px;

  &.align-center {
    text-align: center;
  }

  &.align-right {
    text-align: right;
  }
}
</style>
