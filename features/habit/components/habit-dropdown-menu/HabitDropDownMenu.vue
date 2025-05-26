<script setup lang="ts">
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import EditIcon from "@/assets/icons/edit.svg?component";
import DeleteIcon from "@/assets/icons/delete.svg?component";
import { useDeleteHabitMutation } from "@/features/habit/service/index";

import { useI18n } from "vue-i18n";
import type { Habit } from "@/features/habit/model";

const { t } = useI18n();

const props = defineProps<{
  habit: Habit;
}>();

const { mutate: deleteHabit } = useDeleteHabitMutation();

const normalize = (path: string) => (path.endsWith("/") ? path : path + "/");
const isActive = (path: string) => {
  return normalize(path) === normalize(path) ? "" : undefined;
};
</script>

<template>
  <DropdownMenuItem
    as="router-link"
    :data-active="isActive(`/user/habit/${habit.id}/edit`)"
    class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-100 data-[active]:hover:bg-indigo-50"
  >
    <router-link
      :to="`/user/habit/${habit.id}/edit`"
      title="Edit habit"
      class="flex items-center"
    >
      <EditIcon class="mr-2 size-4 stroke-[1.5] text-zinc-500" />
      <span class="text-zinc-700 text-sm">
        {{ t("app.habit.edit") }}
      </span>
    </router-link>
  </DropdownMenuItem>
  <DropdownMenuItem
    class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-red-50"
    @click="
      () => {
        deleteHabit({
          habitId: habit.id,
          domainId: habit.domainId,
        });
      }
    "
  >
    <DeleteIcon class="mr-2 size-4 stroke-[1.5] text-red-500" />
    <span class="text-red-700 text-sm">
      {{ t("app.habit.delete") }}
    </span>
  </DropdownMenuItem>
</template>
