<script setup lang="ts">
import {
  DropdownMenuCheckboxItem,
  type DropdownMenuCheckboxItemEmits,
  type DropdownMenuCheckboxItemProps,
  DropdownMenuItemIndicator,
  useEmitAsProps,
} from "radix-vue";
import CheckCircleIcon from "@/assets/icons/check.svg?component";
import { computed } from "vue";
import { twMerge, type ClassNameValue } from "tailwind-merge";

const props = defineProps<
  DropdownMenuCheckboxItemProps & { class?: ClassNameValue }
>();
const emit = defineEmits<DropdownMenuCheckboxItemEmits>();
const emitsAsProps = useEmitAsProps(emit);

const classes = computed(() => {
  return twMerge(
    "relative flex h-8 w-full cursor-default select-none items-center gap-3 gap-x-2 rounded font-medium bg-transparent py-1.5 pl-7 pr-3 text-sm outline-none data-[highlighted]:bg-zinc-100 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    props.class
  );
});
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="{ ...props, ...emitsAsProps, class: classes }"
  >
    <DropdownMenuItemIndicator
      class="absolute left-1.5 flex items-center justify-center"
    >
      <CheckCircleIcon class="size-3.5 stroke-[1.5] text-zinc-400" />
    </DropdownMenuItemIndicator>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
