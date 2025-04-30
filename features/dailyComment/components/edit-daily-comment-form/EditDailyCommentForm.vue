<script setup lang="ts">
import {
  useDailyCommentMutation,
  getDailyCommentQuery,
  DailyCommentBodySchema,
  moodOptions,
} from "@/features/dailyComment/service/index";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field } from "vee-validate";
import { useI18n } from "vue-i18n";
import { TextArea } from "@/components/ui/text-area/";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import type { DailyComment } from "@/features/dailyComment/model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const { t } = useI18n();

const props = defineProps<{ dailyComment: DailyComment }>();

const { handleSubmit, meta, setFieldError, resetForm } = useForm({
  validationSchema: toTypedSchema(DailyCommentBodySchema),
  validateOnMount: false,
});

const queryClient = useQueryClient();
queryClient.setQueryData(
  getDailyCommentQuery(props.dailyComment.id).queryKey,
  props.dailyComment
);

const { data: dailyComment } = useQuery(
  getDailyCommentQuery(props.dailyComment.id)
);

watch(
  dailyComment,
  () => {
    if (!dailyComment.value) return;
    resetForm({
      values: {
        content: dailyComment.value.content,
        mood: dailyComment.value.mood as
          | "VERY_BAD"
          | "BAD"
          | "NEUTRAL"
          | "GOOD"
          | "VERY_GOOD"
          | undefined,
      },
    });
  },
  { immediate: true }
);

const {
  mutate: updateDailyComment,
  isPending,
  error,
} = useDailyCommentMutation();

const onSubmit = handleSubmit((values) => {
  const { ...rest } = values;
  updateDailyComment(
    {
      body: {
        id: props.dailyComment.id,
        content: rest.content,
        mood: rest.mood,
      },
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          getDailyCommentQuery(props.dailyComment.id)
        );
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
          @update:modelValue="field.onChange"
        >
          <SelectTrigger :invalid="!!errorMessage">
            <SelectValue :placeholder="t('app.domain.mood_placeholder')" />
          </SelectTrigger>
          <SelectContent class="text-zinc-700">
            <SelectItem
              v-for="option in moodOptions"
              :key="option.score"
              :value="option.score.toString()"
            >
              {{ option.label }} {{ option.emoji }}
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
      class="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-blue-500 px-5 font-medium text-zinc-100 transition-colors hover:bg-blue-600/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LoaderIcon
        class="mr-2 size-5 animate-spin stroke-[1.5] text-white"
        v-if="isPending"
      />
      {{
        isPending ? t("app.dailyComment.editing") : t("app.dailyComment.edit")
      }}
    </Button>
  </form>
</template>
