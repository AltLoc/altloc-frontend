<script lang="ts" setup>
import { defineProps } from "vue";
import type { User } from "@/features/user/model";
import { AvatarImage, AvatarRoot, AvatarFallback } from "radix-vue";
import DiamondIcon from "@/assets/icons/diamond.svg?component";
import StarIcon from "@/assets/icons/star.svg?component";
import StarBoldIcon from "@/assets/icons/starBold.svg?component";
import MailIcon from "@/assets/icons/mail.svg?component";

const baseLevelScore = 8;

defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="mb-12 flex flex-col gap-8 pb-12 md:flex-row md:gap-10">
    <div class="flex-1 w-full">
      <AvatarRoot class="block size-full shrink-0 select-none">
        <AvatarImage
          height="128"
          width="128"
          class="size-full object-cover rounded-xl aspect-video"
          :src="
            user?.avatarKey
              ? getCDNImageURL(user.avatarKey)
              : '/images/placeholder_image.webp'
          "
        />
        <AvatarFallback class="block size-full animate-pulse bg-zinc-200" />
      </AvatarRoot>
    </div>

    <div class="flex flex-1 flex-col gap-4">
      <h1
        class="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl md:leading-tight"
      >
        {{ user.username }}
      </h1>

      <div class="flex gap-6">
        <div class="flex gap-1.5 items-center">
          <MailIcon class="size-6 stroke-[1.7] text-zinc-700" title="Email" />
          <span class="text-zinc-700"> {{ user.email }}</span>
        </div>
        <div class="flex gap-1.5 items-center">
          <span v-if="user.emailVerified" class="text-sm text-green-500">
            Email verified
          </span>
          <span v-else class="text-sm text-red-500"> Email not verified </span>
        </div>
      </div>
      <div class="flex gap-1.5 items-center">
        <StarIcon class="size-6 stroke-[1.7] text-zinc-700" title="Level" />
        <span class="text-zinc-700"> {{ user.level }}</span>
      </div>
      <div class="flex gap-1.5 items-center">
        <StarBoldIcon class="size-6 stroke-[1.7] text-zinc-700" title="Score" />
        <span class="text-zinc-700">
          {{ user.score }} / {{ (user.level + 1) * baseLevelScore }}</span
        >
      </div>
      <div class="flex gap-1.5 items-center">
        <DiamondIcon
          class="size-6 stroke-[1.7] text-zinc-700"
          title="Currency"
        />
        <span class="text-zinc-700">{{ user?.currency }}</span>
      </div>
    </div>
  </div>
</template>
