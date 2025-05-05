<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { BackButton } from "@/components/ui/button/";
import { CreateHabitForm } from "@/features/habit/components/create-habit-form/";
import type { Domain } from "@/features/domain/model";

const props = defineProps<{
  domain: Domain;
}>();

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

        <CreateHabitForm :domain="domain" />
      </div>
    </section>
  </AppLayout>
</template>
