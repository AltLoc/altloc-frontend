<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchHabits } from "@/features/habit/service";
import { HabitGrid } from "@/features/habit/components/habit-grid";

const { data: habtis } = useQuery({
  ...fetchHabits,
  enabled: true,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <h2 class="text-2xl font-bold">Day quests</h2>
        <HabitGrid :habit="habtis ?? []" />
      </div>
    </section>
  </AppLayout>
</template>
