<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { getMeQueryOptions } from "@/features/user/service/user.client";
import { useQuery } from "@tanstack/vue-query";
import IdentityMatrixForm from "@/features/identityMatrix/components/IdentityMatrixForm.vue";

definePageMeta({
  middleware: "auth",
});

// Запрашиваем данные пользователя
const { data: user, isLoading, isError, error } = useQuery(getMeQueryOptions);
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto max-w-4xl flex flex-col gap-4">
        <h1 class="text-2xl font-bold">User Profile</h1>

        <div class="flex flex-col gap-2">
          <template v-if="isLoading">
            <span>Loading...</span>
          </template>

          <template v-else-if="isError">
            <span>Error: {{ error?.message }}</span>
          </template>

          <template v-else-if="user">
            <span>Welcome, {{ user.username }}!</span>
            <span>Email: {{ user.email }}</span>
            <span>Role: {{ user.role }}</span>
          </template>
        </div>
        <IdentityMatrixForm />
      </div>
    </section>
  </AppLayout>
</template>
