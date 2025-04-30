<script setup lang="ts">
import AuthLayout from "@/layouts/AuthLayout.vue";
import GoogleIcon from "@/assets/icons/google.svg?component";
import LoginFormIsland from "@/features/auth/components/LoginFormIsland.vue";
</script>

<template>
  <AuthLayout>
    <div class="flex w-full max-w-lg flex-col gap-y-6">
      <div class="w-full">
        <h1 class="text-2xl font-bold tracking-[-0.015em]">
          {{ $t("login.title") }}
        </h1>
      </div>
      <div class="flex w-full flex-col items-center gap-y-2">
        <LoginFormIsland />
        <span class="text-sm text-zinc-500">or</span>
        <a
          type="button"
          href="/api/oauth2/authorization/google"
          class="flex h-11 w-full items-center justify-center rounded-full bg-blue-100 px-5 transition-colors hover:border-zinc-200 hover:bg-blue-200"
        >
          <GoogleIcon class="mr-2 size-4" />
          <span class="font-medium text-zinc-600">Login with Google</span>
        </a>
        <span class="mt-2 flex text-[13px] font-medium text-zinc-400">
          Don't have an account yet?&nbsp;<a
            class="text-blue-700 underline-offset-2 hover:underline"
            href="/auth/register"
            >Sign up</a
          >
        </span>
      </div>
    </div>
  </AuthLayout>
</template>
