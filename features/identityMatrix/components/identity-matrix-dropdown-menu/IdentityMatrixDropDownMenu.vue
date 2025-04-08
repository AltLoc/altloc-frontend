<script setup lang="ts">
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import PlusIcon from "@/assets/icons/plus.svg?component";
import ChartIcon from "@/assets/icons/chart.svg?component";
import EditIcon from "@/assets/icons/edit.svg?component";
import DeleteIcon from "@/assets/icons/delete.svg?component";
import { useDeleteIdentityMatrixMutation } from "@/features/identityMatrix/service/index";
import type { IdentityMatrix } from "@/features/identityMatrix/model";

const props = defineProps<{
  identityMatrix: IdentityMatrix;
}>();

const { mutate: deleteIdentityMatrix } = useDeleteIdentityMatrixMutation();
</script>

<template>
  <DropdownMenuItem>
    <router-link
      :to="`/user/matrix/${identityMatrix.id}`"
      title="Add Domain"
      class="flex items-center"
    >
      <PlusIcon class="mr-2 size-4 stroke-[1.7] text-zinc-700" />
      <span class="text-zinc-700">Domain</span>
    </router-link>
  </DropdownMenuItem>

  <DropdownMenuItem>
    <router-link
      :to="`/user/matrix/${identityMatrix.id}/edit`"
      title="Edit Matrix"
      class="flex items-center"
    >
      <EditIcon class="mr-2 size-4 stroke-[1.5] text-zinc-500" />
      <span class="text-zinc-700">Edit matrix</span>
    </router-link>
  </DropdownMenuItem>

  <DropdownMenuItem disabled>
    <router-link
      to="#"
      title="Stats of identity matrix"
      class="flex items-center"
      disabled
    >
      <ChartIcon class="mr-2 size-4 stroke-[1.5] text-zinc-500" />
      <span class="text-zinc-700">Chart</span>
    </router-link>
  </DropdownMenuItem>
  <DropdownMenuItem
    @click="
      () => {
        deleteIdentityMatrix(props.identityMatrix.id);
      }
    "
  >
    <DeleteIcon class="mr-2 size-4 stroke-[1.5] text-zinc-500" />
    <span class="text-zinc-700">Delete</span>
  </DropdownMenuItem>
</template>
