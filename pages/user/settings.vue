<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { EditAccountForm } from "@/features/user/components/edit-account-form/";
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <!-- <div class="container mx-auto max-w-4xl flex-col gap-4">
        <EditAccountForm />
      </div> -->
      <div class="min-w-0 flex-1 pb-12 md:px-10 md:pt-6 lg:px-6">
        <div class="container rounded-lg md:border md:border-zinc-200">
          <EditAccountForm />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
