<script setup lang="ts">
import { defineProps } from "vue";
import type { Habit } from "@/features/habit/model";
import { HabitCard } from "@/features/habit/components/habit-card";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  habit: Habit[];
}>();
</script>

<template>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 mt-5"
  >
    <div
      v-if="props.habit.length === 0"
      class="text-center mt-10 text-gray-700 px-4"
    >
      <p class="mb-6 text-xl font-semibold">
        {{ t("gettingStarted.title") }}
      </p>
      <ol
        class="list-decimal list-inside text-left space-y-4 max-w-2xl mx-auto"
      >
        <li class="text-lg">
          <strong class="font-medium text-blue-600">
            {{ t("gettingStarted.steps.step1.title") }}
          </strong>
          {{ t("gettingStarted.steps.step1.description") }}
          <a
            href="/user/matrix/create"
            class="text-blue-600 hover:underline font-medium"
          >
            {{ t("gettingStarted.steps.step1.link") }}
          </a>
        </li>
        <li class="text-lg">
          <strong class="font-medium text-blue-600">
            {{ t("gettingStarted.steps.step2.title") }}
          </strong>
          {{ t("gettingStarted.steps.step2.description") }}
        </li>
        <li class="text-lg">
          <strong class="font-medium text-blue-600">{{
            t("gettingStarted.steps.step3.title")
          }}</strong>
          {{ t("gettingStarted.steps.step3.description") }}
        </li>
      </ol>
    </div>

    <div v-for="(habit, index) in props.habit" :key="index">
      <HabitCard :habit="habit" />
    </div>
  </div>
</template>
