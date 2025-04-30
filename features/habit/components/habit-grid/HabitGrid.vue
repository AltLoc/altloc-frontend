<script setup lang="ts">
import { defineProps } from "vue";
import type { Habit } from "@/features/habit/model";
import { HabitCard } from "@/features/habit/components/habit-card";

const props = defineProps<{
  habit: Habit[];
}>();
</script>

<template>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 mt-5"
  >
    <div v-for="(habit, index) in props.habit" :key="index">
      <HabitCard :habit="habit" />
    </div>
  </div>
</template>
