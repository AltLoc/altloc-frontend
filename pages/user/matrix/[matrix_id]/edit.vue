<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useRoute } from "vue-router";
import { EditIdentityMatrixForm } from "@/features/identityMatrix/components/edit-identity-matrix-form/";
import { useQuery } from "@tanstack/vue-query";
import { getIdentityMatrixQuery } from "@/features/identityMatrix/service/index";

const route = useRoute();

const matrixId: string = Array.isArray(route.params.matrix_id)
  ? route.params.matrix_id[0]
  : route.params.matrix_id;

const { data: identityMatrix } = useQuery({
  ...getIdentityMatrixQuery(matrixId),
  enabled: !!matrixId,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto max-w-4xl flex flex-col gap-4">
        <div class="flex">
          <BackButton />
        </div>
        <h2>Edit matrix {{ matrixId }}</h2>
        <EditIdentityMatrixForm
          v-if="identityMatrix"
          :identityMatrix="identityMatrix"
        />
      </div>
    </section>
  </AppLayout>
</template>
