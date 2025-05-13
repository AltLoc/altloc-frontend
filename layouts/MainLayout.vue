<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import TelegramIcon from "@/assets/icons/telegram.svg?component";
import InstagramIcon from "@/assets/icons/instagram.svg?component";
import FacebookIcon from "@/assets/icons/facebook.svg?component";
import XIcon from "@/assets/icons/x.svg?component";
import AstronautHelmetIcon from "@/assets/icons/astronaut-helmet.svg?component";
import GithubIcon from "@/assets/icons/github.svg?component";
import { buttonVariant } from "@/components/ui/button";
import { getSoialMediaURL } from "@/utils";
import MobileMenu from "./MobileMenu.vue";
import LanguageDropdown from "./LanguageDropdown.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

useHead({
  title: "ALTLOC",
  meta: [
    {
      name: "description",
      content: "ALTLOC - your best event platform",
      charset: "utf-8",
    },
  ],
});
</script>

<template>
  <header
    :class="[
      'pointer-events-auto sticky top-0 z-20 px-6 py-3 backdrop-blur-[20px] backdrop-saturate-150 md:px-14',
      isScrolled ? 'bg-blue-700 bg-opacity-80' : 'bg-blue-700',
    ]"
  >
    <div class="container flex items-center justify-between gap-5 md:gap-6">
      <a href="/" class="flex gap-2 items-center">
        <AstronautHelmetIcon class="size-6 stroke-[4] text-zinc-100 shrink-0" />
        <span class="font-semibold text-lg text-zinc-100">ALTLOC</span>
      </a>

      <div class="flex gap-1.5 justify-center md:justify-end">
        <a
          :class="
            buttonVariant({
              size: 'sm',
              class: 'shrink-0',
              variant: 'secondary',
            })
          "
          href="/auth/register"
        >
          <span class="text-xs font-semibold text-zinc-100">
            {{ t("landing.getStartedButton") }}
          </span>
        </a>
        <LanguageDropdown />
        <MobileMenu />
      </div>
    </div>
  </header>

  <main class="relative flex flex-1 flex-col bg-neutral-100">
    <slot />
  </main>

  <!-- <footer class="bg-blue-700 px-6 md:px-10">
    <div class="container flex flex-col">
      <div class="flex flex-col items-start gap-4 py-6 md:gap-2 md:py-4">
        <div
          class="flex w-full flex-col items-start justify-center gap-3 text-center md:flex-row md:items-center md:justify-between"
        >
          <div class="flex gap-6 justify-between">
            <div class="flex gap-2 items-center">
              <AstronautHelmetIcon class="size-6 stroke-[4] text-zinc-100" />
              <span class="font-semibold text-xl text-zinc-100">ALTLOC</span>
            </div>

            <a
              href="https://github.com/progof"
              target="_blank"
              class="font-semibold text-xs text-zinc-100/75 flex gap-1 items-center"
            >
              <GithubIcon class="size-5 stroke-[3] text-zinc-100/75" />
              by PROGOF
            </a>
          </div>
          <ul
            class="flex flex-wrap items-start justify-start gap-x-5 gap-y-2 md:justify-between"
          >
            <li>
              <a href="#" class="text-sm text-zinc-100/75 hover:text-zinc-100">
                To organizers
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-zinc-100/75 hover:text-zinc-100">
                For partners
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-zinc-100/75 hover:text-zinc-100">
                User agreement
              </a>
            </li>
          </ul>
        </div>
        <div class="flex flex-row justify-center gap-1 md:justify-end">
          <a
            href="https://t.me/altlocapp"
            target="_blank"
            class="flex p-1 text-zinc-100/75 hover:text-zinc-100/90"
          >
            <TelegramIcon class="size-5" />
          </a>
          <a
            :href="getSoialMediaURL('instagram')"
            target="_blank"
            class="flex p-1 text-zinc-100/75 hover:text-zinc-100/90"
          >
            <InstagramIcon class="size-5" />
          </a>
          <a
            :href="getSoialMediaURL('facebook')"
            target="_blank"
            class="flex p-1 text-zinc-100/75 hover:text-zinc-100/90"
          >
            <FacebookIcon class="size-5" />
          </a>
          <a
            href="https://x.com/progofcom"
            target="_blank"
            class="flex p-1 text-zinc-100/75 hover:text-zinc-100/90"
          >
            <XIcon class="size-5" />
          </a>
        </div>
      </div>

      <div
        class="flex flex-col justify-between gap-2 border-t border-zinc-100/25 py-4 sm:flex-row"
      >
        <div class="inline-flex gap-1.5 text-zinc-100/75">
          <span class="text-xs">
            Copyright &copy; {{ new Date().getFullYear() }}
          </span>
          <span class="text-xs">&bull;</span>
          <span class="text-xs">All Rights Reserved</span>
        </div>
        <div class="inline-flex gap-1.5 text-zinc-100/75">
          <a
            href="/legal/privacy-policy"
            class="text-xs underline-offset-2 hover:underline"
          >
            Privacy Policy
          </a>
          <span class="text-xs">&bull;</span>
          <a
            href="/legal/terms-of-service"
            class="text-xs underline-offset-2 hover:underline"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer> -->
  <footer class="bg-blue-950 px-6 md:px-10">
    <div class="container flex flex-col">
      <div class="flex flex-col items-start gap-4 py-6">
        <div
          class="flex w-full flex-col items-start justify-center gap-3 text-center md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-center gap-1.5">
            <AstronautHelmetIcon class="size-6 stroke-[4] text-zinc-100" />
            <span class="font-semibold text-xl text-zinc-100">ALTLOC</span>
          </div>
          <ul
            class="flex flex-wrap items-start justify-start gap-x-5 gap-y-2 md:justify-between"
          >
            <li>
              <a
                href="/legal/terms-of-service"
                class="text-sm text-white/75 hover:text-white"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/legal/privacy-policy"
                class="text-sm text-white/75 hover:text-white"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div class="flex flex-row justify-center gap-1 md:justify-end">
          <a
            href="https://t.me/altlocapp"
            target="_blank"
            class="flex p-1 text-zinc-100/75 hover:text-zinc-100/90"
          >
            <TelegramIcon class="size-5" />
          </a>
          <a
            :href="getSoialMediaURL('instagram')"
            target="_blank"
            class="flex p-1 text-zinc-100/75 hover:text-zinc-100/90"
          >
            <InstagramIcon class="size-5" />
          </a>
          <a
            :href="getSoialMediaURL('facebook')"
            target="_blank"
            class="flex p-1 text-zinc-100/75 hover:text-zinc-100/90"
          >
            <FacebookIcon class="size-5" />
          </a>
          <a
            href="https://x.com/progofcom"
            target="_blank"
            class="flex p-1 text-zinc-100/75 hover:text-zinc-100/90"
          >
            <XIcon class="size-5" />
          </a>
        </div>
      </div>
      <div
        class="flex flex-col justify-center gap-2 border-t border-white/25 py-4 sm:flex-row"
      >
        <div class="inline-flex gap-1.5 text-white/75">
          <span class="text-xs">
            Copyright &copy; {{ new Date().getFullYear() }}
          </span>
          <span class="text-xs">&bull;</span>
          <span class="text-xs">All rights reserved</span>
        </div>
      </div>
    </div>
  </footer>
</template>
