<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchHabitsByDayPart } from "@/features/habit/service";
import { HabitGrid } from "@/features/habit/components/habit-grid";
import { getMeQueryOptions } from "@/features/user/service/user.client";
import { GamificationProgressBar } from "@/features/gamification/components/gamification-progress-bar/";

const { data: user } = useQuery(getMeQueryOptions);

const dayPart = ref<string>("MORNING");

const habitsByDayPartQuery = useQuery({
  ...fetchHabitsByDayPart(dayPart),
  enabled: true,
});

watch(dayPart, () => {
  habitsByDayPartQuery.refetch();
});

const habitsByDayPart = computed(() => habitsByDayPartQuery.data?.value ?? []);
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <GamificationProgressBar v-if="user" :user="user" />
        <h2 class="text-2xl font-bold">Day quests - {{ dayPart }}</h2>
        <HabitGrid :habit="habitsByDayPart ?? []" v-model:dayPart="dayPart" />
      </div>
    </section>
  </AppLayout>
</template>
