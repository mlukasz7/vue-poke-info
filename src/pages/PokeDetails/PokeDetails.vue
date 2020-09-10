<template>
  <section class="poke-data" v-show="dataLoaded">
    <Anchor to="/" class="poke-data__back">
      <font-awesome-icon icon="arrow-left" />
      Back
    </Anchor>
    <header class="poke-data__header">
      <img :src="imageSrc" alt />
      <h1 class="poke-data__name">
        <span>{{ pokemonId }}</span>
        | {{ pokemonData.name }}
      </h1>
    </header>
    <section>
      <h2 class="poke-data__table-h">Poke data:</h2>
      <DynamicTable
        class="poke-data__table"
        :columns="columns"
        :rows="[pokemonData]"
      />
    </section>
  </section>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import { PokeApi } from "../../utilities/PokeApi";

import Anchor from "../../components/Anchor";
import DynamicTable from "../../components/DynamicTable";

@Component({
  components: {
    Anchor,
    DynamicTable
  }
})
class PokeDetails extends Vue {
  columns = [
    { field: "base_experience", title: "Base exp" },
    { field: "height", title: "Height" },
    { field: "weight", title: "Weight" },
    { field: "abilities", title: "Abilities" },
    { field: "forms", title: "Forms" }
  ];

  dataLoaded = false;

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
    const abilities = res.abilities.map(ability => ability.ability.name);
    const forms = res.forms.map(form => form.name);

    this.pokemonData = res;
    this.pokemonData.abilities = abilities.join(", ");
    this.pokemonData.forms = forms.join(", ");
    this.dataLoaded = true;
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

  &__table-h {
    font-weight: normal;
    color: #3861a8;
    margin-bottom: 0.5rem;
  }

  &__table {
    margin-bottom: 2rem;
  }
}
</style>
