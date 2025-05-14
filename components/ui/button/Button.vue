<script lang="ts">
import { cva } from "class-variance-authority";
import { twMerge, type ClassNameValue } from "tailwind-merge";

export const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-full font-medium outline-none transition-colors ease-out disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        xs: "h-8 gap-1 px-2 text-xs",
        sm: "h-9 gap-1 px-3.5 text-sm",
        md: "h-10 gap-1.5 px-[18px] text-sm",
        lg: "h-11 gap-1.5 px-4 text-base",
        xl: "h-12 gap-1.5 px-[18px] text-base",
        "2xl": "h-14 gap-2.5 px-[22px] text-lg",
      },
      variant: {
        primary:
          "bg-blue-700/70 text-white hover:bg-blue-600 disabled:bg-zinc-400",
        secondary: "text-zinc-100  disabled:bg-zinc-400 border border-zinc-100",
        tertiary: "text-blue-500 disabled:bg-zinc-200 border border-blue-300",
        accepted:
          "bg-green-400 text-white hover:bg-green-500 disabled:bg-green-400",
        rejected: "bg-red-500 text-white hover:bg-red-600 disabled:bg-zinc-400",
        continue:
          "bg-yellow-500 text-white hover:bg-yellow-600 disabled:bg-yellow-500",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
</script>

<script setup lang="ts">
const props = defineProps<{
  class?: ClassNameValue;
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
}>();
</script>

<template>
  <button :class="twMerge(buttonVariants({ variant, size }), props.class)">
    <slot />
  </button>
</template>
