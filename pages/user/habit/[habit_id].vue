<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useRoute } from "vue-router";
import { BackButton } from "@/components/ui/button";
import { useQuery } from "@tanstack/vue-query";
import { fetchHabit } from "@/features/habit/service/index";
import { computed } from "vue";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
} from "radix-vue";
import ArrowRightIcon from "@/assets/icons/arrowRight.svg?component";
import ArrowLeftIcon from "@/assets/icons/arrowLeft.svg?component";

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
            Completed: {{ habit?.numberOfCompletions }}
          </span>
          <span class="text-sm font-semibold">
            Target: {{ habit?.targetNumberOfCompletions }}
          </span>
          <span class="text-sm font-semibold">
            Day part: {{ habit?.dayPart.toLowerCase() }}
          </span>
        </div>

        <RangeCalendarRoot
          v-slot="{ weekDays, grid }"
          fixed-weeks
          week-start="1"
        >
          <RangeCalendarHeader class="flex items-center justify-between">
            <RangeCalendarPrev
              class="text-black w-8 h-8 rounded hover:bg-gray-300 flex items-center justify-center"
            >
              <ArrowLeftIcon class="size-5 stroke-[2] ml-1" />
            </RangeCalendarPrev>
            <RangeCalendarHeading
              class="text-[15px] font-semibold text-black"
            />
            <RangeCalendarNext
              class="text-black w-8 h-8 rounded hover:bg-gray-300 flex items-center justify-center"
            >
              <ArrowRightIcon class="size-5 stroke-[2] ml-1" />
            </RangeCalendarNext>
          </RangeCalendarHeader>

          <div
            class="pt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"
          >
            <RangeCalendarGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full space-y-1"
            >
              <RangeCalendarGridHead>
                <RangeCalendarGridRow
                  class="grid grid-cols-7 gap-1 item-center text-sm text-gray-500"
                >
                  <RangeCalendarHeadCell v-for="day in weekDays" :key="day">
                    {{ day }}
                  </RangeCalendarHeadCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridHead>

              <RangeCalendarGridBody>
                <RangeCalendarGridRow
                  v-for="(weekDates, i) in month.rows"
                  :key="`week-${i}`"
                  class="grid grid-cols-7 gap-1"
                >
                  <RangeCalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <RangeCalendarCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      :class="[
                        'w-9 h-9 flex item-center justify-center rounded-md text-sm font-medium align-center',
                        isCompletedDate(new Date(weekDate.toString()))
                          ? 'bg-green-400 text-white'
                          : 'hover:bg-gray-100 text-gray-800',
                      ]"
                    />
                  </RangeCalendarCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridBody>
            </RangeCalendarGrid>
          </div>
        </RangeCalendarRoot>
      </div>
    </section>
  </AppLayout>
</template>
