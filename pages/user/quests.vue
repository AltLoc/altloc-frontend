<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchHabitsByDayPart } from "@/features/habit/service";
import { HabitGrid } from "@/features/habit/components/habit-grid";
import { getMeQueryOptions } from "@/features/user/service/user.client";
import { GamificationProgressBar } from "@/features/gamification/components/gamification-progress-bar/";
import { DayPartTabs } from "@/features/habit/components/day-part-tabs";
import SunsetIcon from "@/assets/icons/sunset.svg?component";
import SunHighIcon from "@/assets/icons/sun-high.svg?component";
import SunriseIcon from "@/assets/icons/sunrise.svg?component";
import MoonIcon from "@/assets/icons/moon.svg?component";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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

const dayPartIcon = computed(() => {
  switch (dayPart.value) {
    case "MORNING":
      return SunriseIcon;
    case "AFTERNOON":
      return SunHighIcon;
    case "EVENING":
      return SunsetIcon;
    case "NIGHT":
      return MoonIcon;
    default:
      return SunHighIcon;
  }
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <GamificationProgressBar v-if="user" :user="user" />
        <div class="flex gap-1.5 items-center">
          <h2 class="text-xl font-bold text-zinc-700">
            {{ t("app.habit.dailyQuests") }}
          </h2>
          <component :is="dayPartIcon" class="size-8 stroke-2 text-zinc-700" />
        </div>

        <DayPartTabs v-model:dayPart="dayPart" />
        <HabitGrid :habit="habitsByDayPart ?? []" />
      </div>
    </section>
  </AppLayout>
</template>
