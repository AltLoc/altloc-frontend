<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { EditAccountForm } from "@/features/user/components/edit-account-form/";
import LanguageDropdown from "@/layouts/LanguageDropdown.vue";
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto max-w-4xl flex-col gap-4">
        <h2>Settings</h2>
        <EditAccountForm />
        <LanguageDropdown />
      </div>
    </section>
  </AppLayout>
</template>
