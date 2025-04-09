<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  max: { type: Number, required: true },
  value: { type: Number, required: true },
  size: { type: Number, default: 104 },
  colorFilled: { type: String, default: "#121063" },
  colorUnfilled: { type: String, default: "#3BB44A" },
  percentage: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  animationDuration: { type: String, default: "0.5s" },
  strokeWidth: { type: String, default: "5px" },
  reversedFilling: { type: Boolean, default: false },
});

const strokeWidthNumber = computed(
  () => parseFloat(props.strokeWidth.replace("px", "")) || 5
);

const radius = computed(() => props.size / 2 - strokeWidthNumber.value / 2);

const currentFormatted = computed(() => Math.min(props.value, props.max));

const isLimitReached = computed(() => props.value >= props.max);

const dashArray = computed(() => 2 * Math.PI * radius.value);

const dashOffset = computed(() => {
  if (props.max === 0) return dashArray.value;
  const progress = props.reversedFilling
    ? (props.max - currentFormatted.value) / props.max
    : currentFormatted.value / props.max;
  return dashArray.value * (1 - progress);
});

const getPercentage = computed(() =>
  props.max === 0 ? "0%" : Math.floor((props.value / props.max) * 100) + "%"
);

const filledColorClass = computed(() => {
  const percent = (props.value / props.max) * 100;
  if (percent >= 90) return `stroke-[#FF0000]`; // red
  if (percent >= 60) return `stroke-[#FFA500]`; // orange
  return `stroke-[#3BB44A]`; // green
});
const unfilledColorClass = computed(() => `stroke-[${props.colorUnfilled}]`);
</script>

<template>
  <div
    class="relative flex items-center justify-center"
    :style="{
      width: `${props.size}px`,
      height: `${props.size}px`,
    }"
  >
    <svg
      class="transform -rotate-90"
      :viewBox="`0 0 ${props.size} ${props.size}`"
      :width="props.size"
      :height="props.size"
    >
      <!-- Back circle -->
      <circle
        :r="radius"
        :cx="props.size / 2"
        :cy="props.size / 2"
        fill="transparent"
        class="stroke-zinc-200"
        :stroke-width="strokeWidthNumber"
      />

      <!-- First circle -->
      <circle
        :r="radius"
        :cx="props.size / 2"
        :cy="props.size / 2"
        fill="transparent"
        :class="isLimitReached ? filledColorClass : unfilledColorClass"
        :stroke-width="strokeWidthNumber"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
        :style="{
          strokeLinecap: rounded ? 'round' : 'butt',
          transition: `stroke-dashoffset ${animationDuration} ease-in-out`,
        }"
      />
    </svg>

    <!-- percentage -->
    <div class="absolute inset-0 flex items-center justify-center flex-col">
      <span v-if="percentage" class="text-[10px] font-medium">
        {{ getPercentage }}
      </span>
    </div>
  </div>
</template>
