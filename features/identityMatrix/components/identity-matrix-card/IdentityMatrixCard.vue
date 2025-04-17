<script lang="ts" setup>
import { defineProps } from "vue";
import type { IdentityMatrix } from "@/features/identityMatrix/model";

defineProps<{
  identityMatrix: IdentityMatrix;
}>();
</script>

<template>
  <div
    class="mb-12 flex flex-col gap-8 border-b border-zinc-200 pb-12 md:flex-row md:gap-10"
  >
    <div class="flex-1 w-full">
      <img
        :src="
          identityMatrix?.bannerKey
            ? getCDNImageURL(identityMatrix.bannerKey)
            : '/images/placeholder_image.webp'
        "
        alt="Conference image"
        class="aspect-video w-full rounded-xl"
      />
    </div>
    <div class="flex flex-1 flex-col gap-4">
      <h1
        class="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl md:leading-tight"
      >
        {{ identityMatrix.name }}
      </h1>
      <span class="relative flex flex-wrap gap-0.5 overflow-hidden">
        {{ identityMatrix.description }}
      </span>
    </div>
  </div>
</template>
