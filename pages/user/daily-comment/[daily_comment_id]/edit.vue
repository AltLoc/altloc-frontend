<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import PlusIcon from "@/assets/icons/plus.svg?component";

// const { data: identityMatrices } = useQuery({
//   ...fetchIdentityMatrices,
//   enabled: true,
// });
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold flex items-center gap-2">
          Daily Comment
        </h2>
        <router-link
          to="/user/matrix/create"
          class="flex items-center gap-3 bg-blue-100 hover:bg-blue-200 rounded-full p-2"
        >
          <PlusIcon
            class="size-7 stroke-[2] text-zinc-400 hover:text-zinc-700"
          />
        </router-link>
      </div>
    </section>
  </AppLayout>
</template>
