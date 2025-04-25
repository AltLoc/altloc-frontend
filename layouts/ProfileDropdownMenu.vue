<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import GameControllerIcon from "@/assets/icons/game-controller.svg?component";
import CommentIcon from "@/assets/icons/comment.svg?component";
import SettingsIcon from "@/assets/icons/settings.svg?component";
import LogoutIcon from "@/assets/icons/logout.svg?component";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import PeopleIcon from "@/assets/icons/people.svg?component";
import MatrixIcon from "@/assets/icons/matrix.svg?component";
import AstronautHelmetIcon from "@/assets/icons/astronaut-helmet.svg?component";
import { getMeQueryOptions } from "@/features/user/service/user.client";
import { computed } from "vue";
import type { User } from "@/models";
import { useQueryClient } from "@tanstack/vue-query";
import { getCDNImageURL } from "@/utils/images";

import { useRouter } from "vue-router";
import { useLogoutMutation } from "@/features/auth/service/authPassword";

const props = defineProps<{ user: User }>();

const queryClient = useQueryClient();
queryClient.setQueryData(getMeQueryOptions.queryKey, props.user);

const router = useRouter();
const { mutate: logout, isPending } = useLogoutMutation();

const logoutUser = () => {
  logout(undefined, {
    onSuccess: () => {
      router.push("/");
    },
  });
};

// const avatar = computed(() => {
//   return props.user.avatarKey
//     ? getCDNImageURL(props.user.avatarKey)
//     : "/images/placeholder_image.webp";
// });
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger class="flex items-center gap-2.5">
      <span class="text-sm font-semibold text-zinc-100">
        {{ user.username }}
      </span>
      <img
        alt="User avatar"
        :src="
          user?.avatarKey
            ? getCDNImageURL(user.avatarKey)
            : '/images/placeholder_image.webp'
        "
        class="size-10 shrink-0 rounded-full border border-black/10 transition-colors group-hover:border-black/20"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-48">
      <DropdownMenuLabel>
        <div class="flex flex-col">
          <span class="text-zinc-700">{{ user.username }}</span>
          <span class="text-xs font-normal text-zinc-600">
            {{ user.email }}
          </span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem as="a" href="/user/profile">
          <AstronautHelmetIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
          <span class="text-zinc-800">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem as="a" href="/user/quests">
          <GameControllerIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
          <span class="text-zinc-800">Quests</span>
        </DropdownMenuItem>
        <DropdownMenuItem as="a" href="/user/daily-comment">
          <CommentIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
          <span class="text-zinc-800">Comments</span>
        </DropdownMenuItem>
        <DropdownMenuItem as="a" href="/user/matrix">
          <MatrixIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
          <span class="text-zinc-800">Matrix & Domain</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <template v-if="user.isAdmin">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem as="a" href="/admin/users/">
            <PeopleIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
            <span class="text-zinc-800">Users</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </template>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem as="a" href="/user/settings">
          <SettingsIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
          <span class="text-zinc-800">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem @select.prevent="logoutUser()">
          <LoaderIcon
            class="mr-2 size-4 animate-spin stroke-[1.5]"
            v-if="isPending"
          />
          <LogoutIcon v-else class="mr-2 size-4 stroke-[1.5] text-red-700" />
          <span class="text-red-700">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
