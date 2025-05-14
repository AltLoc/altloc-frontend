<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import GameControllerIcon from "@/assets/icons/game-controller.svg?component";
import CommentIcon from "@/assets/icons/comment.svg?component";
// import AstronautHelmetIcon from "@/assets/icons/astronaut-helmet.svg?component";
import TargetIcon from "@/assets/icons/target.svg?component";
import CategoriesIcon from "@/assets/icons/categories.svg?component";
import ClipboardListIcon from "@/assets/icons/clipboard-list.svg?component";
import RankingIcon from "@/assets/icons/ranking.svg?component";
import SpaceStarIcon from "@/assets/icons/space-star.svg?component";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useSeoMeta({
  title: "AltLoc – habit builder for identity-based growth",
  description:
    "AltLoc is a gamified habit tracker inspired by Atomic Habits. Build identity, structure your goals, and grow through daily actions.",
  ogTitle: "AltLoc – habit tracker for personal growth",
  ogDescription:
    "Turn self-development into a game. Build your identity, gain levels, earn rewards, and track your progress with AltLoc.",
  ogImageUrl: "https://altloc.com/images/space-place.jpg",
  ogUrl: "https://altloc.com",
  ogType: "website",
  ogSiteName: "AltLoc",
  twitterCard: "summary_large_image",
  twitterTitle: "AltLoc – gamified habit tracker",
  twitterDescription:
    "AltLoc helps you create identity-driven habits with a structured, visual matrix. Grow daily, playfully.",
  twitterImage: "https://altloc.com/images/space-place.jpg",
});
</script>

<template>
  <MainLayout>
    <section class="relative mb-12 p-3 px-6 md:px-10">
      <div class="container flex flex-col gap-12 items-center">
        <img
          src="/images/banner-space.jpg"
          alt="Space place"
          class="absolute inset-0 size-full object-cover opacity-75 blur-sm bg-blue-200 radio aspect-video"
        />

        <div class="flex flex-col gap-6 items-center z-10">
          <h1
            class="py-10 text-3xl font-bold tracking-tight text-center text-zinc-200"
          >
            {{ t("landing.title") }}
          </h1>
          <div
            class="flex flex-col items-center gap-2 relative w-full max-w-max"
          >
            <span class="text-zinc-200 tracking-tight text-center">
              {{ t("landing.description") }}
            </span>

            <div class="mt-6 flex items-center">
              <a
                class="inline-flex items-center rounded-full border transition-colors bg-transparent text-white px-6 py-2 hover:bg-blue-600 mb-6"
                href="/auth/register"
              >
                {{ t("landing.getStarted") }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative group mt-6 p-12 px-6 md:px-10">
      <div class="container flex flex-col gap-12 items-center">
        <img
          src="/images/blue-grid.webp"
          alt="Gamification poster"
          class="absolute inset-0 size-full object-cover opacity-65 blur-sm bg-blue-200"
        />

        <div class="flex flex-col gap-6 items-center z-10">
          <h2 class="text-2xl font-semibold text-zinc-100 text-center">
            {{ t("landing.stepsTitle") }}
          </h2>
          <span class="text-zinc-200 text-center max-w-2xl">
            {{ t("landing.stepsDescription") }}
          </span>
        </div>

        <div
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 z-10"
        >
          <div
            class="bg-white rounded-lg p-4 gap-3 flex-col flex transition transform hover:scale-105"
          >
            <div class="flex gap-3 items-center">
              <h2 class="text-zinc-900 font-semibold">
                {{ t("landing.steps.step1.title") }}
              </h2>
              <TargetIcon class="size-5 stroke-[1.7] text-zinc-800" />
            </div>
            <span class="text-zinc-600 text-sm">
              {{ t("landing.steps.step1.description") }}
            </span>
          </div>

          <div
            class="bg-white rounded-lg p-4 gap-3 flex-col flex transition transform hover:scale-105"
          >
            <div class="flex gap-3 items-center">
              <h2 class="text-zinc-900 font-semibold">
                {{ t("landing.steps.step2.title") }}
              </h2>
              <CategoriesIcon class="size-5 stroke-[1.7] text-zinc-800" />
            </div>
            <span class="text-zinc-600 text-sm">
              {{ t("landing.steps.step2.description") }}
            </span>
          </div>

          <div
            class="bg-white rounded-lg p-4 gap-3 flex-col flex transition transform hover:scale-105"
          >
            <div class="flex gap-3 items-center">
              <h2 class="text-zinc-900 font-semibold">
                {{ t("landing.steps.step3.title") }}
              </h2>
              <ClipboardListIcon class="size-5 stroke-[1.7] text-zinc-800" />
            </div>
            <span class="text-zinc-600 text-sm">
              {{ t("landing.steps.step3.description") }}
            </span>
          </div>

          <div
            class="bg-white rounded-lg p-4 gap-3 flex-col flex transition transform hover:scale-105"
          >
            <div class="flex gap-3 items-center">
              <h2 class="text-zinc-900 font-semibold">
                {{ t("landing.steps.step4.title") }}
              </h2>
              <RankingIcon class="size-5 stroke-[1.7] text-zinc-800" />
            </div>
            <span class="text-zinc-600 text-sm">
              {{ t("landing.steps.step4.description") }}
            </span>
          </div>

          <div
            class="bg-white rounded-lg p-4 gap-3 flex-col flex transition transform hover:scale-105"
          >
            <div class="flex gap-3 items-center">
              <h2 class="text-zinc-900 font-semibold">
                {{ t("landing.steps.step5.title") }}
              </h2>
              <CommentIcon class="size-5 stroke-[1.7] text-zinc-800" />
            </div>
            <span class="text-zinc-600 text-sm">
              {{ t("landing.steps.step5.description") }}
            </span>
          </div>

          <div
            class="bg-white rounded-lg p-4 gap-3 flex-col flex transition transform hover:scale-105"
          >
            <div class="flex gap-3 items-center">
              <h2 class="text-zinc-900 font-semibold">
                {{ t("landing.steps.step5.title") }}
              </h2>
              <SpaceStarIcon class="size-5 stroke-[1.7] text-zinc-800" />
            </div>
            <span class="text-zinc-600 text-sm">
              {{ t("landing.steps.step6.description") }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>
