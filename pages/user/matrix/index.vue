<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useQuery } from "@tanstack/vue-query";
import {
  fetchIdentityMatrices,
  useDeleteIdentityMatrixMutation,
} from "@/features/identityMatrix/service/index";

const { data: identityMatrices } = useQuery({
  ...fetchIdentityMatrices,
  enabled: true,
});

const { mutate: deleteIdentityMatrix } = useDeleteIdentityMatrixMutation();
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto max-w-4xl flex flex-col gap-4">
        <h2>Identity matrix</h2>
        <div
          class="flex flex-col gap-6 bg-blue-200 p-5 rounded-xl flex-1"
          v-for="identityMatrix in identityMatrices"
          :key="identityMatrix.id"
        >
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3 justify-between">
              <div class="flex gap-3 items-center justify-center">
                <span class="size-3 rounded-full bg-blue-500"></span>
                <a
                  :href="`/user/matrix/${identityMatrix.id}`"
                  class="text-blue-500"
                >
                  <span class="text-zinc-700 font-semibold">
                    {{ identityMatrix.name }}
                  </span>
                </a>
                <span
                  @click="
                    () => {
                      deleteIdentityMatrix(identityMatrix.id);
                    }
                  "
                  class="text-zinc-500"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>
