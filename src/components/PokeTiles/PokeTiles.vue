<template>
  <section class="poke-tiles">
    <p v-if="!pokemons.length">No data</p>
    <div
      class="poke-tiles__tile"
      v-for="pokemon of pokemons"
      :class="{ collected: collectedPokemons.includes(pokemon.id) }"
      :key="pokemon.name"
    >
      <img :src="getImageSrc(pokemon.id)" alt />
      <h2 class="poke-tiles__name">{{ pokemon.name | uppercase }}</h2>
      <span class="poke-tiles__id">{{ pokemon.id }}</span>
      <router-link
        class="poke-tiles__cta"
        tag="button"
        :to="{ path: `details/${pokemon.id}` }"
      >
        More info
      </router-link>
      <button
        class="poke-tiles__check"
        :class="{ collected: collectedPokemons.includes(pokemon.id) }"
        @click="toggleCollectPokemon(pokemon.id)"
      >
        <font-awesome-icon icon="check-square" />
      </button>
    </div>
  </section>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

import { PokeColletion } from "../../utilities/PokeCollection";

@Component({
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    }
  }
})
class PokeTiles extends Vue {
  @Prop({ type: Array, default: [] }) pokemons;

  collectedPokemons = [];

  created() {
    this.pokeCollection = new PokeColletion();
    this.collectedPokemons = this.pokeCollection.collectedPokemons;
  }

  toggleCollectPokemon(id) {
    if (this.collectedPokemons.includes(id)) {
      this.pokeCollection.removePokemon(id);
    } else {
      this.pokeCollection.addPokemon(id);
    }
    this.collectedPokemons = this.pokeCollection.collectedPokemons;
  }

  getImageSrc(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}

export default PokeTiles;
</script>

<style lang="scss">
.poke-tiles {
  max-width: 1200px;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;

  &__tile {
    position: relative;
    display: block;
    width: 250px;
    font-size: 1rem;
    border: 1px solid #eee;
    border-radius: 6px;
    margin-bottom: 40px;
    transition: border 0.3s ease-in-out;

    &:hover {
      .poke-tiles__cta {
        opacity: 1;
      }
    }

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
    color: #feca1c;
    padding-bottom: 10px;
    background: transparent;
    width: 100%;
    border: 0;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  &__id {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 2rem;
    font-weight: bold;
    color: #3861a8;
    opacity: 0.3;
  }

  &__check {
    position: absolute;
    right: 5px;
    bottom: 0;
    font-size: 1.2rem;
    color: #3861a8;
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
