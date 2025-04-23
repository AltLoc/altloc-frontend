<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Habit } from "@/features/habit/model";
import { HabitTimer } from "@/features/habit/components/habit-timer";
import { CircularProgress } from "@/components/ui/progress";
import ChartIcon from "@/assets/icons/chart.svg?component";
import TargetIcons from "@/assets/icons/target.svg?component";

const props = defineProps<{
  habit: Habit[];
}>();
</script>

<template>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 mt-5"
  >
    <div v-for="(habit, index) in props.habit" :key="index">
      <div
        class="bg-white shadow-md rounded-md p-4 flex-1 flex flex-col gap-4 w-auto"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold">{{ habit.name }}</h3>

          <div class="flex items-center gap-2">
            <TargetIcons
              class="size-5 stroke-[1.7] text-zinc-700 text-sm"
              title="Target"
            />
            <CircularProgress
              :value="
                habit.targetNumberOfCompletions === 0
                  ? 0
                  : (habit.numberOfCompletions /
                      habit.targetNumberOfCompletions) *
                    100
              "
              :max="100"
              :size="40"
              :percentage="true"
            />
          </div>
        </div>

        <HabitTimer :habit="habit" />
        <div class="flex justify-between">
          <div class="flex flex-col gap-0.5">
            <!-- <MatrixIcon class="mr-2 size-5 stroke-[1.7] text-zinc-800" /> -->
            <span class="text-zinc-400 text-[10px]">Domain:</span>
            <span class="text-zinc-500 text-sm">{{ habit.domainName }}</span>
          </div>
          <div class="flex flex-col gap-0.5">
            <a :href="`/user/habit/${habit.id}/`">
              <span class="text-zinc-400 text-[10px]">Stats:</span>
              <ChartIcon class="mr-2 size-5 stroke-[1.7] text-zinc-800" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
