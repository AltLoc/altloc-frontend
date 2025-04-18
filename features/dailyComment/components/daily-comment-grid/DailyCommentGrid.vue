<script setup lang="ts">
import { defineProps } from "vue";
import CalendarIcon from "@/assets/icons/calendar.svg?component";
import type { DailyComment } from "@/features/dailyComment/model";
import { utcTimestampToDayAndMonth } from "@/utils/date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DotsHorizontalIcon from "@/assets/icons/dots-horizontal.svg?component";
import { DailyCommentActionDropDownMenu } from "@/features/dailyComment/components/daily-comment-action-dropdown-menu/";

const props = defineProps<{
  dailyComment: DailyComment[];
}>();

const isOpenDayQuestDialog = ref(false);
const isOpenEditCommentDialog = ref(false);
const modalProps = ref<{ comment: DailyComment }>();

function handleOpenModal(
  dialogType: "delete" | "edit" | "create" | "statistics",
  comment: DailyComment
) {
  console.log(dialogType, comment);
  if (dialogType === "edit" && modalProps) {
    modalProps.value = { comment };
    isOpenEditCommentDialog.value = true;
  }
}
</script>

<template>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 mt-5"
  >
    <div v-for="(dailyComment, index) in props.dailyComment" :key="index">
      <div
        class="bg-white shadow-md rounded-md p-4 flex-1 flex flex-col gap-4 w-auto"
      >
        <div class="flex flex-col gap-4">
          <div class="flex gap-3 items-center">
            <div class="flex gap-2 items-center">
              <CalendarIcon class="size-5 stroke-[1.7] text-zinc-400" />
              <span class="text-xs text-zinc-400">
                {{ utcTimestampToDayAndMonth(dailyComment.createdAt) }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-zinc-400">{{ dailyComment.mood.emoji }}</span>
              <span class="text-zinc-400 text-xs">
                {{ dailyComment.mood.label }}
              </span>
            </div>
            <DropdownMenu :modal="false">
              <DropdownMenuTrigger
                class="flex items-center p-1 hover:bg-black/5 rounded data-[state=open]:bg-black/5"
              >
                <DotsHorizontalIcon
                  class="size-5 stroke-[1.75] text-zinc-600"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="min-w-40">
                <DailyCommentActionDropDownMenu
                  :dailyComment="dailyComment"
                  @openModal="handleOpenModal"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div class="w-full bg-blue-50 rounded-lg p-2">
            <span class="text-sm text-zinc-700">
              {{ dailyComment.content }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
