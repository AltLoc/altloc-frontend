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
import SettingsIcon from "@/assets/icons/settings.svg?component";
import LogoutIcon from "@/assets/icons/logout.svg?component";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import AstronautHelmetIcon from "@/assets/icons/astronaut-helmet.svg?component";
import { useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useLogoutMutation } from "@/features/auth/service/authPassword";
import { useI18n } from "vue-i18n";
import DotsHorizontalIcon from "@/assets/icons/dots-horizontal.svg?component";
import QuestionMartIcon from "@/assets/icons/question-mark.svg?component";

const { t } = useI18n();
// const props = defineProps<{ user: User }>();

const queryClient = useQueryClient();
// queryClient.setQueryData(getMeQueryOptions.queryKey, props.user);

const router = useRouter();
const { mutate: logout, isPending } = useLogoutMutation();

const logoutUser = () => {
  logout(undefined, {
    onSuccess: () => {
      router.push("/");
    },
  });
};

const normalize = (path: string) => (path.endsWith("/") ? path : path + "/");
const isActive = (path: string) => {
  return normalize(path) === normalize(path) ? "" : undefined;
};
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger
      class="p-1 hover:bg-blue-700 rounded-xl transition-colors justify-center data-[state=open]:bg-blue-700"
      aria-label="Matrix options"
    >
      <DotsHorizontalIcon class="size-6 stroke-[1.5] text-white" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-48">
      <!-- <DropdownMenuLabel>
        <div class="flex flex-col">
          <span class="text-zinc-700">{{ user.username }}</span>
          <span class="text-xs font-normal text-zinc-600">
            {{ user.email }}
          </span>
        </div>
      </DropdownMenuLabel> -->
      <DropdownMenuGroup>
        <DropdownMenuItem
          as="a"
          href="/user/profile"
          :data-active="isActive('/user/profile')"
          class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-100 data-[active]:hover:bg-indigo-50"
        >
          <QuestionMartIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
          <span class="text-zinc-800">
            {{ t("app.cabinet.nav.help") }}
          </span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          as="a"
          href="#"
          :data-active="isActive('#')"
          class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-100 data-[active]:hover:bg-indigo-50"
        >
          <AstronautHelmetIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
          <span class="text-zinc-800">
            {{ t("app.cabinet.nav.profile") }}
          </span>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <!-- <template v-if="user.isAdmin">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            as="a"
            href="/admin/users/"
            :data-active="isActive('/admin/users')"
            class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-100 data-[active]:hover:bg-indigo-50"
          >
            <PeopleIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
            <span class="text-zinc-800">Users</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </template> -->
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          as="a"
          href="/user/settings"
          :data-active="isActive('/user/settings')"
          class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-100 data-[active]:hover:bg-indigo-50"
        >
          <SettingsIcon class="mr-2 size-4 stroke-[1.5] text-zinc-800" />
          <span class="text-zinc-800">
            {{ t("app.cabinet.nav.settings") }}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          @select.prevent="logoutUser()"
          class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-red-50"
        >
          <LoaderIcon
            class="mr-2 size-4 animate-spin stroke-[1.5]"
            v-if="isPending"
          />
          <LogoutIcon v-else class="mr-2 size-4 stroke-[1.5] text-red-700" />
          <span class="text-red-700">
            {{ t("app.cabinet.nav.logout") }}
          </span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
