<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { CreateDailyCommentForm } from "@/features/dailyComment/components/create-daily-comment-form";
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold flex items-center gap-2">
          Create Daily Comment
        </h2>
      </div>
      <CreateDailyCommentForm />
    </section>
  </AppLayout>
</template>
