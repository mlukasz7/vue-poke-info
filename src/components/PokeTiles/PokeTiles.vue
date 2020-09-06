<template>
  <section class="poke-tiles">
    <p v-if="!pokemons.length">No data</p>
    <button
      class="poke-tiles__tile"
      v-for="pokemon of pokemons"
      :key="pokemon.name"
    >
      <img :src="getImageSrc(pokemon.id)" alt />
      <h2 class="poke-tiles__name">{{ pokemon.name }}</h2>
      <span class="poke-tiles__id">{{ pokemon.id }}</span>
      <button
        class="poke-tiles__check"
        :class="{ active: collectedPokemons.includes(pokemon.id) }"
        @click="toggleCollectPokemon(pokemon.id)"
      >
        <font-awesome-icon icon="check-square" />
      </button>
    </button>
  </section>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

import { PokeColletion } from "../../utilities/PokeCollection";

@Component()
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
    cursor: pointer;

    &:hover {
      border-color: #feca1c;

      .poke-tiles__id {
        color: #feca1c;
        opacity: 1;
      }
    }

    img {
      display: block;
      width: 80%;
      margin: 0 auto 10px;
      width: 180px;
      height: 180px;
    }
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
    right: 0;
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

    &.active {
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
