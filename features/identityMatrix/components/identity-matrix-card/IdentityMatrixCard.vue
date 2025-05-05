<script lang="ts" setup>
import { defineProps } from "vue";
import type { IdentityMatrix } from "@/features/identityMatrix/model";
import EditIcon from "@/assets/icons/edit.svg?component";

defineProps<{
  identityMatrix: IdentityMatrix;
}>();
</script>

<template>
  <div class="relative flex flex-col gap-6 md:flex-row md:gap-10">
    <div class="flex-1 w-full">
      <img
        :src="
          identityMatrix?.bannerKey
            ? getCDNImageURL(identityMatrix.bannerKey)
            : '/images/placeholder_image.webp'
        "
        alt="Matrix banner"
        class="aspect-video w-full rounded-xl object-cover"
      />
    </div>

    <div class="flex flex-1 flex-col justify-center gap-3">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg md:text-3xl font-bold text-zinc-900 leading-snug">
          {{ identityMatrix.name }}
        </h3>

        <span
          v-if="identityMatrix.description"
          class="text-zinc-600 text-base leading-relaxed italic"
        >
          {{ identityMatrix.description }}
        </span>
        <span v-else class="italic text-zinc-400 text-sm">
          No description provided for this matrix.
        </span>
      </div>
      <hr />
      <div class="pt-6 flex items-center justify-end">
        <router-link
          :to="`/user/matrix/${identityMatrix.id}/edit`"
          title="Edit Matrix"
          class="flex items-center hover:text-blue-600 transition"
        >
          <EditIcon class="mr-2 size-4 stroke-[1.5] text-zinc-500" />
          <span class="text-zinc-700 text-sm">Edit matrix</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
