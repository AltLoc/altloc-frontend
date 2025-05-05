<script setup lang="ts">
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import PlusIcon from "@/assets/icons/plus.svg?component";
// import ChartIcon from "@/assets/icons/chart.svg?component";
import EditIcon from "@/assets/icons/edit.svg?component";
import DeleteIcon from "@/assets/icons/delete.svg?component";
import { useDeleteIdentityMatrixMutation } from "@/features/identityMatrix/service/index";
import type { IdentityMatrix } from "@/features/identityMatrix/model";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  identityMatrix: IdentityMatrix;
}>();

const { mutate: deleteIdentityMatrix } = useDeleteIdentityMatrixMutation();

const normalize = (path: string) => (path.endsWith("/") ? path : path + "/");
const isActive = (path: string) => {
  return normalize(path) === normalize(path) ? "" : undefined;
};
</script>

<template>
  <DropdownMenuItem
    as="router-link"
    :data-active="isActive(`/user/matrix/${identityMatrix.id}`)"
    class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-100 data-[active]:hover:bg-indigo-50"
  >
    <router-link
      :to="`/user/matrix/${identityMatrix.id}`"
      title="Add Domain"
      class="flex items-center"
    >
      <PlusIcon class="mr-2 size-4 stroke-[1.7] text-zinc-700" />
      <span class="text-zinc-700 text-sm">
        {{ t("app.domain.create") }}
      </span>
    </router-link>
  </DropdownMenuItem>

  <DropdownMenuItem
    as="router-link"
    :data-active="isActive(`/user/matrix/${identityMatrix.id}/edit`)"
    class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-100 data-[active]:hover:bg-indigo-50"
  >
    <router-link
      :to="`/user/matrix/${identityMatrix.id}/edit`"
      title="Edit Matrix"
      class="flex items-center"
    >
      <EditIcon class="mr-2 size-4 stroke-[1.5] text-zinc-500" />
      <span class="text-zinc-700 text-sm">
        {{ t("app.identityMatrix.edit") }}
      </span>
    </router-link>
  </DropdownMenuItem>

  <!-- <DropdownMenuItem disabled>
    <router-link
      to="#"
      title="Stats of identity matrix"
      class="flex items-center"
      disabled
    >
      <ChartIcon class="mr-2 size-4 stroke-[1.5] text-zinc-500" />
      <span class="text-zinc-700">Chart</span>
    </router-link>
  </DropdownMenuItem> -->
  <DropdownMenuItem
    class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-red-50"
    @click="
      () => {
        deleteIdentityMatrix(props.identityMatrix.id);
      }
    "
  >
    <DeleteIcon class="mr-2 size-4 stroke-[1.5] text-red-500" />
    <span class="text-red-700 text-sm">
      {{ t("app.identityMatrix.delete") }}
    </span>
  </DropdownMenuItem>
</template>
