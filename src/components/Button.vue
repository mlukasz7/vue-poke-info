<template>
  <button class="poke-button" :class="classMod" @click="$emit('onClick')">
    <slot />
  </button>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component()
class Button extends Vue {
  @Prop({ type: String }) classMod;
}

export default Button;
</script>

<style lang="scss">
@import "../App.scss";

.poke-button {
  border: 1px solid $c-blue;
  background: $c-blue;
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  padding: 10px 20px;
  outline: none;
  cursor: pointer;
}
</style>
