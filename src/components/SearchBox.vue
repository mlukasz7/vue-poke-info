<template>
  <div class="search-box">
    <Input v-model="query" />
    <Button @onClick="clearInput">
      <font-awesome-icon icon="times" />
    </Button>
  </div>
</template>

<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import { debounce } from "lodash";

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

  created() {
    this.onSearch = debounce(function(value) {
      this.$emit("onSearch", value);
    }, 300);
  }

  clearInput() {
    this.query = "";
    this.onSearch("");
  }

  @Watch("query")
  onQueryChange() {
    this.onSearch(this.query);
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
