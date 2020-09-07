<template>
  <div class="switch-button">
    <button
      class="switch-button__half"
      :class="{ active: getActiveBtn() === pokeListViews.List }"
      @click="setActiveBtn(pokeListViews.List)"
    >
      <font-awesome-icon icon="square" />
    </button>
    <button
      class="switch-button__half"
      :class="{ active: getActiveBtn() === pokeListViews.Table }"
      @click="setActiveBtn(pokeListViews.Table)"
    >
      <font-awesome-icon icon="align-justify" />
    </button>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import { POKE_LIST_VIEWS } from "../consts/PokeListView";

@Component
class Switch extends Vue {
  activeBtn = POKE_LIST_VIEWS.List;

  pokeListViews = POKE_LIST_VIEWS;

  created() {
    const pokeListViews = localStorage.getItem("pokeListView");

    if (pokeListViews) {
      this.activeBtn = pokeListViews;
      this.$emit("onChange", pokeListViews);
    }
  }

  getActiveBtn() {
    return this.activeBtn;
  }

  setActiveBtn(index) {
    this.activeBtn = index;
    this.$emit("onChange", index);
    localStorage.setItem("pokeListView", index);
  }
}

export default Switch;
</script>

<style lang="scss">
.switch-button {
  margin-bottom: 0.5rem;
  border: 0;
  padding: 0;

  &__half {
    border: 1px solid #3861a8;
    padding: 4px 14px;
    font-size: 0.8rem;
    outline: none;
    cursor: pointer;

    &.active {
      background: #3861a8;
      color: white;
    }

    &:hover {
      box-shadow: 1px 2px 4px 0px #3861a8;
    }

    &:nth-of-type(1) {
      border-radius: 4px 0 0 4px;
    }

    &:nth-of-type(2) {
      border-radius: 0 4px 4px 0;
      border-left: 0;
    }
  }
}
</style>
