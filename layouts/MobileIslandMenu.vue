<script setup lang="ts">
import GameControllerIcon from "@/assets/icons/game-controller.svg?component";
import CommentIcon from "@/assets/icons/comment.svg?component";
import GridOnSharpIcon from "@/assets/icons/grid-on-sharp.svg?component";
import SettingsIcon from "@/assets/icons/settings.svg?component";
import AstronautHelmetIcon from "@/assets/icons/astronaut-helmet.svg?component";
import { useLocalePath } from "#i18n";
import { useI18n } from "vue-i18n";
import MobileDropdownMenu from "@/layouts/MobileDropdownMenu.vue";

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
</script>

<template>
  <footer
    class="pointer-events-auto flex md:justify-center items-center p-1.5 px-6 md:px-10 fixed bottom-0 w-full md:hidden bg-blue-950 flex-1 bg-opacity-90 rounded-tl-3xl rounded-tr-3xl shadow-lg backdrop-blur-sm z-20"
  >
    <div class="flex justify-between w-full">
      <div class="flex items-center justify-around gap-3">
        <!-- Quests -->
        <div class="flex flex-col items-center">
          <NuxtLink
            :to="localePath('/user/quests')"
            :class="[
              ' flex-col items-center gap-0.5 block rounded-xl p-1.5 transition-colors ',
              route.path === localePath('/user/quests')
                ? 'text-white bg-blue-700'
                : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
            ]"
          >
            <GameControllerIcon class="size-6 stroke-[1.5]" />
          </NuxtLink>
          <span class="text-[10px] text-zinc-200">
            {{ t("app.cabinet.nav.quests") }}
          </span>
        </div>

        <!-- Matrix -->
        <div class="flex flex-col items-center">
          <NuxtLink
            :to="localePath('/user/matrix')"
            :class="[
              ' flex-col items-center gap-0.5 block rounded-xl p-1.5 transition-colors flex-1',
              route.path === localePath('/user/matrix')
                ? 'text-white bg-blue-700'
                : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
            ]"
          >
            <GridOnSharpIcon class="size-6 stroke-[1.5]" />
          </NuxtLink>
          <span class="text-[10px] text-zinc-200">
            {{ t("app.cabinet.nav.matrices") }}
          </span>
        </div>

        <!-- Comments -->
        <div class="flex flex-col items-center">
          <NuxtLink
            :to="localePath('/user/daily-comment')"
            :class="[
              '  flex-col items-center gap-0.5 block rounded-xl p-1.5 transition-colors  justify-center',
              route.path === localePath('/user/daily-comment')
                ? 'text-white bg-blue-700'
                : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
            ]"
          >
            <CommentIcon class="size-6 stroke-[1.5]" />
          </NuxtLink>
          <span class="text-[10px] text-zinc-200">
            {{ t("app.cabinet.nav.dailyComment") }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-around gap-3">
        <!-- Settings -->
        <!-- <div class="flex flex-col items-center">
          <NuxtLink
            :to="localePath('/user/settings')"
            :class="[
              ' flex-col items-center gap-0.5 block rounded-xl p-1.5 transition-colors',
              route.path === localePath('/user/profile')
                ? 'text-white bg-blue-700'
                : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
            ]"
          >
            <SettingsIcon class="size-6 stroke-[1.5]" />
          </NuxtLink>
          <span class="text-[10px] text-zinc-200">
            {{ t("app.cabinet.nav.settings") }}
          </span>
        </div> -->
        <!-- Profile -->
        <!-- <div class="flex flex-col items-center">
          <NuxtLink
            :to="localePath('/user/profile')"
            :class="[
              ' flex-col items-center gap-0.5 block rounded-xl p-1.5 transition-colors',
              route.path === localePath('/user/profile')
                ? 'text-white bg-blue-700'
                : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
            ]"
          >
            <AstronautHelmetIcon class="size-6 stroke-[1.5]" />
          </NuxtLink>
          <span class="text-[10px] text-zinc-200">
            {{ t("app.cabinet.nav.profile") }}
          </span>
        </div> -->
        <!-- Home -->
        <div class="flex flex-col items-center">
          <MobileDropdownMenu />
        </div>
      </div>
    </div>
  </footer>
</template>
