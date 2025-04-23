<script setup lang="ts">
import { ref, watch } from "vue";
import type { Habit } from "@/features/habit/model";
import { Button } from "@/components/ui/button";
import { useCompletedHabitkMutation } from "@/features/habit/service/index";
import { convertSecondsToMinutes } from "@/utils/time";

const props = defineProps<{ habit: Habit }>();

const habit = ref({
  ...props.habit,
  remainingTime: props.habit.runtime,
  isRunning: false,
  isCompleted: props.habit.isCompleted,
});

const { mutate: completeHabitMutation, error } = useCompletedHabitkMutation();

let interval: ReturnType<typeof setInterval> | null = null;

const startTimer = () => {
  if (habit.value.isRunning || habit.value.isCompleted) return;

  habit.value.isRunning = true;

  interval = setInterval(() => {
    if (habit.value.remainingTime > 0) {
      habit.value.remainingTime--;
    } else {
      clearInterval(interval!);
      completeHabit();
    }
  }, 1000);
};

const completeHabit = () => {
  habit.value.isRunning = false;
  habit.value.isCompleted = true;
  if (interval) clearInterval(interval);

  completeHabitMutation(
    {
      habitId: habit.value.id,
      dayPart: ref(habit.value.dayPart),
    },
    {
      onSuccess: () => {
        console.log("Habit completed successfully");
      },
    }
  );
};

watch(
  () => habit.value.remainingTime,
  (newVal) => {
    if (newVal <= 0 && habit.value.isRunning && !habit.value.isCompleted) {
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
