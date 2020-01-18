<template>
  <div class="position-relative">
    <i class="fa fa-eye password-toggle" @click="Toggle" :style="style"></i>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VNode } from "Vue";

@Component
export default class PasswordToggle extends Vue {
  Node: any;
  Color: string = "#fff";
  Top: number = 0;

  get style() {
    //const eye = this.$el.childNodes[0] as HTMLElement;
    // const node = this.Node as HTMLElement;
    // this.Top = eye.offsetHeight / 2;
    return {
      color: this.Color,
      top: this.Top + "px"
    };
  }

  Toggle() {
    if (!this.Node) return;

    const eye = this.$el.childNodes[0] as HTMLElement;

    if (this.Node.type === "password") {
      this.Node.type = "text";
      this.Node.elm.type = "text";
      eye.classList.add("fa-eye-slash");
    } else {
      this.Node.type = "password";
      this.Node.elm.type = "password";
      eye.classList.remove("fa-eye-slash");
    }
  }
  /*
bottom: 306
height: 50
left: 349.5
right: 826
top: 256
width: 476.5
x: 349.5
y: 256

top - bottom + (height / 2 - eyeHeight / 2)
*/
  mounted() {
    // setTimeout(() => {
    //   const { top, bottom, height } = this.Node.elm.getBoundingClientRect();
    //   const eye = this.$el.childNodes[0] as HTMLElement;
    //   const node = this.Node as HTMLElement;
    //   console.log((top - bottom) + (height / 2 - eye.offsetHeight / 2))
    //   this.Top = (top - bottom) + (height / 2 - eye.offsetHeight / 2);
    // }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.password-toggle {
  position: absolute;
  top: -21px;
  right: 8px;
  cursor: pointer;
}
</style>
