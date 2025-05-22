<script lang="ts" setup>
import { defineProps } from "vue";
import type { User } from "@/features/user/model";
import { AvatarImage, AvatarRoot, AvatarFallback } from "radix-vue";
import DiamondIcon from "@/assets/icons/diamond.svg?component";
import StarIcon from "@/assets/icons/star.svg?component";
import StarBoldIcon from "@/assets/icons/starBold.svg?component";
import MailIcon from "@/assets/icons/mail.svg?component";
import { getCDNImageURL, PLACEHOLDER_AVATAR } from "@/utils/images";
import VerifiedIcon from "@/assets/icons/verified.svg?component";
import PedingApprovalIcon from "@/assets/icons/pending-approval.svg?component";

const baseLevelScore = 8;

defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
    <div class="justify-center items-center flex">
      <AvatarRoot
        class="flex justify-center items-center w-32 h-32 shrink-0 select-none rounded-3xl overflow-hidden bg-zinc-100"
      >
        <AvatarImage
          height="264"
          width="264"
          class="size-16 object-cover rounded-3xl"
          :src="
            user?.avatarKey
              ? getCDNImageURL(user.avatarKey)
              : PLACEHOLDER_AVATAR
          "
        />
        <AvatarFallback class="block size-full animate-pulse bg-zinc-200" />
      </AvatarRoot>
    </div>

    <div class="flex flex-col gap-4">
      <span
        class="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl md:leading-tight"
      >
        {{ user.username }}
      </span>

      <div class="flex gap-1.5 items-center">
        <div class="flex gap-1.5 items-center">
          <MailIcon class="size-6 stroke-[1.7] text-zinc-700" title="Email" />
          <span class="text-zinc-700"> {{ user.email }}</span>
        </div>
        <div class="flex gap-1.5 items-center">
          <span v-if="user.emailVerified" class="text-sm text-green-500">
            <VerifiedIcon
              class="size-5 stroke-[1.7] text-green-500"
              title="Email verified"
            />
          </span>
          <span v-else class="text-sm text-red-500">
            <PedingApprovalIcon
              class="size-6 stroke-[1.7] text-red-500"
              title="Email not verified"
            />
          </span>
        </div>
      </div>
      <div class="flex gap-3">
        <div class="flex gap-1.5 items-center">
          <StarIcon class="size-6 stroke-[1.7] text-zinc-700" title="Level" />
          <span class="text-zinc-700"> {{ user.level }}</span>
        </div>
        <span class="px-0.5" role="separator">|</span>
        <div class="flex gap-1.5 items-center">
          <StarBoldIcon
            class="size-6 stroke-[1.7] text-zinc-700"
            title="Score"
          />
          <span class="text-sm">Exp</span>
          <span class="text-zinc-700">
            {{ user.score }} / {{ (user.level + 1) * baseLevelScore }}</span
          >
        </div>
        <span class="px-0.5" role="separator">|</span>
        <div class="flex gap-1.5 items-center">
          <DiamondIcon
            class="size-6 stroke-[1.7] text-zinc-700"
            title="Currency"
          />
          <span class="text-zinc-700">{{ user?.currency }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
