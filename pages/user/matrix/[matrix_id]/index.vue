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
      <div class="container mx-auto flex flex-col gap-10">
        <div class="flex">
          <BackButton />
        </div>

        <div class="flex-col items-center gap-3">
          <div v-if="isLoading" class="text-gray-500">Loading...</div>

          <div v-else-if="isError" class="text-red-500">
            Error: {{ error?.message || "Failed to load data" }}
          </div>

          <IdentityMatrixCard
            v-if="identityMatrix"
            :identityMatrix="identityMatrix"
          />

          <div v-else class="text-gray-500">No data found</div>
        </div>

        <span class="text-sm text-zinc-500/70">
          Lists of domains for IdentityMatrix
        </span>
        <DomainTable v-if="domain" :domains="domain ?? []" />

        <span class="text-sm text-zinc-500/70">
          Create new domain for IdentityMatrix
        </span>
        <CreateDomainForm :identityMatrixId="matrixId" />
      </div>
    </section>
  </AppLayout>
</template>
