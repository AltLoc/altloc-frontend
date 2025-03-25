<script setup lang="ts">
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import ChevronLeftIcon from "@/assets/icons/arrowLeft.svg?component";

const router = useRouter();
const goBack = () => {
  router.back();
};
</script>

<template>
  <Button variant="tertiary" size="sm" @click="goBack">
    <ChevronLeftIcon class="size-4 stroke-[2] ml-1" />
  </Button>
</template>
