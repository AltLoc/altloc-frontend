<script lang="ts" setup>
import DiamondIcon from "@/assets/icons/diamond.svg?component";
import StarIcon from "@/assets/icons/star.svg?component";
import StarBoldIcon from "@/assets/icons/starBold.svg?component";
import { Progress } from "@/components/ui/progress";
import { computed } from "vue";
import type { User } from "@/features/user/model";

const props = defineProps<{
  user: User;
}>();

const baseLevelScore = 8;

const nextLevelScore = computed(() => {
  if (!props.user) return 0;
  return (props.user.level + 1) * baseLevelScore;
});

const progress = computed(() => {
  if (!props.user) return 0;
  const currentScore = props.user.score;
  const requiredScore = nextLevelScore.value;
  return requiredScore ? (currentScore / requiredScore) * 100 : 0;
});
</script>
<template>
  <div class="flex flex-col gap-3 flex-1">
    <div class="flex gap-3 justify-between">
      <div
        class="flex gap-1.5 bg-blue-100 p-2 rounded-xl items-center"
        title="Experience"
      >
        <StarBoldIcon class="size-5 stroke-[1.7] text-zinc-700 text-sm" />
        <span class="text-zinc-700 text-xs" v-if="user">
          {{ user.score }}
          / {{ (user.level + 1) * baseLevelScore }}
        </span>
      </div>
      <div class="flex gap-3">
        <div
          class="flex gap-1 bg-blue-100 p-2 rounded-xl items-center"
          title="Level"
        >
          <StarIcon class="size-5 stroke-[1.7] text-zinc-700 text-sm" />
          <span class="text-zinc-700" v-if="user"> {{ user.level }} lvl </span>
        </div>
        <div
          class="flex gap-1 bg-blue-100 p-2 rounded-xl items-center"
          title="Score"
        >
          <DiamondIcon class="size-6 stroke-[1.7] text-zinc-700" />
          <span class="text-zinc-700">{{ user?.currency }}</span>
        </div>
      </div>
    </div>
    <Progress v-model="progress" class="flex" />
  </div>
</template>
