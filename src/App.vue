<template>
  <div id="app">
    <Hello
      title="Vue Poke Info"
      subtitle="Get pokemon data. Data based at Pokémon API. Pokémon and Pokémon character names are trademarks of Nintendo."
    />
  </div>
</template>

<script>
import Hello from "./components/Hello.vue";

export default {
  name: "App",
  components: {
    Hello
  }
};
</script>

<style>
@font-face {
  font-family: "Roboto";
  src: url("./fonts/Roboto-Light.ttf");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Roboto";
  src: url("./fonts/Roboto-Bold.ttf");
  font-weight: bold;
  font-style: bold;
}

* {
  font-family: "Roboto";
}
</style>
