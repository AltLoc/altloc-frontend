<script setup lang="ts">
import {
  useDailyCommentMutation,
  DailyCommentBodySchema,
} from "@/features/dailyComment/service/index";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field } from "vee-validate";
import { useI18n } from "vue-i18n";
import { TextArea } from "@/components/ui/text-area/";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const { t } = useI18n();

const router = useRouter();

const EMOTIONAL_STATE = {
  VERY_BAD: "VERY_BAD",
  BAD: "BAD",
  NEUTRAL: "NEUTRAL",
  GOOD: "GOOD",
  VERY_GOOD: "VERY_GOOD",
} as const;

type Mood =
  | keyof typeof EMOTIONAL_STATE
  | (typeof EMOTIONAL_STATE)[keyof typeof EMOTIONAL_STATE];

const { handleSubmit, setFieldError } = useForm({
  validationSchema: toTypedSchema(DailyCommentBodySchema),
  // initialValues: {
  //   identityMatrixId: props.identityMatrixId,
  // },
  validateOnMount: false,
});

const {
  mutate: createDailyComment,
  isPending,
  error,
} = useDailyCommentMutation();

const onSubmit = handleSubmit((values) => {
  createDailyComment(
    {
      body: {
        content: values.content,
        mood: values.mood,
      },
    },
    {
      onSuccess: () => {
        router.push("/user/daily-comment");
      },
      onError: (err) => {
        setFieldError("content", err.message);
      },
    }
  );
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <div class="flex flex-col gap-y-3">
      <TextArea
        name="content"
        :label="t('app.dailyComment.title')"
        type="text"
        placeholder=""
        autocomplete="off"
      />

      <Field
        as="div"
        class="flex flex-col gap-1.5"
        name="mood"
        v-slot="{ field, errorMessage }"
      >
        <Label for="mood">{{ t("app.dailyComment.mood") }}</Label>
        <Select
          :name="field.name"
          :model-value="field.value"
          @update:model-value="field['onUpdate:modelValue']"
        >
          <SelectTrigger :invalid="!!errorMessage">
            <SelectValue :placeholder="t('app.dailyComment.rateFromTo')" />
          </SelectTrigger>
          <SelectContent class="text-zinc-700">
            <SelectItem :value="EMOTIONAL_STATE.BAD">
              {{ t("app.dailyComment.moodName.bad") }}
            </SelectItem>
            <SelectItem :value="EMOTIONAL_STATE.GOOD">
              {{ t("app.dailyComment.moodName.good") }}
            </SelectItem>
            <SelectItem :value="EMOTIONAL_STATE.NEUTRAL">
              {{ t("app.dailyComment.moodName.neutral") }}
            </SelectItem>
            <SelectItem :value="EMOTIONAL_STATE.VERY_BAD">
              {{ t("app.dailyComment.moodName.veryBad") }}
            </SelectItem>
            <SelectItem :value="EMOTIONAL_STATE.VERY_GOOD">
              {{ t("app.dailyComment.moodName.veryGood") }}
            </SelectItem>
          </SelectContent>
        </Select>
        <span v-if="errorMessage" class="text-xs font-medium text-red-600">
          {{ errorMessage }}
        </span>
      </Field>

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
      {{
        isPending
          ? t("app.dailyComment.creating")
          : t("app.dailyComment.create")
      }}
    </Button>
  </form>
</template>
