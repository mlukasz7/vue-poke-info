<template>
  <footer class="poke-footer">
    <div class="container">
      Vue js example app | created by
      <a class="poke-footer__git-link" href="https://github.com/mlukasz7">
        @mlukasz7
      </a>
    </div>
  </footer>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
class Footer extends Vue {}

export default Footer;
</script>

<style lang="scss">
.poke-footer {
  border-top: 1px solid #ccc;
  padding: 0 20px;
  color: #ccc;

  &__git-link {
    color: #aaa;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
