<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useRoute } from "vue-router";
// import { EditIdentityMatrixForm } from "@/features/identityMatrix/components/edit-identity-matrix-form/";
import { useQuery } from "@tanstack/vue-query";
import { getDomainQuery } from "@/features/domain/service/index";
import { HabitTable } from "@/features/habit/components/habit-table";
import { CreateHabitForm } from "@/features/habit/components/create-habit-form/";

const route = useRoute();

const domainId: string = Array.isArray(route.params.domain_id)
  ? route.params.domain_id[0]
  : route.params.domain_id;

const { data: domain } = useQuery({
  ...getDomainQuery(domainId),
  enabled: !!domainId,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex">
          <BackButton />
        </div>
        <div class="flex gap-3 items-center bg-blue-100 rounded-md p-3 w-fit">
          <h2 class="text-lg text-zinc-500">Domain:</h2>
          <span class="font-semibold">
            {{ domain?.name }}
          </span>
        </div>

        <span class="text-sm text-zinc-500">All habit for this domain</span>
        <HabitTable v-if="domain" :domain="domain" />
        <CreateHabitForm v-if="domain" :domain="domain" />
      </div>
    </section>
  </AppLayout>
</template>
