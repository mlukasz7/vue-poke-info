<template>
  <div>
    <Alert classMod="danger" v-if="appError">Error</Alert>
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
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import { PokeApi } from "../../utilities/PokeApi";

import Anchor from "../../components/Anchor";
import Alert from "../../components/Alert";
import DynamicTable from "../../components/DynamicTable";
import Hello from "../../components/Hello";

@Component({
  components: {
    Anchor,
    Alert,
    DynamicTable,
    Hello
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

  get appError() {
    console.log(this.$store.getters.appError);
    return this.$store.getters.appError;
  }

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
    try {
      const res = await this.api.getPokemon(this.pokemonId);
      const abilities = res.abilities.map(ability => ability.ability.name);
      const forms = res.forms.map(form => form.name);

      this.pokemonData = res;
      this.pokemonData.abilities = abilities.join(", ");
      this.pokemonData.forms = forms.join(", ");
      this.dataLoaded = true;
    } catch (e) {
      this.$store.dispatch("setAppError", true);
    }
  }
}

export default PokeDetails;
</script>

<style lang="scss">
@import "../../App.scss";

.poke-data {
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;

  &__header {
    display: flex;
    flex-direction: column-reverse;

    @media (min-width: $md-viewport) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__name {
    font-size: 4rem;
    font-weight: normal;
    color: $c-blue;

    span {
      color: $c-yellow;
    }
  }

  &__table-h {
    font-weight: normal;
    color: $c-blue;
    margin-bottom: 0.5rem;
  }

  &__table {
    margin-bottom: 2rem;
  }
}
</style>
