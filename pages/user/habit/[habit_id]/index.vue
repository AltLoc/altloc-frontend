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
import EditIcon from "@/assets/icons/edit.svg?component";
import TargetIcons from "@/assets/icons/target.svg?component";
import SunsetIcon from "@/assets/icons/sunset.svg?component";
import SunHighIcon from "@/assets/icons/sun-high.svg?component";
import SunriseIcon from "@/assets/icons/sunrise.svg?component";
import MoonIcon from "@/assets/icons/moon.svg?component";
import ClockIcon from "@/assets/icons/clock.svg?component";
import { convertSecondsToTimeString } from "@/utils/time";

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

const dayPartIcon = computed(() => {
  switch (habit.value?.dayPart) {
    case "MORNING":
      return SunriseIcon;
    case "AFTERNOON":
      return SunHighIcon;
    case "EVENING":
      return SunsetIcon;
    case "NIGHT":
      return MoonIcon;
    default:
      return SunHighIcon;
  }
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-6">
        <div class="flex">
          <BackButton />
        </div>

        <div class="flex md:flex-row flex-col gap-3">
          <div
            class="bg-white rounded-xl p-5 border border-zinc-200 shadow-md w-full max-w-md"
          >
            <h2
              class="text-lg font-semibold text-zinc-800 mb-4 flex items-center gap-2"
            >
              <TargetIcons class="size-5 stroke-[1.5] text-blue-500" />
              {{ t("app.habit.title") }}:
              <span class="font-semibold text-zinc-900">{{ habit?.name }}</span>
            </h2>

            <div class="grid grid-cols-1 gap-3">
              <div class="flex items-center gap-3">
                <ArrowRightIcon class="size-4 stroke-[1.5] text-green-500" />
                <span class="text-sm text-zinc-700 font-medium">
                  {{ t("app.habit.completed") }}:
                  <span class="font-semibold text-zinc-900">{{
                    habit?.numberOfCompletions
                  }}</span>
                </span>
              </div>

              <div class="flex items-center gap-3">
                <ArrowRightIcon class="size-4 stroke-[1.5] text-red-500" />
                <span class="text-sm text-zinc-700 font-medium">
                  {{ t("app.habit.target") }}:
                  <span class="font-semibold text-zinc-900">
                    {{ habit?.targetNumberOfCompletions }}
                  </span>
                </span>
              </div>

              <div class="flex items-center gap-3" title="Time spent on habit">
                <ClockIcon class="size-4 stroke-[1.5] text-purple-500" />
                <span class="text-sm text-zinc-700 font-medium">
                  {{ t("app.habit.spentTime") }}
                  <span class="text-sm text-zinc-700 font-medium" v-if="habit">
                    {{ convertSecondsToTimeString(habit?.spentTime) }}
                  </span>
                </span>
              </div>

              <div class="flex items-center gap-3">
                <component
                  :is="dayPartIcon"
                  class="size-4 stroke-[1.5] text-zinc-700"
                />
                <span class="text-sm text-zinc-700 font-medium">
                  {{ t("app.habit.dayPart.title") }}:
                  <span class="font-semibold text-zinc-900">{{
                    habit?.dayPart.toLowerCase()
                  }}</span>
                </span>
              </div>
            </div>

            <router-link
              :to="`/user/habit/${habit?.id}/edit`"
              title="Edit Habit"
              class="mt-4 inline-flex items-center text-sm text-blue-600 hover:underline transition"
            >
              <EditIcon class="mr-2 size-4 stroke-[1.5]" />
              {{ t("app.habit.edit") }}
            </router-link>
          </div>

          <CalendarRoot
            v-slot="{ grid, weekDays }"
            :class="cn('p-3', props.class)"
            v-bind="forwarded"
            week-start="1"
            class="flex flex-col gap-4 bg-white shadow-lg rounded-xl p-6 border border-zinc-100 transition-all duration-300 hover:shadow-xl md:w-full"
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
      </div>
    </section>
  </AppLayout>
</template>
