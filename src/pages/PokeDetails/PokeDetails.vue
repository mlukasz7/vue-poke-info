<template>
  <section class="poke-data">
    <header class="poke-data__header">
      <img :src="imageSrc" alt />
      <h1 class="poke-data__name">
        <span>
          {{ pokemonId }}
        </span>
        | {{ pokemonData.name }}
      </h1>
    </header>
    <footer>
      <router-link to="/">Back</router-link>
    </footer>
  </section>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import { PokeApi } from "../../utilities/PokeApi";

@Component()
class PokeDetails extends Vue {
  pokemonData = {};

  get pokemonId() {
    return this.$route.params.id;
  }

  get imageSrc() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonId}.png`;
  }

  created() {
    this.api = new PokeApi();
  }

  async mounted() {
    const res = await this.api.getPokemon(this.pokemonId);
    console.log(res);
    this.pokemonData = res;
  }
}

export default PokeDetails;
</script>

<style lang="scss">
.poke-data {
  max-width: 1200px;
  margin: 50px auto;

  &__header {
    display: flex;
    align-items: center;
  }

  &__name {
    font-size: 4rem;
    font-weight: normal;
    color: #3861a8;

    span {
      color: #feca1c;
    }
  }
}
</style>
