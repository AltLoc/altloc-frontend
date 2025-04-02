<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import IdentityMatrixForm from "~/features/identityMatrix/components/create-identity-matrix-form/CreateIdentityMatrixForm.vue";
import { BackButton } from "@/components/ui/button/";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex">
          <BackButton />
        </div>
        <h2 class="text-2xl font-bold">Create identity matrix</h2>
        <IdentityMatrixForm />
      </div>
    </section>
  </AppLayout>
</template>
