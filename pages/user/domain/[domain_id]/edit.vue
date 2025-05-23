<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getDomainQuery } from "@/features/domain/service/index";
import { EditDomainForm } from "@/features/domain/components/edit-domain-form";

const route = useRoute();

const domainId: string = Array.isArray(route.params.domain_id)
  ? route.params.domain_id[0]
  : route.params.domain_id;

const {
  data: domain,
  isLoading,
  isError,
  error,
} = useQuery({
  ...getDomainQuery(domainId),
  enabled: !!domainId,
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
          <h2 class="text-2xl font-bold text-zinc-800">
            {{ $t("app.identityMatrix.edit") }}
          </h2>
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
          <EditDomainForm v-if="domain" :domain="domain" />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
