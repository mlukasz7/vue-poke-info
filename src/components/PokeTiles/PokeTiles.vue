<template>
  <section class="poke-tiles">
    <button class="poke-tiles__tile" v-for="(pokemon, index) of pokemons" :key="pokemon.name">
      <img :src="getImageSrc(index)" alt />
      <h2 class="poke-tiles__name">{{ pokemon.name }}</h2>
      <span class="poke-tiles__id">{{ index }}</span>
    </button>
  </section>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component()
class PokeTiles extends Vue {
  @Prop({ type: Array, default: [] }) pokemons;

  getImageSrc(index) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index +
      1}.png`;
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
      }
    }

    img {
      display: block;
      width: 80%;
      margin: 0 auto 10px;
    }
  }

  &__id {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 2rem;
    font-weight: bold;
    color: #3861a8;
    transition: color 0.3s ease-in-out;
  }

  &__name {
    margin-top: 0;
    text-align: center;
  }
}
</style>
