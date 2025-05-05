<script setup lang="ts">
import { defineProps } from "vue";
import { utcTimestampToDate } from "@/utils/date";
import type { IdentityMatrix } from "@/features/identityMatrix/model";
import { Badge } from "@/components/ui/badge";
import DotsHorizontalIcon from "@/assets/icons/dots-horizontal.svg?component";
import PlusIcon from "@/assets/icons/plus.svg?component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IdentityMatrixDropDownMenu } from "@/features/identityMatrix/components/identity-matrix-dropdown-menu/";
import { getCDNImageURL } from "@/utils/images";

const props = defineProps<{
  identityMatrix: IdentityMatrix[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-5">
    <div
      v-for="matrix in props.identityMatrix"
      :key="matrix.id"
      class="bg-white shadow-sm rounded-xl p-4 flex flex-col gap-4 transition hover:shadow-md"
    >
      <!-- Banner -->
      <img
        :src="
          matrix.bannerKey
            ? getCDNImageURL(matrix.bannerKey)
            : '/images/placeholder_image.webp'
        "
        alt="Identity Matrix banner"
        class="aspect-video w-full rounded-lg object-cover"
      />

      <!-- Header + menu -->
      <div class="flex justify-between items-start">
        <router-link
          :to="`/user/matrix/${matrix.id}`"
          class="text-blue-600 hover:underline max-w-[80%]"
        >
          <h3 class="text-lg font-semibold leading-snug">
            {{ matrix.name }}
            <span class="ml-1 text-sm text-zinc-500">
              ({{ matrix.domains.length ?? 0 }})
            </span>
          </h3>
        </router-link>

        <DropdownMenu :modal="false">
          <DropdownMenuTrigger
            class="p-1 hover:bg-black/5 rounded data-[state=open]:bg-black/5"
            aria-label="Matrix options"
          >
            <DotsHorizontalIcon class="size-5 stroke-[1.75] text-zinc-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="min-w-40">
            <IdentityMatrixDropDownMenu :identityMatrix="matrix" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <!-- Domains list -->
      <div class="flex flex-wrap gap-2">
        <template v-if="matrix.domains.length">
          <router-link
            v-for="domain in matrix.domains"
            :key="domain.id"
            :to="`/user/domain/${domain.id}`"
          >
            <Badge variant="green" size="md">
              {{ domain.name }} ({{ domain.habits.length ?? 0 }})
            </Badge>
          </router-link>
        </template>

        <template v-else>
          <div class="flex flex-col items-start gap-2">
            <span class="text-sm text-zinc-500 italic"> No domains yet. </span>
            <router-link
              :to="`/user/matrix/${matrix.id}`"
              title="Create Domain"
              class="flex items-center text-sm text-blue-500 hover:underline"
            >
              <PlusIcon class="mr-1 size-4 stroke-[1.7]" />
              Add domain
            </router-link>
          </div>
        </template>
      </div>

      <!-- Creation date -->
      <span class="text-[10px] text-zinc-400">
        Created at: {{ utcTimestampToDate(matrix.createdAt) }}
      </span>
    </div>
  </div>
</template>
