<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import { DomainTable } from "@/features/domain/components/domain-table/";
import { fetchDomains } from "~/features/domain/service";

const { data: domain } = useQuery({
  ...fetchDomains,
  enabled: true,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto max-w-4xl flex flex-col gap-4">
        <h2>List of all domains</h2>
        <DomainTable v-if="domain" :domains="domain ?? []" />
      </div>
    </section>
  </AppLayout>
</template>
