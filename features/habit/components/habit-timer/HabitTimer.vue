<script setup lang="ts">
import { ref } from "vue";
import type { Habit } from "@/features/habit/model";
import { Button } from "@/components/ui/button";

const props = defineProps<{ habit: Habit }>();

interface HabitTimer extends Habit {
  remainingTime: number;
  isRunning: boolean;
}

const habit = ref<HabitTimer>({
  ...props.habit,
  remainingTime: props.habit.runtime,
  isRunning: false,
});

let interval: ReturnType<typeof setInterval> | null = null;

const startTimer = () => {
  if (habit.value.isRunning) return;
  habit.value.isRunning = true;

  interval = setInterval(() => {
    if (habit.value.remainingTime > 0) {
      habit.value.remainingTime--;
    } else {
      clearInterval(interval!);
    }
  }, 1000);
};

const completeHabit = () => {
  habit.value.isRunning = false;
  if (interval) clearInterval(interval);
  console.info("Habit completed and send data to backend", habit.value);
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};
</script>

<template>
  <div class="flex items-center justify-between habit-timer gap-3">
    <Button size="sm" @click="startTimer" :disabled="habit.isRunning">
      {{
        habit.isRunning
          ? `There's still: ${formatTime(habit.remainingTime)}`
          : "Start Timer"
      }}
    </Button>
    <Button
      size="sm"
      @click="completeHabit"
      :disabled="habit.remainingTime > 0"
    >
      Habit completed
    </Button>
  </div>
</template>
