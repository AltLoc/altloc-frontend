<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto max-w-4xl flex flex-col gap-4">
        <h2 class="text-2xl font-bold">Day quests</h2>
      </div>
    </section>
  </AppLayout>
</template>
