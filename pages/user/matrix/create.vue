<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { CreateIdentityMatrixForm } from "@/features/identityMatrix/components/create-identity-matrix-form/";
import { BackButton } from "@/components/ui/button/";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="mx-auto max-w-3xl flex flex-col gap-6">
        <div class="flex items-center">
          <BackButton />
        </div>

        <div class="flex items-center gap-2">
          <SparklesIcon class="w-6 h-6 text-blue-500" />
          <h2 class="text-2xl font-bold text-zinc-800">
            Create Identity Matrix
          </h2>
        </div>

        <div
          class="bg-white shadow-lg rounded-xl p-6 border border-zinc-100 transition-all duration-300 hover:shadow-xl"
        >
          <CreateIdentityMatrixForm />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
