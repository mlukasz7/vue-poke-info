<template>
  <button class="poke-button">{{ text }}</button>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component()
class Button extends Vue {
  @Prop({ type: String, required: true }) text;
}

export default Button;
</script>

<style lang="scss">
.poke-button {
  border: 1px solid #3861a8;
  background: #3861a8;
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
