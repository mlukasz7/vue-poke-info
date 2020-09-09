<template>
  <section>
    <SearchBox @onSearch="handleOnSearch" />
    <div class="container align-right">
      <SwitchButton @onChange="onHandlePokeViewChange" />
    </div>
    <PokeTiles
      v-if="pokeView === pokeListViews.List"
      :pokemons="loadedPokemons"
    />
    <PokeListTable
      v-if="pokeView === pokeListViews.Table"
      :pokemons="loadedPokemons"
    />
    <div class="container align-center">
      <Button v-if="canLoadMore" @onClick="loadMore">Load more</Button>
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

import { POKE_LIST_VIEWS } from "../../consts/PokeListView";

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

  pokeListViews = POKE_LIST_VIEWS;

  pokeView = POKE_LIST_VIEWS.List;

  query = "";

  async mounted() {
    await this.$store.dispatch("loadPokemons");

    this.pokemons = this.$store.getters.getPokemons;

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
