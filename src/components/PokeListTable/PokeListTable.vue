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
      <tr v-for="(pokemon, index) of pokemons" :key="pokemon.id">
        <td
          v-for="column of columns"
          :key="column.field"
          :class="column.classes"
        >
          <img v-if="column.field === 'sprite'" :src="getImageSrc(index)" alt />
          {{ pokemon[column.field] }}
          <button v-if="column.field === 'cta'">more info</button>
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

@Component()
class PokeListTable extends Vue {
  @Prop({ type: Array, default: [] }) pokemons;

  columns = [
    { field: "sprite", title: "Image" },
    { field: "name", title: "Pokemon name" },
    { field: "cta" }
  ];

  getImageSrc(index) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
      1}.png`;
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

  button {
    color: #feca1c;
    border: 0;
    border-bottom: 1px solid #feca1c;
    cursor: pointer;
  }
}
</style>
