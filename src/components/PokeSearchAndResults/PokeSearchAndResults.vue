<template>
  <section>
    <SearchBox />
    <SwitchButton @onChange="onHandlePokeViewChange" />
    <PokeTiles v-if="pokeView === 0" :pokemons="pokemons" />
    <PokeListTable v-if="pokeView === 1" :pokemons="pokemons" />
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

export default PokeSearchAndResults;
</script>
