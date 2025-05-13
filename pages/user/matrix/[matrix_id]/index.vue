<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getIdentityMatrixQuery } from "@/features/identityMatrix/service/index";
import { CreateDomainForm } from "@/features/domain/components/create-domain-form";
import DomainTable from "@/features/domain/components/domain-table/DomainTable.vue";
import { fetchDomainsByIdentityMatrix } from "@/features/domain/service";
import { IdentityMatrixCard } from "@/features/identityMatrix/components/identity-matrix-card/";

const route = useRoute();

const matrixId: string = Array.isArray(route.params.matrix_id)
  ? route.params.matrix_id[0]
  : route.params.matrix_id;

const {
  data: identityMatrix,
  isLoading,
  isError,
  error,
} = useQuery({
  ...getIdentityMatrixQuery(matrixId),
  enabled: !!matrixId,
});

const { data: domain } = useQuery({
  ...fetchDomainsByIdentityMatrix(matrixId),
  enabled: true,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="mx-auto max-w-5xl flex flex-col gap-6">
        <!-- Назад и заголовок -->
        <div class="flex items-center justify-between">
          <BackButton />
          <div
            class="flex gap-2 items-center bg-blue-200 rounded-md px-4 py-2 shadow-sm"
          >
            <h2 class="text-lg text-zinc-700 font-medium">Matrix:</h2>
            <span class="font-semibold text-zinc-800">
              {{ identityMatrix?.name || "..." }}
            </span>
          </div>
        </div>

        <!-- Карточка с матрицей -->
        <div
          v-if="identityMatrix"
          class="bg-white shadow-md rounded-xl p-3 flex flex-col gap-4"
        >
          <IdentityMatrixCard
            v-if="identityMatrix"
            :identityMatrix="identityMatrix"
          />
        </div>

        <!-- Карточка с таблицей -->
        <div class="bg-white shadow-md rounded-xl p-3 flex flex-col gap-4">
          <h3 class="text-base font-semibold text-zinc-700">
            {{ $t("app.domain.label") }}
          </h3>
          <div v-if="isLoading" class="text-gray-500 text-sm">Loading...</div>
          <div v-else-if="isError" class="text-red-500 text-sm">
            Error: {{ error?.message || "Failed to load data" }}
          </div>
          <div v-else-if="domain">
            <DomainTable :domains="domain ?? []" />
          </div>
          <div v-else class="text-gray-500 text-sm italic">
            No domains found.
          </div>
        </div>

        <!-- Карточка с формой -->
        <div class="bg-white shadow-md rounded-xl p-3 flex flex-col gap-4">
          <h3 class="text-base font-semibold text-zinc-700">
            {{ $t("app.domain.create") }}
          </h3>
          <CreateDomainForm :identityMatrixId="matrixId" />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
