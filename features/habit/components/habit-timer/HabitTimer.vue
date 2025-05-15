<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import type { Habit } from "@/features/habit/model";
import { Button } from "@/components/ui/button";
import { useCompletedHabitMutation } from "@/features/habit/service/index";
import { convertSecondsToMinutes } from "@/utils/time";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Timer24hIcon from "@/assets/icons/timer24h.svg?component";

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
 * If cooldown ends, habit will automatically be marked as not completed.
 */
const startCooldownChecker = () => {
  if (cooldownInterval) return; // Prevent multiple intervals

  cooldownInterval = setInterval(() => {
    cooldownRemaining.value = updateCooldownRemaining();

    if (cooldownRemaining.value <= 0) {
      habit.value.isCompleted = false;
      stopCooldownChecker();
    }
  }, 1000);
};

/**
 * Stop the cooldown checker.
 */
const stopCooldownChecker = () => {
  if (cooldownInterval) clearInterval(cooldownInterval);
  cooldownInterval = null;
};

/**
 * Lifecycle hook on component mount.
 * Initializes the cooldown timer if needed.
 */
onMounted(() => {
  cooldownRemaining.value = updateCooldownRemaining();
  if (cooldownRemaining.value > 0) {
    startCooldownChecker();
  }
});

/**
 * Cleanup on component unmount.
 */
onUnmounted(() => {
  if (interval) clearInterval(interval);
  if (cooldownInterval) clearInterval(cooldownInterval);
});

/**
 * Mutation to mark habit as completed on the backend.
 */
const { mutate: completeHabitMutation, error } = useCompletedHabitMutation();

/**
 * Complete the habit.
 * Marks the habit as completed and starts the cooldown timer.
 */
const completeHabit = () => {
  habit.value.isRunning = false;
  habit.value.isCompleted = true;
  if (interval) clearInterval(interval);

  completeHabitMutation(
    { habitId: habit.value.id, dayPart: habit.value.dayPart },
    { onSuccess: () => console.log("Habit completed successfully") }
  );

  startCooldownChecker();
};

/**
 * Start the habit countdown timer.
 */
const startTimer = () => {
  if (habit.value.isRunning || isCompleted.value) return;

  habit.value.isRunning = true;
  interval = setInterval(() => {
    if (habit.value.remainingTime > 0) {
      habit.value.remainingTime--;
    } else {
      completeHabit();
    }
  }, 1000);
};

/**
 * Computed whether habit is currently under cooldown.
 */
const isInCooldown = computed(() => cooldownRemaining.value > 0);

/**
 * Computed whether habit is completed.
 * It will be true either if habit is explicitly completed or if it's under cooldown.
 */
const isCompleted = computed(
  () => habit.value.isCompleted || isInCooldown.value
);

/**
 * Computed formatted cooldown string (HH:mm:ss).
 */
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
      :disabled="habit.isRunning || isCompleted"
    >
      {{
        habit.isRunning
          ? t("app.habit.thereStill") +
            convertSecondsToMinutes(habit.remainingTime)
          : isCompleted
            ? t("app.habit.completed")
            : t("app.habit.start")
      }}
    </Button>

    <!-- Cooldown countdown display -->
    <div v-if="isInCooldown" class="flex-col items-center gap-1">
      <div class="text-xs">
        {{ t("app.habit.cooldown") }}
      </div>

      <div class="flex gap-1 items-center">
        <Timer24hIcon class="size-4 stroke-[1] text-zinc-700" />
        <div class="font-semibold text-zinc-500">
          {{ formattedCooldown }}
        </div>
      </div>
    </div>

    <span v-if="error" class="text-red-500">{{ error.message }}</span>
  </div>
</template>
