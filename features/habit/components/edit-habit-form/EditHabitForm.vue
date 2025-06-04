<script setup lang="ts">
import { z } from "zod";
import {
  useUpdateHabitMutation,
  fetchHabit,
} from "@/features/habit/service/index";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field } from "vee-validate";
import { useI18n } from "vue-i18n";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import type { Habit } from "@/features/habit/model";
import { TextArea } from "@/components/ui/text-area/";
import { TextField } from "@/components/ui/input/";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast/use-toast";

const { t } = useI18n();
const { toast } = useToast();

const props = defineProps<{ habit: Habit }>();

const HabitSchema = z.object({
  id: z.string().optional(),
  domainId: z.string(),
  name: z.string().min(6).max(32),
  runtime: z.number().min(1).max(18000), // max 5 hours
  dayPart: z.enum(["MORNING", "AFTERNOON", "EVENING", "NIGHT"]),
  targetNumberOfCompletions: z.number().min(1).max(10000),
});

const { handleSubmit, meta, setFieldError, resetForm } = useForm({
  validationSchema: toTypedSchema(HabitSchema),
  validateOnMount: false,
});

const queryClient = useQueryClient();
queryClient.setQueryData(fetchHabit(props.habit.id).queryKey, props.habit);
const { data: habit } = useQuery(fetchHabit(props.habit.id));

watch(
  habit,
  () => {
    if (!habit.value) return;
    resetForm({
      values: {
        id: habit.value.id,
        name: habit.value.name,
        runtime: habit.value.runtime,
        dayPart: habit.value.dayPart as
          | "MORNING"
          | "AFTERNOON"
          | "EVENING"
          | "NIGHT",
        targetNumberOfCompletions: habit.value.targetNumberOfCompletions,
        domainId: habit.value.domainId,
      },
    });
  },
  {
    immediate: true,
  }
);

const { mutate: updateHabit, isPending, error } = useUpdateHabitMutation();

const onSubmit = handleSubmit((values) => {
  const { ...rest } = values;
  updateHabit(
    {
      body: {
        id: props.habit.id,
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
  <form @submit.prevent="onSubmit" class="w-full">
    <div class="flex flex-col gap-3">
      <Field name="name" v-slot="{ field, errorMessage }">
        <TextArea
          v-bind="field"
          :label="t('app.habit.title')"
          :placeholder="t('app.habit.placeholder')"
          autocomplete="off"
        />
        <span v-if="errorMessage" class="text-xs font-medium text-red-600">
          {{ errorMessage }}
        </span>
      </Field>
      <Field name="targetNumberOfCompletions" v-slot="{ field, errorMessage }">
        <TextField
          v-bind="field"
          type="number"
          :label="t('app.habit.targetNumberOfCompletions')"
          placeholder="0"
          autocomplete="off"
        />
        <span v-if="errorMessage" class="text-xs font-medium text-red-600">
          {{ errorMessage }}
        </span>
      </Field>

      <Field
        as="div"
        class="flex flex-col gap-1.5"
        name="dayPart"
        v-slot="{ field, errorMessage }"
      >
        <Label for="dayPart">
          {{ t("app.habit.dayPart.title") }}
        </Label>
        <Select
          :name="field.name"
          :model-value="field.value"
          @update:model-value="(val) => field['onUpdate:modelValue']?.(val)"
        >
          <SelectTrigger :invalid="!!errorMessage">
            <SelectValue :placeholder="t('app.habit.dayPart.placeholder')" />
          </SelectTrigger>
          <SelectContent class="text-zinc-700">
            <SelectItem value="MORNING">
              {{ t("app.habit.dayPart.morning") }}
            </SelectItem>
            <SelectItem value="AFTERNOON">
              {{ t("app.habit.dayPart.afternoon") }}
            </SelectItem>
            <SelectItem value="EVENING">
              {{ t("app.habit.dayPart.evening") }}
            </SelectItem>
            <SelectItem value="NIGHT">
              {{ t("app.habit.dayPart.night") }}
            </SelectItem>
          </SelectContent>
        </Select>
        <span v-if="errorMessage" class="text-xs font-medium text-red-600">
          {{ errorMessage }}
        </span>
      </Field>

      <Field name="runtime" v-slot="{ value, errorMessage, handleChange }">
        <Label for="runtime">
          {{ t("app.habit.runTime") }}
        </Label>
        <Select
          :model-value="String(value)"
          @update:model-value="(val) => handleChange(Number(val))"
        >
          <SelectTrigger :invalid="!!errorMessage">
            <SelectValue :placeholder="t('app.habit.runFromTo')" />
          </SelectTrigger>
          <SelectContent class="text-zinc-700">
            <SelectItem :value="'15'">15 sec (for test)</SelectItem>
            <SelectItem :value="'30'">30 sec</SelectItem>
            <SelectItem :value="'60'">1 min</SelectItem>
            <SelectItem :value="'180'">3 min</SelectItem>
            <SelectItem :value="'300'">5 min</SelectItem>
            <SelectItem :value="'900'">15 min</SelectItem>
            <SelectItem :value="'1800'">30 min</SelectItem>
            <SelectItem :value="'3600'">1 hour</SelectItem>
            <SelectItem :value="'7200'">2 hours</SelectItem>
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
      {{ isPending ? t("app.habit.editing") : t("app.habit.edit") }}
    </Button>
    <Toaster />
  </form>
</template>
