<template>
  <div class="progress">
    <div
      class="progress-bar"
      :class="{
        'progress-five': percentage < 25,
        'progress-twenty-five': percentage >= 25 && percentage < 50,
        'progress-fifty': percentage >= 50 && percentage < 75,
        'progress-seventy-five': percentage >= 75 && percentage < 100,
        'progress-hundred': percentage >= 100
      }"
      :style="{ width: percentage + '%' }"
    ></div>
    <span class="progress-bar-percent">
      {{ name.length > 0 ? "(" + name + ")" : "" }}
      {{ parseInt(percentage) }} %</span
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class ProgressBar extends Vue {
  @Prop({ type: Number, default: 0 }) percentage!: number;
  @Prop({ type: String, default: "" }) name!: string;
}
</script>

<style lang="scss" scoped>
.progress {
  width: 100%;
  height: 30px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
  position: relative;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  background-image: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  transition: 25ms linear;
  transition-property: background-color;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
    inset 0 1px rgba(255, 255, 255, 0.1);
}

.progress-bar-percent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
}

.progress-five {
  background-color: #f63a0f;
}

.progress-twenty-five {
  background-color: #f27011;
}

.progress-fifty {
  background-color: #f2b01e;
}

.progress-seventy-five {
  background-color: #f2d31b;
}

.progress-hundred {
  background-color: #86e01e;
}
</style>
