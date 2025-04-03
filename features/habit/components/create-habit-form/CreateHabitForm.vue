<script setup lang="ts">
import { z } from "zod";
import { useHabitMutation } from "@/features/habit/service/index";
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

const { t } = useI18n();

const router = useRouter();

const props = defineProps<{
  domain: Domain;
}>();

const HabitSchema = z.object({
  id: z.string().optional(),
  domainId: z.string(),
  name: z.string().min(6).max(32),
  runtime: z.number().min(1).max(18000), // 5 hours
});

const { handleSubmit, setFieldError } = useForm({
  validationSchema: toTypedSchema(HabitSchema),
  initialValues: {
    domainId: props.domain.id,
  },
  validateOnMount: false,
});

const { mutate: createHabit, isPending, error } = useHabitMutation();

const onSubmit = handleSubmit((values) => {
  createHabit(
    {
      body: {
        domainId: props.domain.id,
        name: values.name,
        runtime: values.runtime,
      },
    },
    {
      // onSuccess: () => {
      //   router.push("/user/domain/" + props.domain.id);
      // },
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
        :label="t('app.habit.title')"
        type="text"
        placeholder="Run 5km every morning"
        autocomplete="off"
      />

      <Field
        as="div"
        class="flex flex-col gap-1.5"
        name="runtime"
        v-slot="{ field, errorMessage }"
      >
        <Label for="runtime">Run time</Label>
        <Select
          :name="field.name"
          :model-value="field.value"
          @update:model-value="
            (val) => field['onUpdate:modelValue']?.(Number(val))
          "
        >
          <SelectTrigger :invalid="!!errorMessage">
            <SelectValue placeholder="Rate from 5 min to 2 hours" />
          </SelectTrigger>
          <SelectContent class="text-zinc-700">
            <SelectItem :value="'60'">1 min (for test)</SelectItem>
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
      class="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-blue-500 px-5 font-medium text-zinc-100 transition-colors hover:bg-blue-600/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LoaderIcon
        class="mr-2 size-5 animate-spin stroke-[1.5] text-white"
        v-if="isPending"
      />
      {{ isPending ? t("app.habit.creating") : t("app.habit.create") }}
    </Button>
  </form>
</template>
