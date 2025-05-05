<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchIdentityMatrices } from "@/features/identityMatrix/service/index";
import { IdentityMatrixGrid } from "@/features/identityMatrix/components/identity-matrix-grid/";
import PlusIcon from "@/assets/icons/plus.svg?component";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const {
  data: identityMatrices,
  isLoading,
  isError,
  error,
} = useQuery({
  ...fetchIdentityMatrices,
  enabled: true,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-1.5">
            <h2 class="text-sm md:text-xl font-bold text-zinc-800">
              {{ t("app.identityMatrix.label") }}
            </h2>
            <span class="text-sm font-normal text-zinc-500">
              ({{ identityMatrices?.length ?? 0 }})
            </span>
          </div>
          <router-link
            to="/user/matrix/create"
            class="inline-flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition"
          >
            <PlusIcon class="w-5 h-5 stroke-[2]" />
            <span class="text-sm hidden md:block">
              {{ t("app.identityMatrix.create") }}
            </span>
          </router-link>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="flex items-center gap-2 text-zinc-500">
          <LoaderIcon class="w-5 h-5 animate-spin" />
          <span>Loading identity matrices...</span>
        </div>

        <!-- Error -->
        <div v-else-if="isError" class="text-red-500">
          Failed to load identity matrices: {{ error?.message }}
        </div>

        <!-- No Data -->
        <div
          v-else-if="identityMatrices?.length === 0"
          class="text-zinc-400 italic"
        >
          No identity matrices found. Create one to get started.
        </div>

        <!-- Grid -->
        <IdentityMatrixGrid
          v-if="identityMatrices?.length"
          :identityMatrix="identityMatrices ?? []"
        />
      </div>
    </section>
  </AppLayout>
</template>
