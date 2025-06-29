<script setup lang="ts">
import ProfileDropdownMenu from "@/layouts/ProfileDropdownMenu.vue";
import { getMeQueryOptions as originalGetMeQueryOptions } from "@/features/user/service/user.client";
import AstronautHelmetIcon from "@/assets/icons/astronaut-helmet.svg?component";
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

useHead({
  title: "App | Altloc",
  meta: [
    {
      name: "description",
      content:
        "AltLoc is a gamified habit tracker that helps you build identity-driven habits.",
    },
    {
      name: "theme-color",
      content: "#1d4ed8", // blue-700
    },
    {
      charset: "utf-8",
    },
  ],
});
</script>

<template>
  <header
    class="pointer-events-auto md:flex bg-blue-800 md:justify-center items-center p-3 px-6 md:px-10 hidden"
  >
    <div class="flex justify-between items-center flex-1">
      <a href="/user/quests" class="flex gap-2 items-center">
        <AstronautHelmetIcon class="size-6 stroke-[4] text-zinc-100" />
        <span class="font-semibold text-xl text-zinc-100">ALTLOC</span>
      </a>

      <ProfileDropdownMenu v-if="user" :user="user" class="md:hidden" />

      <span v-else-if="isLoading">
        <LoaderIcon
          class="mr-2 size-5 animate-spin stroke-[1.5] text-zinc-400"
        />
      </span>
      <span v-else-if="isError">Error: {{ error?.message }}</span>
    </div>
  </header>
  <div
    class="relative flex flex-1 flex-col bg-neutral-100 min-h-screen"
    style="padding-bottom: calc(4rem + env(safe-area-inset-bottom))"
  >
    <slot />
  </div>

  <MobileIslandMenu :user="user" v-if="user" />
</template>
