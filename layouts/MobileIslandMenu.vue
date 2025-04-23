<script setup lang="ts">
import GameControllerIcon from "@/assets/icons/game-controller.svg?component";
import CommentIcon from "@/assets/icons/comment.svg?component";
import GridOnSharpIcon from "@/assets/icons/grid-on-sharp.svg?component";
import { useLocalePath } from "#i18n";

const localePath = useLocalePath();

const route = useRoute();
</script>

<template>
  <footer
    class="pointer-events-auto flex md:justify-center items-center p-1.5 px-6 md:px-10 fixed bottom-0 w-full md:hidden bg-zinc-600 flex-1 bg-opacity-90 rounded-tl-3xl rounded-tr-3xl shadow-lg backdrop-blur-sm z-20"
  >
    <div class="flex items-center justify-around gap-3">
      <!-- Quests -->
      <NuxtLink
        :to="localePath('/user/quests')"
        :class="[
          ' flex-col items-center gap-0.5 block rounded-xl p-2 transition-colors ',
          route.path === localePath('/user/quests')
            ? 'text-white bg-blue-700/60'
            : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
        ]"
      >
        <GameControllerIcon class="size-7 stroke-[1.5]" />
      </NuxtLink>

      <!-- Matrix -->
      <NuxtLink
        :to="localePath('/user/matrix')"
        :class="[
          ' flex-col items-center gap-0.1 block rounded-xl p-2 transition-colors flex-1',
          route.path === localePath('/user/matrix')
            ? 'text-white bg-blue-700/60'
            : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
        ]"
      >
        <GridOnSharpIcon class="size-7 stroke-[1.5]" />
      </NuxtLink>

      <!-- Comments -->
      <NuxtLink
        :to="localePath('/user/daily-comment')"
        :class="[
          '  flex-col items-center gap-0.5 block rounded-xl p-2 transition-colors  justify-center',
          route.path === localePath('/user/daily-comment')
            ? 'text-white bg-blue-700/60'
            : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
        ]"
      >
        <CommentIcon class="size-7 stroke-[1.5]" />
      </NuxtLink>
    </div>
  </footer>
</template>
