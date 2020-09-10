<template>
  <section class="poke-tiles">
    <p v-if="!pokemons.length">No data</p>
    <div
      class="poke-tiles__tile"
      v-for="pokemon of pokemons"
      :key="pokemon.name"
    >
      <div
        class="poke-tiles__tile-content"
        :class="{ collected: collectedPokemons.includes(pokemon.id) }"
      >
        <img v-lazy="getImageSrc(pokemon.id)" alt />
        <h2 class="poke-tiles__name">{{ pokemon.name | uppercase }}</h2>
        <span class="poke-tiles__id">{{ pokemon.id }}</span>
        <button
          class="poke-tiles__check"
          :class="{ collected: collectedPokemons.includes(pokemon.id) }"
          @click="toggleCollectPokemon(pokemon.id)"
        >
          <font-awesome-icon icon="check-square" />
        </button>
      </div>
      <router-link
        class="poke-tiles__cta"
        tag="button"
        :to="{ path: `details/${pokemon.id}` }"
        :class="{ collected: collectedPokemons.includes(pokemon.id) }"
      >
        More info
      </router-link>
    </div>
  </section>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    }
  }
})
class PokeTiles extends Vue {
  @Prop({ type: Array, default: [] }) pokemons;

  get collectedPokemons() {
    return this.$store.getters.collectedPokemons;
  }

  toggleCollectPokemon(id) {
    if (this.collectedPokemons.includes(id)) {
      this.$store.dispatch("removePokemonToCollection", id);
    } else {
      this.$store.dispatch("addPokemonToCollection", id);
    }
  }

  getImageSrc(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}

export default PokeTiles;
</script>

<style lang="scss">
@import "../../App.scss";

.poke-tiles {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;

  @media (min-width: $md-viewport) {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 50px;
  }

  @media (min-width: $xl-viewport) {
    grid-template-columns: auto auto auto auto;
    padding: 20px 0;
  }

  &__tile {
    margin-bottom: 40px;
  }

  &__tile-content {
    position: relative;
    display: block;
    font-size: 1rem;
    border: 1px solid #eee;
    border-radius: 6px 6px 0 0;
    transition: border 0.3s ease-in-out;

    &.collected {
      border-color: greenyellow;
    }

    img {
      display: block;
      width: 80%;
      margin: 0 auto 10px;
      width: 180px;
      height: 180px;
    }
  }

  &__cta {
    color: $c-yellow;
    padding: 10px;
    background: transparent;
    width: 100%;
    border: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: 1px solid #eee;
    border-top: 0;
    border-radius: 0 0 6px 6px;

    &.collected {
      border-color: greenyellow;
    }
  }

  &__id {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 2rem;
    font-weight: bold;
    color: $c-blue;
    opacity: 0.3;
  }

  &__check {
    position: absolute;
    right: 5px;
    bottom: 0;
    font-size: 1.2rem;
    color: $c-blue;
    opacity: 0.1;
    border: 0;
    background: transparent;
    padding: 0;
    outline: none;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    &.collected {
      color: greenyellow;
      opacity: 1;
    }
  }

  &__name {
    margin-top: 0;
    text-align: center;
  }
}
</style>
