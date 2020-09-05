<template>
  <form class="search-box" @submit.prevent="submit">
    <Input v-model="query" />
    <Button text="Search" />
  </form>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import Button from "./Button";
import Input from "./Form/Input";

@Component({
  components: {
    Button,
    Input
  }
})
class SearchBox extends Vue {
  query = "";

  submit() {
    this.$emit("onSearch", this.query);
  }
}

export default SearchBox;
</script>

<style lang="scss">
.search-box {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  button {
    border-radius: 0 4px 4px 0;
  }

  input {
    border-radius: 4px 0 0 4px;
  }
}
</style>
