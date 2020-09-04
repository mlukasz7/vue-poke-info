<template>
  <input
    class="poke-input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component()
class Input extends Vue {
  @Prop({ type: String, default: "Search..." }) placeholder;
  @Prop({ type: String, default: "type" }) type;
  @Prop({ type: String, required: true }) value;
}

export default Input;
</script>

<style lang="scss">
.poke-input {
  padding: 10px;
  letter-spacing: 2px;
  border-radius: 4px;
  border: 1px solid #3861a8;
  width: 100%;
}
</style>
