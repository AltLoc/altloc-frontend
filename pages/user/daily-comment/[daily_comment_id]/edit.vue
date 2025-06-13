<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import PlusIcon from "@/assets/icons/plus.svg?component";
import { useQuery } from "@tanstack/vue-query";
import { getDailyCommentQuery } from "@/features/dailyComment/service";
import { EditDailyCommentForm } from "@/features/dailyComment/components/edit-daily-comment-form/";

const route = useRoute();

const dailyCommentId: string = Array.isArray(route.params.daily_comment_id)
  ? route.params.daily_comment_id[0]
  : route.params.daily_comment_id;

const { data: dailyComment } = useQuery({
  ...getDailyCommentQuery(dailyCommentId),
  enabled: !!dailyCommentId,
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="mx-auto max-w-xl flex flex-col gap-6">
        <h2 class="text-lg font-semibold flex items-center gap-2">
          {{ $t("app.dailyComment.edit") }}
        </h2>

        <div
          class="bg-white shadow-lg rounded-xl p-6 border border-zinc-100 transition-all duration-300 hover:shadow-xl"
        >
          <EditDailyCommentForm
            v-if="dailyComment"
            :dailyComment="dailyComment"
          />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
