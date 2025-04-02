<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchIdentityMatrices } from "@/features/identityMatrix/service/index";
import { IdentityMatrixTable } from "@/features/identityMatrix/components/identity-matrix-table/";
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
          <h2 class="text-lg font-semibold">Your Identity Matrices</h2>
          <router-link
            to="/user/matrix/create"
            class="flex items-center gap-3 bg-blue-100 hover:bg-blue-200 rounded-full p-2"
          >
            <PlusIcon
              class="size-7 stroke-[2] text-zinc-400 hover:text-zinc-700"
            />
          </router-link>
        </div>

        <IdentityMatrixTable :identityMatrix="identityMatrices ?? []" />
      </div>
    </section>
  </AppLayout>
</template>
