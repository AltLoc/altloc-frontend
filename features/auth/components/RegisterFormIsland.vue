<script setup lang="ts">
import { ref } from "vue";
import { type ZodIssue, z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useRegisterMutation } from "@/features/auth/service/authPassword";
import { Button } from "@/components/ui/button";
import { TextField, PasswordField } from "@/components/ui/input";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { useI18n } from "vue-i18n";
import { Field, useForm } from "vee-validate";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Id } from "@/components/ui/id";

const { t } = useI18n();

const RegisterBodySchema = z
  .object({
    username: z.string().min(1).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    password_confirmation: z.string().min(6).max(255),
    accept_terms: z.boolean(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: t("register.passwordNotMatch"),
    path: ["password_confirmation"],
  })
  .refine((data) => data.accept_terms, {
    message: t("register.needToAccept"),
    path: ["accept_terms"],
  });

const validationErrors = ref<ZodIssue[]>([]);
const successMessage = ref<string | null>(null);
const registerError = ref<string | null>(null);

const { handleSubmit, meta, setFieldError } = useForm({
  validationSchema: toTypedSchema(RegisterBodySchema),
  validateOnMount: false,
});

const { mutate: register, isPending } = useRegisterMutation();

const onSubmit = handleSubmit((values) => {
  register(values, {
    onError: (error) => {
      if (error instanceof FetchError && error.response.status === 409) {
        setFieldError("email", t("register.emailTaken"));
      }
    },
  });
});
</script>

<template>
  <form @submit="onSubmit" class="w-full">
    <div class="flex flex-col gap-y-3 flex-1">
      <TextField
        name="username"
        :label="t('register.name')"
        placeholder="John Doe"
        type="text"
        autocomplete="username"
        class="text-zinc-400"
      />
      <TextField
        name="email"
        :label="t('register.email')"
        placeholder="johndoe@example.com"
        type="email"
        autocomplete="email"
        class="text-zinc-400"
      />
      <PasswordField
        name="password"
        :label="t('register.password')"
        class="text-zinc-400"
      />
      <PasswordField
        name="password_confirmation"
        :label="t('register.confirmPassword')"
        class="text-zinc-400"
      />
      <Field
        as="div"
        class="flex flex-col"
        name="accept_terms"
        v-slot="{ field, errorMessage }"
      >
        <Id v-slot="{ id }">
          <div class="flex">
            <Checkbox
              :id="id"
              name="accept_terms"
              :model-value="field.value"
              @update:model-value="field['onUpdate:modelValue']"
              class="mr-1.5 mt-0.5"
            />
            <Label :for="id" class="text-sm font-medium">
              {{ t("register.acceptTerms") }}
              <a
                class="underline underline-offset-2 hover:text-indigo-600"
                href="#"
              >
                {{ t("layout.terms") }}
              </a>
              {{ t("register.and") }}
              <a
                class="underline underline-offset-2 hover:text-indigo-600"
                href="#"
              >
                {{ t("layout.privacyPolicy") }}
              </a>
            </Label>
          </div>
          <span v-if="errorMessage" class="mt-1.5 block text-xs text-red-600">
            {{ errorMessage }}
          </span>
        </Id>
      </Field>
    </div>

    <!-- <div>
      <span
        v-for="error in validationErrors"
        :key="error.message"
        class="text-red-500 block"
      >
        {{ error.message }}
      </span>
      <span v-if="registerError" class="text-red-500">{{ registerError }}</span>
    </div>

    <div v-if="successMessage" class="text-green-500 text-center mb-4">
      {{ successMessage }}
    </div> -->

    <Button
      type="submit"
      :disabled="isPending"
      class="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-blue-500 px-5 font-medium text-white transition-colors hover:bg-blue-600/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LoaderIcon
        class="mr-2 size-5 animate-spin stroke-[1.5] text-zinc-400"
        v-if="isPending"
      />
      {{ isPending ? t("register.creating") : t("register.register") }}
    </Button>
  </form>
</template>
