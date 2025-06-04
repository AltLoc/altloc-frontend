<script setup lang="ts">
import { z } from "zod";
import { useDomainMutation } from "@/features/domain/service/index";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { TextArea } from "@/components/ui/text-area/";
import { useToast } from "@/components/ui/toast/use-toast";

const { t } = useI18n();
const { toast } = useToast();

const props = defineProps<{
  identityMatrixId: string;
}>();

const DomainSchema = z.object({
  id: z.string().optional(),
  identityMatrixId: z.string(),
  name: z.string().min(6).max(32),
});

const { handleSubmit, setFieldError } = useForm({
  validationSchema: toTypedSchema(DomainSchema),
  initialValues: {
    identityMatrixId: props.identityMatrixId,
  },
  validateOnMount: false,
});

const { mutate: createDomain, isPending, error } = useDomainMutation();

const onSubmit = handleSubmit((values) => {
  createDomain(
    {
      body: {
        identityMatrixId: props.identityMatrixId,
        name: values.name,
      },
    },
    {
      onSuccess: () => {
        toast({
          title: t("common.successCreate"),
          variant: "success",
          duration: 2000,
        });
      },
      onError: (err) => {
        setFieldError("name", err.message);
      },
    }
  );
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <div class="flex flex-col gap-y-3">
      <TextArea
        name="name"
        :label="t('app.domain.description')"
        type="text"
        :placeholder="t('app.domain.namePlaceholder')"
        autocomplete="off"
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
      {{ isPending ? t("app.domain.creating") : t("app.domain.create") }}
    </Button>
    <Toaster />
  </form>
</template>
