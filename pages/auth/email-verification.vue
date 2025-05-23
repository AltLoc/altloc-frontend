<!-- <script setup lang="ts">
import { onMounted, ref } from "vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { buttonVariant } from "@/components/ui/button";
import { useVerifyEmailMutation } from "@/features/auth/service/authPassword";
import { z } from "zod";

const params = ref<{ activation_token: string } | null>(null);
const { mutate: verifyEmail, isPending, error } = useVerifyEmailMutation();

onMounted(() => {
  const rawParams = Object.fromEntries(new URLSearchParams(location.search));

  try {
    params.value = z
      .object({
        activation_token: z.string(),
      })
      .parse(rawParams);

    if (params.value) {
      verifyEmail(params.value);
    }
  } catch (err) {
    console.error("Invalid query parameters", err);
  }
});

useSeoMeta({
  title: "Email Verification | Altloc",
  description: "Verify your email address",
});
</script>

<template>
  <AuthLayout>
    <div class="flex w-full max-w-lg flex-col gap-y-6">
      <div class="w-full">
        <h1 v-if="isPending" class="text-2xl font-bold tracking-[-0.015em]">
          Verifiying your email...
        </h1>
      </div>
      <div class="flex w-full flex-col items-center gap-y-2">
        <span v-if="isPending">Verifiying your email...</span>
        <span v-else-if="error"> {{ error.message }} </span>
        <div v-else class="flex-col gap-6">
          <h2 class="text-green-700 font-semibold">
            Email successfully verified
          </h2>
          <a
            :class="
              buttonVariant({
                size: 'md',
                variant: 'primary',
                class: 'shrink-0 text-zinc-100',
              })
            "
            href="/auth/login"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  </AuthLayout>
</template> -->

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { buttonVariant } from "@/components/ui/button";
import { useVerifyEmailMutation } from "@/features/auth/service/authPassword";
import CheckIcon from "@/assets/icons/check.svg?component";
import RejectIcon from "@/assets/icons/reject.svg?component";
import { useRouter } from "vue-router";

const router = useRouter();
const token = ref<string | null>(null);
const verificationError = ref<string | null>(null);

const {
  mutate: verifyEmail,
  isPending,
  error,
  isSuccess,
} = useVerifyEmailMutation();

onMounted(() => {
  const rawToken = new URLSearchParams(location.search).get("activation_token");
  if (rawToken) {
    token.value = rawToken;
    verifyEmail({ activation_token: rawToken });
  } else {
    verificationError.value = "Activation token is missing.";
  }
});

watch(isSuccess, (val) => {
  if (val) {
    setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
  }
});

useSeoMeta({
  title: "Email Verification | Altloc",
  description: "Verify your email address",
});
</script>

<template>
  <AuthLayout>
    <div class="flex w-full max-w-lg flex-col gap-y-6 mx-auto text-center">
      <div class="w-full">
        <h1 class="text-2xl font-bold tracking-[-0.015em]">
          Email Verification
        </h1>
      </div>

      <div class="flex w-full flex-col items-center gap-y-4">
        <div v-if="isPending" class="flex items-center gap-2 text-gray-600">
          <svg
            class="animate-spin h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span>Verifying your email, please wait...</span>
        </div>

        <div
          v-else-if="verificationError || error"
          class="text-red-600 flex flex-col items-center gap-3"
        >
          <RejectIcon class="size-10 stroke-[1.5]" />
          <span class="text-lg font-semibold">
            {{ verificationError || error?.message }}
          </span>
          <!-- <button
            :class="buttonVariant({ size: 'sm', variant: 'rejected' })"
            @click="() => token && verifyEmail({ activation_token: token })"
          >
            Try again
          </button> -->
        </div>

        <div v-else-if="isSuccess" class="flex flex-col items-center gap-3">
          <h2 class="text-green-700 font-semibold text-lg">
            ✅ Your email has been successfully verified!
          </h2>
          <CheckIcon class="size-10 stroke-[1.5]" />
          <span class="text-sm text-gray-500">Redirecting to login...</span>
          <a
            :class="
              buttonVariant({
                size: 'md',
                variant: 'primary',
                class: 'text-white',
              })
            "
            href="/auth/login"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
