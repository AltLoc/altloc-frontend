<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { EditAccountForm } from "@/features/user/components/edit-account-form/";
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="mx-auto max-w-xl flex flex-col gap-6">
        <div
          class="bg-white shadow-lg rounded-xl p-3 border border-zinc-100 transition-all duration-300 hover:shadow-xl"
        >
          <EditAccountForm />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
