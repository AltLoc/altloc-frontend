<script setup lang="ts">
import { z } from "zod";
import {
  useDomainMutation,
  getDomainQuery,
} from "@/features/domain/service/index";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import type { Domain } from "@/features/domain/model";
import { useToast } from "@/components/ui/toast/use-toast";

const { t } = useI18n();
const { toast } = useToast();

const props = defineProps<{ domain: Domain }>();

const DomainSchema = z.object({
  name: z.string().min(6).max(32),
});

const { handleSubmit, meta, setFieldError, resetForm } = useForm({
  validationSchema: toTypedSchema(DomainSchema),
  validateOnMount: false,
});

const queryClient = useQueryClient();
queryClient.setQueryData(
  getDomainQuery(props.domain.id).queryKey,
  props.domain
);
const { data: domain } = useQuery(getDomainQuery(props.domain.id));

watch(
  domain,
  () => {
    if (!domain.value) return;
    resetForm({
      values: {
        name: domain.value.name,
      },
    });
  },
  {
    immediate: true,
  }
);

const { mutate: updateDomain, isPending, error } = useDomainMutation();

const onSubmit = handleSubmit((values) => {
  const { ...rest } = values;
  updateDomain(
    {
      body: {
        id: props.domain.id,
        identityMatrixId: props.domain.identityMatrixId,
        ...rest,
      },
    },
    {
      onSuccess: () => {
        toast({
          title: t("common.successUpdate"),
          variant: "success",
          duration: 2000,
        });
      },
    }
  );
});
</script>

<template>
  <form v-if="domain" @submit.prevent="onSubmit" class="w-full">
    <div class="flex flex-col gap-4">
      <TextField
        name="name"
        :label="t('app.domain.title')"
        types="text"
        :placeholder="t('app.domain.namePlaceholder')"
        autocomplete="email"
      />

      <span v-if="error" class="text-red-500">{{ error }}</span>
    </div>
    <Button
      type="submit"
      :disabled="isPending"
      variant="primary"
      class="mt-6 flex h-11 w-full items-center justify-center rounded-full px-5 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LoaderIcon
        class="mr-2 size-5 animate-spin stroke-[1.5] text-white"
        v-if="isPending"
      />
      {{ isPending ? t("app.domain.editing") : t("app.domain.edit") }}
    </Button>
    <Toaster />
  </form>
</template>
