<script setup lang="ts">
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
</template>
