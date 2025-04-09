<script setup lang="ts">
import { ref } from "vue";
import type { Habit } from "@/features/habit/model";
import { Button } from "@/components/ui/button";
import { useCompletedHabitkMutation } from "@/features/habit/service/index";
import { convertSecondsToMinutes } from "@/utils/time";

const { mutate: completeHabitMutation, error } = useCompletedHabitkMutation();

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
  completeHabitMutation(habit.value.id);
};
</script>

<template>
  <div class="flex flex-col items-center justify-between habit-timer gap-3">
    <Button size="sm" @click="startTimer" :disabled="habit.isRunning">
      {{
        habit.isRunning
          ? `There's still: ${convertSecondsToMinutes(habit.remainingTime)}`
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

    <span v-if="error" class="text-red-500">{{ error.message }}</span>
  </div>
</template>
