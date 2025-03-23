<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import IdentityMatrixForm from "@/features/identityMatrix/components/IdentityMatrixForm.vue";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto max-w-4xl flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Day quests</h1>

        <IdentityMatrixForm />
      </div>
    </section>
  </AppLayout>
</template>
