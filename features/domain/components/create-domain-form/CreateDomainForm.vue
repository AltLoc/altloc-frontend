<script setup lang="ts">
import { z } from "zod";
import { useDomainMutation } from "@/features/domain/service/index";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { TextArea } from "@/components/ui/text-area/";

const { t } = useI18n();

const router = useRouter();

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
        router.push("/user/matrix");
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
        :label="t('app.domain.title')"
        type="text"
        placeholder="Domain sport"
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
      {{ isPending ? t("app.domain.creating") : t("app.domain.create") }}
    </Button>
  </form>
</template>
