<script setup lang="ts">
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import EditIcon from "@/assets/icons/edit.svg?component";
import DeleteIcon from "@/assets/icons/delete.svg?component";
import { useDeleteDailyCommentMutation } from "@/features/dailyComment/service/index";
import type { DailyComment } from "@/features/dailyComment/model";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{ dailyComment: DailyComment }>();

// const emit = defineEmits<{
//   (
//     event: "openModal",
//     dialogType: "create" | "edit" | "statistics" | "delete",
//     dailyComment: DailyComment
//   ): void;
// }>();

const { mutate: deleteDailyComment } = useDeleteDailyCommentMutation();

console.log("DayQuestActionDropdownMenu -> categoryId", props.dailyComment.id);
</script>

<template>
  <DropdownMenuItem>
    <a
      :href="`/user/daily-comment/${dailyComment.id}/edit`"
      class="flex items-center"
    >
      <EditIcon class="mr-2 size-4 stroke-[1.5] text-zinc-500" />
      <span class="text-zinc-700">
        {{ t("app.dailyComment.edit") }}
      </span>
    </a>
  </DropdownMenuItem>
  <DropdownMenuItem
    @click="
      () => {
        deleteDailyComment(props.dailyComment.id);
      }
    "
  >
    <DeleteIcon class="mr-2 size-4 stroke-[1.5] text-red-500" />
    <span class="text-red-500">
      {{ t("app.dailyComment.delete") }}
    </span>
  </DropdownMenuItem>
</template>
