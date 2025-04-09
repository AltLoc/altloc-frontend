<script setup lang="ts">
import { defineProps } from "vue";
import type { Habit } from "@/features/habit/model";
import { HabitTimer } from "@/features/habit/components/habit-timer";
import { CircularProgress } from "@/components/ui/progress";
import TargetIcon from "@/assets/icons/target.svg?component";
import MatrixIcon from "@/assets/icons/matrix.svg?component";

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
        class="bg-white shadow-md rounded-md p-4 flex-1 flex flex-col gap-2 w-auto"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold">{{ habit.name }}</h3>

          <div class="flex items-center gap-2">
            <TargetIcon
              class="size-5 stroke-[1.7] text-zinc-700 text-sm"
              title="Target"
            />
            <CircularProgress
              :value="
                (habit.numberOfCompletions / habit.targetNumberOfCompletions) *
                100
              "
              s
              :max="100"
              :size="40"
              :percentage="true"
            />
          </div>
        </div>
        <div class="flex items-center gap-0.5">
          <MatrixIcon class="mr-2 size-5 stroke-[1.7] text-zinc-800" />
          <span class="text-zinc-500 text-sm"> {{ habit.domainName }}</span>
        </div>
        <HabitTimer :habit="habit" />
      </div>
    </div>
  </div>
</template>
