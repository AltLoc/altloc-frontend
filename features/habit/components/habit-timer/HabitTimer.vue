<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Habit } from "@/features/habit/model";
import { Button } from "@/components/ui/button";
import { useCompletedHabitkMutation } from "@/features/habit/service/index";
import { convertSecondsToMinutes } from "@/utils/time";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";

const { t } = useI18n();

const props = defineProps<{ habit: Habit }>();

const habit = ref({
  ...props.habit,
  remainingTime: props.habit.runtime,
  isRunning: false,
  isCompleted: props.habit.isCompleted,
});

const checkHabitCooldown = () => {
  if (habit.value.completedDates?.length) {
    const lastCompletedDate = dayjs(
      habit.value.completedDates[habit.value.completedDates.length - 1]
    );
    const hoursPassed = dayjs().diff(lastCompletedDate, "hour");

    if (hoursPassed >= 24) {
      habit.value.isCompleted = false;
    }
  } else {
    habit.value.isCompleted = false;
  }
};

onMounted(() => {
  checkHabitCooldown();
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
      :variant="habit.isRunning ? 'continue' : 'accepted'"
      @click="startTimer"
      :disabled="habit.isRunning || habit.isCompleted"
    >
      {{
        habit.isRunning
          ? t("app.habit.thereStill") +
            `${convertSecondsToMinutes(habit.remainingTime)}`
          : habit.isCompleted
            ? t("app.habit.completed")
            : t("app.habit.start")
      }}
    </Button>

    <span v-if="error" class="text-red-500">{{ error.message }}</span>
  </div>
</template>
