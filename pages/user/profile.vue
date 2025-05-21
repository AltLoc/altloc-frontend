<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { getMeQueryOptions } from "@/features/user/service/user.client";
import { useQuery } from "@tanstack/vue-query";
import UserCard from "~/features/user/components/user-card/UserCard.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

definePageMeta({
  middleware: "auth",
});

const { data: user, isLoading, isError, error } = useQuery(getMeQueryOptions);
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="mx-auto max-w-xl flex flex-col gap-6">
        <h3 class="text-2xl font-bold">
          {{ t("app.cabinet.nav.profile") }}
        </h3>
        <div
          class="bg-white shadow-lg rounded-xl p-3 border border-zinc-100 transition-all duration-300 hover:shadow-xl"
        >
          <UserCard v-if="user" :user="user" />
          <div v-else-if="isLoading" class="text-center">
            <p>Loading...</p>
          </div>
          <div v-else-if="isError" class="text-center">
            <p>Error loading user data: {{ error?.message }}</p>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>
