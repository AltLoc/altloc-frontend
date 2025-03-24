<script setup lang="ts">
import ProfileDropdownMenu from "@/layouts/ProfileDropdownMenu.vue";
import { getMeQueryOptions as originalGetMeQueryOptions } from "@/features/user/service/user.client";
import AstronautIcon from "@/assets/icons/astronaut.svg?component";
import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

const router = useRouter();

const getMeQueryOptions = {
  ...originalGetMeQueryOptions,
  onError: (err: any) => {
    if (err.response?.status === 401) {
    }
  },
};

const { data: user, isLoading, isError, error } = useQuery(getMeQueryOptions);
</script>

<template>
  <header
    class="pointer-events-auto flex bg-blue-700 md:justify-center items-center p-3 px-6 md:px-10"
  >
    <div class="flex justify-between items-center flex-1">
      <div class="flex gap-2 items-center">
        <AstronautIcon class="size-10 stroke-[4] text-zinc-100" />
        <span class="font-semibold text-xl text-zinc-100">ALTLOC</span>
      </div>

      <!-- View username -->
      <span v-if="!isLoading && !isError">
        username: {{ user?.username }}
      </span>

      <!-- Loading and Error States -->
      <span v-else-if="isLoading">Loading...</span>
      <span v-else-if="isError">Error: {{ error?.message }}</span>

      <ProfileDropdownMenu v-if="user" :user="user" class="md:hidden" />
    </div>
  </header>
  <div class="relative flex flex-1 flex-col bg-stone-50 h-screen">
    <slot />
  </div>
</template>
