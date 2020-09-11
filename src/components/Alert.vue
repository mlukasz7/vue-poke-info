<template>
  <p class="poke-alert" :class="classMod">
    <slot />
  </p>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
class Alert extends Vue {
  @Prop({ type: String }) classMod;
}

export default Alert;
</script>

<style lang="scss">
@import "../App.scss";

.poke-alert {
  padding: 10px 20px;
  background: rgba($c-blue, 0.4);
  border: 1px solid $c-blue;
  border-radius: 4px;
  max-width: $xl-viewport;
  margin: 20px auto;
  color: white;

  &.danger {
    background: rgba(red, 0.4);
    border: 1px solid red;
  }
}
</style>
