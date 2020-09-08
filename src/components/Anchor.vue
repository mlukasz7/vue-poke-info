<template>
  <router-link class="poke-a" :class="classMod" :to="to">
    <slot />
  </router-link>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component()
class Anchor extends Vue {
  @Prop({ type: String }) classMod;
  @Prop({ type: String }) to;
}

export default Anchor;
</script>

<style lang="scss">
.poke-a {
  color: #feca1c;
  text-decoration: none;
  position: relative;
  padding: 0 2px 3px 2px;
  border-bottom: 1px solid #feca1c;
}
</style>
