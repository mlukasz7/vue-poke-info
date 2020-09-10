<template>
  <div class="poke404">
    <h1 class="poke404__h"><span>404</span> page not found</h1>
    <img
      class="poke404__img"
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png"
      alt=""
    />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
class Poke404 extends Vue {}

export default Poke404;
</script>

<style lang="scss" scoped>
.poke404 {
  margin: 60px 0 20px;
  text-align: center;

  &__h {
    color: #3861a8;
    font-size: 3rem;
    font-weight: normal;

    span {
      color: #feca1c;
      font-size: 4rem;
      font-weight: bold;
    }
  }

  &__img {
    max-width: 300px;
  }
}
</style>
