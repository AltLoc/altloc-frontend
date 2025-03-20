<script setup lang="ts">
import { z } from "zod";
import { useIdentityMarixMutation } from "@/features/identityMatrix/service/index";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { TextArea } from "@/components/ui/text-area/";

const router = useRouter();
const { t } = useI18n();

const IdentityMatrixSchema = z.object({
  name: z.string().min(6).max(255),
});

const { handleSubmit, meta, setFieldError } = useForm({
  validationSchema: toTypedSchema(IdentityMatrixSchema),
  validateOnMount: false,
});

const {
  mutate: createIdentityMatrix,
  isPending,
  error,
} = useIdentityMarixMutation();

const onSubmit = handleSubmit((values) => {
  createIdentityMatrix(values, {
    // onSuccess: () => {
    //   router.push("/user/dayQuest");
    // },
    // onError: async (error) => {
    //   if (error instanceof FetchError && error.response.status === 400) {
    //     setFieldError("password", await error.response.text());
    //   }
    // },
  });
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <div class="flex flex-col gap-y-3">
      <TextArea
        name="name"
        :label="t('app.identityMatrix.title')"
        type="text"
        placeholder="I identify myself as a businessman."
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
          ? t("app.identityMatrix.creating")
          : t("app.identityMatrix.create")
      }}
    </Button>
  </form>
</template>
