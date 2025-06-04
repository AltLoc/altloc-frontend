<script setup lang="ts">
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import EditIcon from "@/assets/icons/edit.svg?component";
import DeleteIcon from "@/assets/icons/delete.svg?component";
import { useDeleteDomainMutation } from "@/features/domain/service/index";
import { useI18n } from "vue-i18n";
import type { Domain } from "@/features/domain/model";
import { useToast } from "@/components/ui/toast/use-toast";

const { t } = useI18n();
const { toast } = useToast();

const props = defineProps<{
  domain: Domain;
}>();

const { mutate: deleteDomain } = useDeleteDomainMutation();

const normalize = (path: string) => (path.endsWith("/") ? path : path + "/");
const isActive = (path: string) => {
  return normalize(path) === normalize(path) ? "" : undefined;
};

const handleDelete = () => {
  deleteDomain(
    {
      domainId: props.domain.id,
      identityMatrixId: props.domain.identityMatrixId,
    },
    {
      onSuccess: () => {
        toast({
          title: t("common.successDelete"),
          variant: "success",
          duration: 2000,
        });
      },
    }
  );
};
</script>

<template>
  <DropdownMenuItem
    as="router-link"
    :data-active="isActive(`/user/domain/${domain.id}/edit`)"
    class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-100 data-[active]:hover:bg-indigo-50"
  >
    <router-link
      :to="`/user/domain/${domain.id}/edit`"
      title="Edit domain"
      class="flex items-center"
    >
      <EditIcon class="mr-2 size-4 stroke-[1.5] text-zinc-500" />
      <span class="text-zinc-700 text-sm">
        {{ t("app.domain.edit") }}
      </span>
    </router-link>
  </DropdownMenuItem>
  <DropdownMenuItem
    class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-red-50"
    @click="handleDelete"
  >
    <DeleteIcon class="mr-2 size-4 stroke-[1.5] text-red-500" />
    <span class="text-red-700 text-sm">
      {{ t("app.domain.delete") }}
    </span>
  </DropdownMenuItem>
  <Toaster />
</template>
