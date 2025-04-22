<script setup lang="ts">
import MatrixIcon from "@/assets/icons/matrix.svg?component";
import GameControllerIcon from "@/assets/icons/game-controller.svg?component";
import CommentIcon from "@/assets/icons/comment.svg?component";
import { useLocalePath } from "#i18n";

const localePath = useLocalePath();

const route = useRoute();
</script>

<template>
  <footer
    class="pointer-events-auto flex md:justify-center items-center p-1.5 px-3 md:px-10 fixed bottom-0 w-full md:hidden"
  >
    <div
      class="flex bg-zinc-700 justify-between items-center flex-1 p-3 rounded-lg bg-opacity-80 top-0 z-20"
    >
      <div class="flex items-center justify-around gap-3">
        <!-- Quests -->
        <NuxtLink
          :to="localePath('/user/quests')"
          :class="[
            ' flex-col items-center gap-0.5 block rounded-xl p-2 transition-colors ',
            route.path === localePath('/user/quests')
              ? 'text-white bg-blue-700/75'
              : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
          ]"
        >
          <GameControllerIcon class="size-8 stroke-[1.5]" />
        </NuxtLink>

        <!-- Matrix -->
        <NuxtLink
          :to="localePath('/user/matrix')"
          :class="[
            ' flex-col items-center gap-0.5 block rounded-xl p-2 transition-colors',
            route.path === localePath('/user/matrix')
              ? 'text-white bg-blue-700/75'
              : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
          ]"
        >
          <MatrixIcon class="size-8 stroke-[1.5]" />
        </NuxtLink>

        <!-- Comments -->
        <NuxtLink
          :to="localePath('/user/daily-comment')"
          :class="[
            '  flex-col items-center gap-0.5 block rounded-xl p-2 transition-colors',
            route.path === localePath('/user/daily-comment')
              ? 'text-white bg-blue-700/75'
              : 'text-zinc-300 hover:bg-blue-400 hover:text-white',
          ]"
        >
          <CommentIcon class="size-8 stroke-[1.5]" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
