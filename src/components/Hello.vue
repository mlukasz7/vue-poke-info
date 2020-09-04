<template>
  <div class="hello">
    <h1 class="hello__title">{{ title }}</h1>
    <p v-if="subtitle" class="hello__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    title: String,
    subtitle: String
  }
};
</script>

<style lang="scss">
.hello {
  margin: 50px auto;
  width: 600px;
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
