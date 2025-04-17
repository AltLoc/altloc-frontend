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
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 mt-5"
  >
    <div v-for="(identityMatrix, index) in props.identityMatrix" :key="index">
      <div
        class="bg-white shadow-md rounded-md p-4 flex-1 flex flex-col gap-6 w-auto"
      >
        <div class="flex-1 w-full">
          <img
            :src="
              identityMatrix?.bannerKey
                ? getCDNImageURL(identityMatrix.bannerKey)
                : '/images/placeholder_image.webp'
            "
            alt="Identity Matrix banner"
            class="aspect-video w-full rounded-xl"
          />
        </div>
        <div class="flex justify-between items-center">
          <a :href="`/user/matrix/${identityMatrix.id}`" class="text-blue-500">
            <h3 class="text-xl font-bold flex items-center gap-2">
              {{ identityMatrix.name }}

              <span class="text-sm text-zinc-500">
                ({{ identityMatrix.domains.length ?? 0 }})
              </span>
            </h3>
          </a>

          <DropdownMenu :modal="false">
            <DropdownMenuTrigger
              class="flex items-center p-1 hover:bg-black/5 rounded data-[state=open]:bg-black/5"
            >
              <DotsHorizontalIcon class="size-5 stroke-[1.75] text-zinc-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="min-w-40">
              <IdentityMatrixDropDownMenu :identityMatrix="identityMatrix" />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <!-- Domains display -->
        <div class="flex flex-wrap gap-2">
          <template v-if="identityMatrix.domains.length > 0">
            <div
              v-for="(domain, dIndex) in identityMatrix.domains"
              :key="dIndex"
            >
              <a :href="`/user/domain/${domain.id}`">
                <Badge variant="green" size="md">
                  {{ domain.name }} &nbsp; ({{ domain.habits.length ?? 0 }})
                </Badge>
              </a>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col items-center gap-2">
              <span class="text-sm text-gray-500 italic">
                No domains added yet.
              </span>
              <router-link
                :to="`/user/matrix/${identityMatrix.id}`"
                title="Add Domain"
                class="flex bg-white items-center p-1 hover:bg-black/5 rounded"
              >
                <span
                  class="text-zinc-500 flex gap-1.5 text-sm italic items-center"
                >
                  Create new domain
                  <PlusIcon class="mr-2 size-4 stroke-[1.7] text-zinc-500" />
                </span>
              </router-link>
            </div>
          </template>
        </div>

        <span class="text-[10px] text-gray-500">
          {{ utcTimestampToDate(identityMatrix.createdAt) }}
        </span>
      </div>
    </div>
  </div>
</template>
