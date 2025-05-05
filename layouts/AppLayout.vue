<script setup lang="ts">
import ProfileDropdownMenu from "@/layouts/ProfileDropdownMenu.vue";
import { getMeQueryOptions as originalGetMeQueryOptions } from "@/features/user/service/user.client";
import AstronautIcon from "@/assets/icons/astronaut.svg?component";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { useQuery } from "@tanstack/vue-query";
import MobileIslandMenu from "@/layouts/MobileIslandMenu.vue";

const getMeQueryOptions = {
  ...originalGetMeQueryOptions,
  onError: (err: any) => {
    if (err.response?.status === 401) {
    }
  },
};

const { data: user, isLoading, isError, error } = useQuery(getMeQueryOptions);

definePageMeta({
  middleware: "auth",
});
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

      <ProfileDropdownMenu v-if="user" :user="user" class="md:hidden" />

      <span v-else-if="isLoading">
        <LoaderIcon
          class="mr-2 size-5 animate-spin stroke-[1.5] text-zinc-400"
        />
      </span>

      <span v-else-if="isError">Error: {{ error?.message }}</span>
    </div>
  </header>
  <!-- <div class="relative flex flex-1 flex-col bg-stone-50 h-screen"> -->
  <div class="relative flex flex-1 flex-col bg-stone-50 h-full pb-20">
    <slot />
  </div>
  <MobileIslandMenu />
</template>
