<script setup lang="ts">
import { z } from "zod";
import { useCreateHabitMutation } from "@/features/habit/service/index";
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
import type { Domain } from "@/features/domain/model";
import { useToast } from "@/components/ui/toast/use-toast";

const { t } = useI18n();
const { toast } = useToast();

const router = useRouter();

const props = defineProps<{
  domain: Domain;
}>();

const HabitSchema = z.object({
  id: z.string().optional(),
  domainId: z.string(),
  name: z.string().min(6).max(32),
  runtime: z.number().min(1).max(18000), // max 5 hours
  dayPart: z.enum(["MORNING", "AFTERNOON", "EVENING", "NIGHT"]),
  targetNumberOfCompletions: z.number().min(1).max(10000),
});

const { handleSubmit, setFieldError } = useForm({
  validationSchema: toTypedSchema(HabitSchema),
  initialValues: {
    domainId: props.domain.id,
  },
  validateOnMount: false,
});

const { mutate: createHabit, isPending, error } = useCreateHabitMutation();

const onSubmit = handleSubmit((values) => {
  createHabit(
    {
      body: {
        domainId: props.domain.id,
        name: values.name,
        runtime: values.runtime,
        dayPart: values.dayPart,
        targetNumberOfCompletions: values.targetNumberOfCompletions,
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
    <div class="flex flex-col gap-3">
      <TextArea
        name="name"
        :label="t('app.habit.title')"
        type="text"
        :placeholder="t('app.habit.placeholder')"
        autocomplete="off"
      />
      <!-- <Label for="targetNumberOfCompletions">
        {{ t("app.habit.targetNumberOfCompletions") }}
      </Label> -->
      <TextField
        name="targetNumberOfCompletions"
        :label="t('app.habit.targetNumberOfCompletions')"
        type="number"
        placeholder="0"
        autocomplete="off"
      />

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

      <Field
        as="div"
        class="flex flex-col gap-1.5"
        name="runtime"
        v-slot="{ field, errorMessage }"
      >
        <Label for="runtime">
          {{ t("app.habit.runTime") }}
        </Label>
        <Select
          :name="field.name"
          :model-value="field.value"
          @update:model-value="
            (val) => field['onUpdate:modelValue']?.(Number(val))
          "
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
      {{ isPending ? t("app.habit.creating") : t("app.habit.create") }}
    </Button>
    <Toaster />
  </form>
</template>
