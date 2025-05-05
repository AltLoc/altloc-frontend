<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useRoute } from "vue-router";
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
      <div class="mx-auto max-w-5xl flex flex-col gap-6">
        <!-- Назад и название -->
        <div class="flex items-center justify-between">
          <BackButton />
          <div
            class="flex gap-2 items-center bg-blue-100 rounded-md px-4 py-2 shadow-sm"
          >
            <h2 class="text-lg text-zinc-600 font-medium">Domain:</h2>
            <span class="font-semibold text-blue-800">{{ domain?.name }}</span>
          </div>
        </div>

        <!-- Карточка с таблицей -->
        <div class="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4">
          <h3 class="text-base font-semibold text-zinc-700">
            Habits in this domain
          </h3>
          <div class="overflow-x-auto">
            <HabitTable v-if="domain" :domain="domain" />
          </div>
        </div>

        <!-- Карточка с формой -->
        <div class="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4">
          <h3 class="text-base font-semibold text-zinc-700">
            Create a new habit
          </h3>
          <CreateHabitForm v-if="domain" :domain="domain" />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
