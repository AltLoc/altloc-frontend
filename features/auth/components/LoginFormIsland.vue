<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { useLoginMutation } from "@/features/auth/service/authPassword";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { TextField, PasswordField } from "@/components/ui/input";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

const { handleSubmit, meta, setFieldError } = useForm({
  validationSchema: toTypedSchema(LoginSchema),
  validateOnMount: false,
});

const { mutate: login, isPending, error } = useLoginMutation();

const onSubmit = handleSubmit((values) => {
  login(values, {
    onSuccess: () => {
      router.push("/user/dayQuest");
    },
    onError: async (error) => {
      if (error instanceof FetchError && error.response.status === 400) {
        setFieldError("password", await error.response.text());
      }
    },
  });
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <div class="flex flex-col gap-y-3">
      <TextField
        name="email"
        :label="t('login.email')"
        type="email"
        placeholder="johndoe@example.com"
        autocomplete="email"
      />

      <!-- <PasswordField name="password" label="Password" /> -->
      <span v-if="error" class="text-red-500">{{ error }}</span>
      <div class="flex flex-col gap-1.5">
        <PasswordField name="password" :label="t('login.password')" />
        <div class="w-full text-end text-xs font-medium">
          {{ t("recovery.forgotYourPassword") }}
          <a
            class="text-indigo-500 underline-offset-2 hover:underline"
            href="/auth/recover-password"
          >
            {{ t("recovery.recoverItHere") }}
          </a>
        </div>
      </div>
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
      {{ isPending ? t("login.loggingIn") : t("login.login") }}
    </Button>
  </form>
</template>
