<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import type { Habit } from "@/features/habit/model";
import { Button } from "@/components/ui/button";
import { useCompletedHabitkMutation } from "@/features/habit/service/index";
import { convertSecondsToMinutes } from "@/utils/time";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

// Extend dayjs with duration plugin
dayjs.extend(duration);

const { t } = useI18n();
const props = defineProps<{ habit: Habit }>();

// Local habit state with additional runtime properties
const habit = ref({
  ...props.habit,
  remainingTime: props.habit.runtime,
  isRunning: false,
  isCompleted: props.habit.isCompleted,
});

// Cooldown remaining time in seconds
const cooldownRemaining = ref(0);

// Timers references
let interval: ReturnType<typeof setInterval> | null = null;
let cooldownInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Calculate remaining cooldown time in seconds.
 */
const updateCooldownRemaining = () => {
  const lastDate = habit.value.completedDates?.at(-1);
  if (!lastDate) return 0;

  const diff = dayjs(lastDate).add(24, "hour").diff(dayjs(), "second");
  return diff > 0 ? diff : 0;
};

/**
 * Start cooldown countdown checker.
 */
const startCooldownChecker = () => {
  cooldownRemaining.value = updateCooldownRemaining();

  if (cooldownRemaining.value > 0) {
    cooldownInterval = setInterval(() => {
      cooldownRemaining.value = updateCooldownRemaining();

      // When cooldown ends, reset habit status
      if (cooldownRemaining.value <= 0) {
        habit.value.isCompleted = false;
        stopCooldownChecker();
      }
    }, 1000);
  }
};

/**
 * Stop cooldown checker.
 */
const stopCooldownChecker = () => {
  if (cooldownInterval) clearInterval(cooldownInterval);
  cooldownInterval = null;
};

// Lifecycle hooks
onMounted(() => {
  if (habit.value.isCompleted) startCooldownChecker();
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
  if (cooldownInterval) clearInterval(cooldownInterval);
});

// Mutation to mark habit as completed
const { mutate: completeHabitMutation, error } = useCompletedHabitkMutation();

/**
 * Complete the habit.
 */
const completeHabit = () => {
  habit.value.isRunning = false;
  habit.value.isCompleted = true;
  if (interval) clearInterval(interval);

  completeHabitMutation(
    { habitId: habit.value.id, dayPart: ref(habit.value.dayPart) },
    { onSuccess: () => console.log("Habit completed successfully") }
  );

  // Start cooldown timer after completing the habit
  startCooldownChecker();
};

/**
 * Start the habit timer.
 */
const startTimer = () => {
  if (habit.value.isRunning || habit.value.isCompleted) return;

  habit.value.isRunning = true;
  interval = setInterval(() => {
    if (habit.value.remainingTime > 0) {
      habit.value.remainingTime--;
    } else {
      completeHabit();
    }
  }, 1000);
};

// Watch remaining time and auto-complete when it reaches 0
watch(
  () => habit.value.remainingTime,
  (newVal) => {
    if (newVal <= 0 && habit.value.isRunning && !habit.value.isCompleted) {
      completeHabit();
    }
  }
);

// Computed formatted cooldown string (HH:mm:ss)
const formattedCooldown = computed(() => {
  const dur = dayjs.duration(cooldownRemaining.value * 1000);
  return `${String(dur.hours()).padStart(2, "0")}:${String(dur.minutes()).padStart(2, "0")}:${String(dur.seconds()).padStart(2, "0")}`;
});
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
            convertSecondsToMinutes(habit.remainingTime)
          : habit.isCompleted
            ? t("app.habit.completed")
            : t("app.habit.start")
      }}
    </Button>

    <!-- Cooldown countdown display -->
    <div
      v-if="habit.isCompleted && cooldownRemaining > 0"
      class="text-sm text-gray-500"
    >
      {{ t("app.habit.cooldown") }}: {{ formattedCooldown }}
    </div>

    <span v-if="error" class="text-red-500">{{ error.message }}</span>
  </div>
</template>
