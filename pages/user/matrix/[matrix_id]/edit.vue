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

// const { data: identityMatrix } = useQuery({
//   ...getIdentityMatrixQuery(matrixId),
//   enabled: !!matrixId,
// });

const {
  data: identityMatrix,
  isLoading,
  isError,
  error,
} = useQuery({
  ...getIdentityMatrixQuery(matrixId),
  enabled: !!matrixId,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="mx-auto max-w-3xl flex flex-col gap-6">
        <div class="flex items-center">
          <BackButton />
        </div>

        <div class="flex items-center gap-2">
          <PencilIcon class="w-6 h-6 text-blue-600" />
          <h2 class="text-2xl font-bold text-zinc-800">Edit Identity Matrix</h2>
        </div>

        <div v-if="isLoading" class="flex items-center gap-2 text-zinc-500">
          <LoaderIcon class="animate-spin w-5 h-5" />
          <span>Loading matrix data...</span>
        </div>

        <div v-else-if="isError" class="text-red-500">
          Failed to load identity matrix: {{ error?.message }}
        </div>

        <div
          v-else
          class="bg-white border border-zinc-100 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl"
        >
          <EditIdentityMatrixForm
            v-if="identityMatrix"
            :identityMatrix="identityMatrix"
          />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
