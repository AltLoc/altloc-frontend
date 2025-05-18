<script lang="ts" setup>
import AppLayout from "@/layouts/AppLayout.vue";
import { useRoute } from "vue-router";
import { BackButton } from "@/components/ui/button";
import { useQuery } from "@tanstack/vue-query";
import { fetchHabit } from "@/features/habit/service/index";
import { computed } from "vue";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

import { useI18n } from "vue-i18n";

import {
  CalendarRoot,
  type CalendarRootProps,
  type CalendarRootEmits,
  useForwardPropsEmits,
  CalendarHeading,
  CalendarGrid,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarGridBody,
  CalendarCell,
  CalendarCellTrigger,
  CalendarHeader,
  CalendarPrev,
  CalendarNext,
} from "reka-ui";
import ArrowRightIcon from "@/assets/icons/arrowRight.svg?component";
import ArrowLeftIcon from "@/assets/icons/arrowLeft.svg?component";
import { reactiveOmit } from "@vueuse/core";
import type { HTMLAttributes } from "vue";
import { cn } from "@/utils";

const { t } = useI18n();
const route = useRoute();

const habitId: string = Array.isArray(route.params.habit_id)
  ? route.params.habit_id[0]
  : route.params.habit_id;

const { data: habit } = useQuery({
  ...fetchHabit(habitId),
  enabled: !!habitId,
});

const completedDates = computed(() => {
  return (habit?.value?.completedDates ?? []).map((dateStr: string) =>
    dayjs(dateStr)
  );
});

function isCompletedDate(date: Date) {
  return completedDates.value.some((d) => d.isSame(dayjs(date), "day"));
}

// Props and emits to forward to CalendarRoot
const props = defineProps<
  CalendarRootProps & { class?: HTMLAttributes["class"] }
>();
const emits = defineEmits<CalendarRootEmits>();
const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-6">
        <div class="flex">
          <BackButton />
        </div>

        <div class="flex gap-3 items-center bg-blue-100 rounded-md p-3 w-fit">
          <h2 class="text-lg text-zinc-500">Habit:</h2>
          <span class="font-semibold">
            {{ habit?.name }}
          </span>
        </div>

        <div class="flex gap-3 items-center">
          <span class="text-sm font-semibold">
            {{ t("app.habit.completed") }}: {{ habit?.numberOfCompletions }}
          </span>
          <span class="text-sm font-semibold">
            {{ t("app.habit.target") }}: {{ habit?.targetNumberOfCompletions }}
          </span>
          <span class="text-sm font-semibold">
            {{ t("app.habit.dayPart.title") }}:
            {{ habit?.dayPart.toLowerCase() }}
          </span>
        </div>

        <CalendarRoot
          v-slot="{ grid, weekDays }"
          :class="cn('p-3', props.class)"
          v-bind="forwarded"
          week-start="1"
          class="flex flex-col gap-4 bg-white shadow-lg rounded-xl p-6 border border-zinc-100 transition-all duration-300 hover:shadow-xl"
        >
          <CalendarHeader class="flex items-center justify-between">
            <CalendarPrev class="rounded hover:bg-blue-100 p-1">
              <ArrowLeftIcon class="size-5 stroke-[2] ml-1" />
            </CalendarPrev>
            <CalendarHeading />
            <CalendarNext class="rounded hover:bg-blue-100 p-1">
              <ArrowRightIcon class="size-5 stroke-[2] ml-1" />
            </CalendarNext>
          </CalendarHeader>

          <div
            class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-4"
          >
            <CalendarGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="flex-1"
            >
              <CalendarGridHead>
                <CalendarGridRow>
                  <CalendarHeadCell v-for="day in weekDays" :key="day">
                    {{ day }}
                  </CalendarHeadCell>
                </CalendarGridRow>
              </CalendarGridHead>

              <CalendarGridBody>
                <CalendarGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="mt-2 w-full"
                >
                  <CalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <CalendarCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      :class="[
                        'flex items-center justify-center rounded-md text-sm font-medium w-full h-8',
                        isCompletedDate(new Date(weekDate.toString()))
                          ? 'bg-blue-400 text-white'
                          : 'hover:bg-gray-100 text-gray-800',
                      ]"
                      class="data-[outside-view]:text-gray-400"
                    />
                  </CalendarCell>
                </CalendarGridRow>
              </CalendarGridBody>
            </CalendarGrid>
          </div>
        </CalendarRoot>
      </div>
    </section>
  </AppLayout>
</template>
