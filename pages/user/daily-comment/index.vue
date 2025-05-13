<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import PlusIcon from "@/assets/icons/plus.svg?component";
import { DailyCommentGrid } from "@/features/dailyComment/components/daily-comment-grid";
import { useQuery } from "@tanstack/vue-query";
import { fetchDailyComments } from "@/features/dailyComment/service/index";
import NotFoundIcon from "@/assets/icons/not-found.svg?component";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { data: dailyCommets } = useQuery({
  ...fetchDailyComments,
  enabled: true,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold flex items-center gap-2">
            {{ $t("app.dailyComment.title") }}
          </h2>
          <NuxtLink
            to="/user/daily-comment/create"
            class="flex items-center gap-3 bg-blue-100 hover:bg-blue-200 rounded-full p-2"
          >
            <PlusIcon
              class="size-7 stroke-[2] text-zinc-400 hover:text-zinc-700"
            />
          </NuxtLink>
        </div>
        <DailyCommentGrid v-if="dailyCommets" :dailyComment="dailyCommets" />
      </div>
    </section>
  </AppLayout>
</template>
