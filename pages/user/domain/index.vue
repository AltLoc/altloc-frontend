<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import { DomainTable } from "@/features/domain/components/domain-table/";
import { fetchDomains } from "~/features/domain/service";
import PlusIcon from "@/assets/icons/plus.svg?component";

const { data: domain } = useQuery({
  ...fetchDomains,
  enabled: true,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Your domains</h2>
          <router-link
            to="/user/matrix/"
            class="flex items-center gap-3 bg-blue-100 hover:bg-blue-200 rounded-full p-2"
          >
            <PlusIcon
              class="size-7 stroke-[2] text-zinc-400 hover:text-zinc-700"
            />
          </router-link>
        </div>
        <DomainTable v-if="domain" :domains="domain ?? []" />
      </div>
    </section>
  </AppLayout>
</template>
