<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchIdentityMatrices } from "@/features/identityMatrix/service/index";
// import { IdentityMatrixTable } from "@/features/identityMatrix/components/identity-matrix-table/";
import { IdentityMatrixGrid } from "@/features/identityMatrix/components/identity-matrix-grid/";
import PlusIcon from "@/assets/icons/plus.svg?component";

const { data: identityMatrices } = useQuery({
  ...fetchIdentityMatrices,
  enabled: true,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold flex items-center gap-2">
            Managment of Identity Matrices and Domains
            <span class="text-sm text-zinc-500">
              ({{ identityMatrices?.length ?? 0 }})
            </span>
          </h2>
          <router-link
            to="/user/matrix/create"
            class="flex items-center gap-3 bg-blue-100 hover:bg-blue-200 rounded-full p-2"
          >
            <PlusIcon
              class="size-7 stroke-[2] text-zinc-400 hover:text-zinc-700"
            />
          </router-link>
        </div>

        <!-- <IdentityMatrixTable :identityMatrix="identityMatrices ?? []" /> -->

        <IdentityMatrixGrid
          v-if="identityMatrices?.length"
          :identityMatrix="identityMatrices ?? []"
        />
      </div>
    </section>
  </AppLayout>
</template>
