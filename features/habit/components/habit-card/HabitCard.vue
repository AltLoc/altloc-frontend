<script setup lang="ts">
import { computed } from "vue";
import type { Habit } from "@/features/habit/model";
import { HabitTimer } from "@/features/habit/components/habit-timer";
import { Progress } from "@/components/ui/progress";
import ChartIcon from "@/assets/icons/chart.svg?component";

import TargetIcons from "@/assets/icons/target.svg?component";
import CategoryIcon from "@/assets/icons/category.svg?component";

const props = defineProps<{ habit: Habit }>();

const progress = computed(() => {
  if (!props.habit.targetNumberOfCompletions) return 0;
  return (
    (props.habit.numberOfCompletions / props.habit.targetNumberOfCompletions) *
    100
  );
});
</script>

<template>
  <div
    class="bg-white rounded-2xl border border-zinc-200 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all p-4 w-auto"
  >
    <div class="flex justify-between items-center">
      <div class="flex flex-col gap-4 bg-blue-50 p-3 rounded-xl">
        <div class="flex gap-1.5 items-center bg-bottom bg-teal-100">
          <TargetIcons
            class="size-4 stroke-[1.7] text-zinc-700"
            title="Habit"
          />
          <h3 class="text-base font-semibold text-zinc-700">
            {{ habit.name }}
          </h3>
        </div>
        <div class="flex gap-1.5 items-center">
          <CategoryIcon
            class="size-4 stroke-[1.7] text-zinc-700"
            title="Domain"
          />
          <span class="text-xs text-700">
            {{ habit.domainName }}
          </span>
        </div>
        <div>
          <a
            :href="`/user/habit/${habit.id}/`"
            class="flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <ChartIcon class="size-4 stroke-[1.7] text-zinc-700" />
            <span class="text-zinc-700 text-xs">Stats</span>
          </a>
        </div>
      </div>

      <HabitTimer :habit="habit" />
    </div>

    <div class="flex justify-between items-center align-middle gap-3">
      <Progress
        :model-value="progress"
        class="h-2 mt-2 bg-zinc-100 rounded-full"
      />

      <span
        class="bg-blue-100 text-zinc-500 text-xs font-medium px-2 py-0.5 rounded"
      >
        {{
          (habit.numberOfCompletions / habit.targetNumberOfCompletions) * 100
            ? Math.round(
                (habit.numberOfCompletions / habit.targetNumberOfCompletions) *
                  100
              )
            : 0
        }}%
      </span>
    </div>
  </div>
</template>
