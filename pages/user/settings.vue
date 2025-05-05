<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { EditAccountForm } from "@/features/user/components/edit-account-form/";
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto max-w-4xl flex-col gap-4">
        <EditAccountForm />
      </div>
    </section>
  </AppLayout>
</template>
