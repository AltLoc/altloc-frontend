<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { CreateDailyCommentForm } from "@/features/dailyComment/components/create-daily-comment-form";
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="mx-auto max-w-3xl flex flex-col gap-6">
        <h2 class="text-lg font-semibold flex items-center gap-2">
          {{ $t("app.dailyComment.create") }}
        </h2>

        <div
          class="bg-white shadow-lg rounded-xl p-6 border border-zinc-100 transition-all duration-300 hover:shadow-xl"
        >
          <CreateDailyCommentForm />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
