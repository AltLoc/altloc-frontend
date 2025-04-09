<script setup lang="ts">
import { defineProps } from "vue";
import type { Habit } from "@/features/habit/model";
import dayjs from "dayjs";
import { utcTimestampToDate } from "@/utils/date";
import { HabitTimer } from "@/features/habit/components/habit-timer";

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
        <h3 class="text-lg font-bold">{{ habit.name }}</h3>
        <span class="text-sm text-gray-500">
          {{ habit.targetNumberOfCompletions / habit.numberOfCompletions }} %
        </span>
        <HabitTimer :habit="habit" />
      </div>
    </div>
  </div>
</template>
