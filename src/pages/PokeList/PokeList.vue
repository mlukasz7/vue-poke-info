<template>
  <div>
    <Hello
      title="Vue Poke Info"
      subtitle="Get pokemon data app, based at Pokémon API. Pokémon and Pokémon character names are trademarks of Nintendo."
    />
    <main>
      <Alert classMod="danger" v-if="appError">Error</Alert>
      <SearchBox @onCollected="onHandleCollected" @onSearch="onHandleSearch" />
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
    </main>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Hello from "../../components/Hello";
import PokeListTable from "../../components/PokeListTable/PokeListTable";
import PokeTiles from "../../components/PokeTiles/PokeTiles";
import SearchBox from "../../components/SearchBox";
import SwitchButton from "../../components/SwitchButton";

import { POKE_LIST_VIEWS } from "../../consts/PokeListView";

const POKEMON_PER_VIEW = 40;

@Component({
  components: {
    Alert,
    Button,
    Hello,
    PokeListTable,
    PokeTiles,
    SearchBox,
    SwitchButton
  }
})
class PokeList extends Vue {
  canLoadMore = false;

  loadedPokemons = [];

  loadedViews = 0;

  pokemons = [];

  pokeListViews = POKE_LIST_VIEWS;

  pokeView = POKE_LIST_VIEWS.List;

  searchCollected = false;

  query = "";

  async created() {
    await this.$store.dispatch("loadCollectedPokemons");
    await this.$store.dispatch("loadPokemons");

    this.pokemons = this.$store.getters.pokemons;

    this.loadedPokemons = this.pokemons.slice(0, POKEMON_PER_VIEW);
    this.canLoadMore = this.loadedPokemons.length < this.pokemons.length;
    this.loadedViews += 1;
  }

  get appError() {
    return this.$store.getters.appError;
  }

  async loadMore() {
    this.searchData(true);
  }

  onHandleCollected(searchCollected) {
    this.searchCollected = searchCollected;

    this.loadedViews = 0;

    this.searchData();
  }

  onHandleSearch(query) {
    this.query = query;

    this.loadedViews = 0;

    this.searchData();
  }

  searchData(fromLoadMore = false) {
    this.loadedPokemons = this.pokemons
      .filter(pokemon => {
        const collectedOrAll = !this.searchCollected
          ? true
          : this.$store.getters.collectedPokemons.includes(pokemon.id);

        return pokemon.name.includes(this.query) && collectedOrAll;
      })
      .slice(0, POKEMON_PER_VIEW * (this.loadedViews + 1));

    const filteredAllPokemons = this.pokemons.filter(pokemon => {
      const collectedOrAll = !this.searchCollected
        ? true
        : this.$store.getters.collectedPokemons.includes(pokemon.id);

      return pokemon.name.includes(this.query) && collectedOrAll;
    });

    this.canLoadMore = this.loadedPokemons.length < filteredAllPokemons.length;

    if (fromLoadMore) {
      this.loadedViews += 1;
    }
  }

  onHandlePokeViewChange(mode) {
    this.pokeView = mode;
  }
}

export default PokeList;
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 20px auto;

  &.align-center {
    text-align: center;
  }

  &.align-right {
    text-align: right;
  }
}
</style>
