<script setup lang="ts">
import { z } from "zod";
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
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";
import { Toaster } from "@/components/ui/toast";

const { toast } = useToast();
const router = useRouter();
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

const { handleSubmit, meta, setFieldError } = useForm({
  validationSchema: toTypedSchema(RegisterBodySchema),
  validateOnMount: false,
});

const { mutate: register, isPending } = useRegisterMutation();

const onSubmit = handleSubmit((values) => {
  register(values, {
    onError: async (error: any) => {
      if (error instanceof FetchError) {
        let detail = error.problemDetails?.description;
        if (!detail) {
          try {
            const json = await error.response.json();
            detail = json?.detail ?? json?.message ?? error.response.statusText;
          } catch {
            detail = error.response.statusText;
          }
        }
        setFieldError("username", detail || t("errors.unknownError"));
      } else {
        setFieldError("username", error.message);
      }
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push("/auth/login");
      }, 15000);
      toast({
        title: t("register.success.title"),
        description: t("register.success.description", {
          email: values.email,
        }),
        variant: "default",
      });
    },
  });
});
</script>

<template>
  <form @submit="onSubmit" class="w-full">
    <div class="flex flex-col gap-2.5 flex-1">
      <Field name="username" v-slot="{ field, errorMessage }">
        <TextField
          v-bind="field"
          :label="t('register.name')"
          placeholder="John Doe"
          autocomplete="username"
          class="text-zinc-400"
          :error-message="errorMessage"
        />
      </Field>

      <Field name="email" v-slot="{ field, errorMessage }">
        <TextField
          v-bind="field"
          :label="t('register.email')"
          placeholder="johndoe@example.com"
          autocomplete="email"
          class="text-zinc-400"
          :error-message="errorMessage"
        />
      </Field>

      <Field name="password" v-slot="{ field, errorMessage }">
        <PasswordField
          v-bind="field"
          :label="t('register.password')"
          class="text-zinc-400"
          :error-message="errorMessage"
        />
      </Field>

      <Field name="password_confirmation" v-slot="{ field, errorMessage }">
        <PasswordField
          v-bind="field"
          :label="t('register.confirmPassword')"
          class="text-zinc-400"
          :error-message="errorMessage"
        />
      </Field>

      <Field name="accept_terms" v-slot="{ field, errorMessage }">
        <Id v-slot="{ id }">
          <div class="flex gap-2 items-center">
            <Checkbox
              :id="id"
              :model-value="field.value"
              @update:model-value="field['onUpdate:modelValue']"
              class="mr-1.5 mt-0.5"
            />
            <Label :for="id" class="text-sm font-medium">
              {{ t("register.acceptTerms") }}
              <a
                class="underline underline-offset-2 hover:text-indigo-600"
                href="/legal/terms-of-service"
              >
                {{ t("layout.terms") }}
              </a>
              {{ t("register.and") }}
              <a
                class="underline underline-offset-2 hover:text-indigo-600"
                href="/legal/privacy-policy"
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

    <!-- <div v-if="serverError" class="text-red-500 mt-2">{{ serverError }}</div> -->

    <Button
      type="submit"
      :disabled="isPending"
      variant="primary"
      class="mt-6 flex h-11 w-full items-center justify-center rounded-full px-5 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LoaderIcon
        class="mr-2 size-5 animate-spin stroke-[1.5] text-zinc-400"
        v-if="isPending"
      />
      {{ isPending ? t("register.creating") : t("register.register") }}
    </Button>
    <Toaster />
  </form>
</template>
