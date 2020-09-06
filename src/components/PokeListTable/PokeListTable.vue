<template>
  <table>
    <thead>
      <tr>
        <th v-for="column of columns" :key="column.field">
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="pokemon of pokemons" :key="pokemon.id">
        <td
          v-for="column of columns"
          :key="column.field"
          :class="column.classes"
        >
          <span v-if="column.field === 'id'">{{ pokemon.id }}</span>
          <img
            v-if="column.field === 'sprite'"
            :src="getImageSrc(pokemon.id)"
            alt
          />
          <p v-if="column.field === 'name'">{{ pokemon[column.field] }}</p>
          <button
            v-if="column.field === 'collected'"
            class="button-collected"
            :class="{ active: collectedPokemons.includes(pokemon.id) }"
            @click="toggleCollectPokemon(pokemon.id)"
          >
            <font-awesome-icon icon="check-square" />
          </button>
          <button v-if="column.field === 'cta'" class="button-cta">
            more info
          </button>
        </td>
      </tr>
      <tr v-if="!pokemons.length">
        <td :colspan="columns.length">No data</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

import { PokeColletion } from "../../utilities/PokeCollection";

@Component()
class PokeListTable extends Vue {
  @Prop({ type: Array, default: [] }) pokemons;

  collectedPokemons = [];

  columns = [
    { field: "id", title: "ID" },
    { field: "sprite", title: "Image" },
    { field: "name", title: "Name" },
    { field: "collected", title: "Collected" },
    { field: "cta" }
  ];

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
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}

export default PokeListTable;
</script>

<style lang="scss" scoped>
table {
  width: 500px;
  margin: 50px auto;
  border-collapse: collapse;

  th {
    padding: 10px 0;
  }

  td {
    padding: 5px 10px;
    border-bottom: 1px solid #3861a8;
    text-align: center;
  }

  span {
    font-weight: bold;
    color: #3861a8;
  }

  .button-cta {
    color: #feca1c;
    border: 1px solid transparent;
    border-bottom-color: #feca1c;
    cursor: pointer;

    &:hover {
      border-color: #feca1c;
    }
  }

  .button-collected {
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
}
</style>
