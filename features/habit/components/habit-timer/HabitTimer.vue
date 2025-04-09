<script setup lang="ts">
import { ref, watch } from "vue";
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
      completeHabit(); // Автоматически завершить привычку
    }
  }, 1000);
};

const completeHabit = () => {
  habit.value.isRunning = false;
  if (interval) clearInterval(interval);
  completeHabitMutation(habit.value.id); // Вызываем мутацию для завершения привычки
};

// Автоматически завершать привычку, если время равно 0
watch(
  () => habit.value.remainingTime,
  (newValue) => {
    if (newValue <= 0 && habit.value.isRunning) {
      completeHabit();
    }
  }
);
</script>

<template>
  <div class="flex flex-col items-center justify-between habit-timer gap-3">
    <Button
      size="md"
      variant="tertiary"
      @click="startTimer"
      :disabled="habit.isRunning || habit.isCompleted"
    >
      {{
        habit.isRunning
          ? `There's still: ${convertSecondsToMinutes(habit.remainingTime)}`
          : habit.isCompleted
            ? "Completed"
            : "Start"
      }}
    </Button>
    <span v-if="error" class="text-red-500">{{ error.message }}</span>
  </div>
</template>
