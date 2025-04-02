<script setup lang="ts">
import { z } from "zod";
import {
  useIdentityMarixMutation,
  getIdentityMatrixQuery,
  useUpdateIdentityMatrixMutation,
} from "@/features/identityMatrix/service/index";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { TextArea } from "@/components/ui/text-area/";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import type { IdentityMatrix } from "@/features/identityMatrix/model";

const { t } = useI18n();

const props = defineProps<{ identityMatrix: IdentityMatrix }>();

const IdentityMatrixSchema = z.object({
  name: z.string().min(6).max(32),
  description: z.string().min(6).max(255),
});

const { handleSubmit, meta, setFieldError, resetForm } = useForm({
  validationSchema: toTypedSchema(IdentityMatrixSchema),
  validateOnMount: false,
});

const queryClient = useQueryClient();
queryClient.setQueryData(
  getIdentityMatrixQuery(props.identityMatrix.id).queryKey,
  props.identityMatrix
);
const { data: identityMatrix } = useQuery(
  getIdentityMatrixQuery(props.identityMatrix.id)
);

watch(
  identityMatrix,
  () => {
    if (!identityMatrix.value) return;
    resetForm({
      values: {
        name: identityMatrix.value.name,
        description: identityMatrix.value.description,
      },
    });
  },
  {
    immediate: true,
  }
);

const {
  mutate: updateIdentityMatrix,
  isPending,
  error,
} = useUpdateIdentityMatrixMutation();

const onSubmit = handleSubmit((values) => {
  const { ...rest } = values;
  updateIdentityMatrix({
    body: {
      ...rest,
    },
  });
});
</script>

<template>
  <form v-if="identityMatrix" @submit.prevent="onSubmit" class="w-full">
    <div class="flex flex-col gap-4">
      <TextField
        name="name"
        :label="t('app.identityMatrix.title')"
        type="text"
        placeholder="I identify myself as a businessman."
        autocomplete="email"
      />

      <TextArea
        name="description"
        :label="t('app.identityMatrix.description')"
        type="text"
        placeholder="Short description of your identity matrix."
        autocomplete="off"
      />

      <span v-if="error" class="text-red-500">{{ error }}</span>
    </div>
    <Button
      type="submit"
      :disabled="isPending"
      class="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-blue-500 px-5 font-medium text-zinc-100 transition-colors hover:bg-blue-600/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LoaderIcon
        class="mr-2 size-5 animate-spin stroke-[1.5] text-white"
        v-if="isPending"
      />
      {{
        isPending
          ? t("app.identityMatrix.editing")
          : t("app.identityMatrix.edit")
      }}
    </Button>
  </form>
</template>
