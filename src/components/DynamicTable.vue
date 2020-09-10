<template>
  <table :class="classMod">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.field">
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td
          v-for="column in columns"
          :key="column.field"
          :class="column.classes"
        >
          <slot :name="column.field">
            {{ row[column.field] }}
          </slot>
        </td>
      </tr>
      <tr v-if="!rows.length">
        <td :colspan="columns.length">No data</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component()
class DynamicTable extends Vue {
  @Prop({ type: String, default: "" }) classMod;
  @Prop({ type: Array, required: true }) columns;
  @Prop({ type: Array, required: true }) rows;
}

export default DynamicTable;
</script>

<style lang="scss" scoped>
table {
  width: 100%;
}

th {
  text-align: left;
}

th,
td {
  border: 1px solid #ccc;
}
</style>
