<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchIdentityMatrices } from "@/features/identityMatrix/service/index";

import { IdentityMatrixTable } from "@/features/identityMatrix/components/identity-matrix-table/";

const { data: identityMatrices } = useQuery({
  ...fetchIdentityMatrices,
  enabled: true,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto max-w-4xl flex flex-col gap-4">
        <h2 class="text-lg font-semibold">Your Identity Matrices</h2>

        <IdentityMatrixTable :identityMatrix="identityMatrices ?? []" />
      </div>
    </section>
  </AppLayout>
</template>
