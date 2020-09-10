<template>
  <div class="hello">
    <h1 class="hello__title">{{ title }}</h1>
    <p v-if="subtitle" class="hello__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
class Hello extends Vue {
  @Prop({ title: String, required: true }) title;
  @Prop({ title: String }) subtitle;
}

export default Hello;
</script>

<style lang="scss">
.hello {
  margin: 50px auto;
  max-width: 600px;
  text-align: center;

  &__title {
    font-weight: bold;
    margin: 0 0 0.5rem;
  }

  &__subtitle {
    margin: 0;
  }
}
</style>
