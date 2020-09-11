<template>
  <div class="search-box">
    <div class="search-box__top">
      <Input v-model="query" />
      <Button v-if="query.length" @onClick="clearInput">
        <font-awesome-icon icon="times" />
      </Button>
    </div>
    <div class="search-box__bottom">
      <label class="search-box__collected-label">
        <input type="checkbox" v-model="collected" />
        <span class="search-box__collected-check">
          <font-awesome-icon icon="check-square" />
        </span>
        Collected
      </label>
    </div>
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
  collected = false;

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

  @Watch("collected")
  onColleckedChange() {
    this.$emit("onCollected", this.collected);
  }

  @Watch("query")
  onQueryChange() {
    this.onSearch(this.query);
  }
}

export default SearchBox;
</script>

<style lang="scss">
@import "../App.scss";

.search-box {
  max-width: 600px;
  margin: 0 auto;

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__collected-label {
    display: block;
    position: relative;
    margin-top: 10px;
    padding-left: 20px;
    cursor: pointer;

    input[type="checkbox"] {
      display: none;

      &:checked + .search-box__collected-check {
        opacity: 1;
        color: greenyellow;
      }
    }
  }

  &__collected-check {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.1;
    color: $c-blue;
  }

  button {
    border-radius: 0 4px 4px 0;
  }

  input {
    border-radius: 4px 0 0 4px;
    max-width: 547px;
    outline: none;
    font-size: 1rem;
  }
}
</style>
