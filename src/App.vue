<template>
  <div class="main">
    <div class="loading_settings">
      Loading Settings
      <b-spinner variant="danger"></b-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FileSystem from "@/services/fileService/file.service";

@Component({
  components: {}
})
export default class App extends Vue {
  created() {}
}
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "@/assets/styles/main.scss";
@import "@/assets/styles/variables.scss";

.main {
  height: 100%;
  width: 100%;
}

.loading_settings {
  @include center;
  font-size: 2em;
}
</style>
