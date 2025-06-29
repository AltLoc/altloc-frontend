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
import { useCookie } from "#app";
import CookieBanner from "@/layouts/CookieBanner.vue";

const cookieConsent = useCookie("cookie-consent");

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
  title: "AltLoc - your habit avatar",
  meta: [
    {
      name: "description",
      content:
        "AltLoc is a gamified habit tracker that helps you build identity-driven habits.",
    },
    {
      name: "theme-color",
      content: "#1d4ed8", // blue-700
    },
    {
      charset: "utf-8",
    },
  ],
});
</script>

<template>
  <header
    :class="[
      'pointer-events-auto sticky top-0 z-20 px-6 py-3 backdrop-blur-[20px] backdrop-saturate-150 md:px-14',
      isScrolled ? 'bg-blue-900 bg-opacity-80' : 'bg-blue-900',
    ]"
  >
    <div class="container flex items-center justify-between gap-5 md:gap-6">
      <a href="/" class="flex gap-2 items-center">
        <AstronautHelmetIcon class="size-6 stroke-[4] text-zinc-100 shrink-0" />
        <span class="font-semibold text-lg text-zinc-100">ALTLOC</span>
      </a>

      <div class="flex gap-1.5 justify-center md:justify-end">
        <LanguageDropdown />
        <MobileMenu />
        <div class="hidden md:flex gap-4 items-center">
          <a
            :class="
              buttonVariant({
                variant: 'secondary',
                size: 'sm',
                class: 'shrink-0',
              })
            "
            href="/auth/login"
          >
            {{ t("layout.logIn") }}
          </a>
          <a
            :class="
              buttonVariant({
                variant: 'primary',
                size: 'sm',
                class: 'shrink-0',
              })
            "
            href="/auth/register"
          >
            {{ t("layout.register") }}
          </a>
        </div>
      </div>
    </div>
  </header>

  <main class="relative flex flex-1 flex-col bg-neutral-100">
    <slot />
  </main>

  <footer class="bg-blue-950 px-6 md:px-10">
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
        class="flex flex-col-reverse justify-between gap-2 border-t border-zinc-100/25 py-4 sm:flex-row"
      >
        <div class="inline-flex gap-1.5 text-zinc-100/75">
          <span class="text-xs">
            {{ t("layout.copyright") }} &copy;
            {{ new Date().getFullYear() }}
          </span>
          <span class="text-xs">
            {{ t("layout.allRightsReserved") }}
          </span>
        </div>
        <div class="inline-flex gap-1.5 text-zinc-100/75 items-center">
          <a
            href="/legal/privacy-policy"
            class="text-xs underline-offset-2 hover:underline"
          >
            {{ t("layout.privacyPolicy") }}
          </a>
          <span class="px-0.5" role="separator">|</span>
          <a
            href="/legal/terms-of-service"
            class="text-xs underline-offset-2 hover:underline"
          >
            {{ t("layout.terms") }}
          </a>
          <span class="px-0.5" role="separator">|</span>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdNcSIbZlqbvO2NBWSMKW5QrBsl4NuhlFuaB2Sz0Rbxr3Fb9A/viewform?usp=dialog"
            target="_blank"
            class="text-xs underline-offset-2 hover:underline"
          >
            {{ t("layout.report") }}
          </a>
        </div>
      </div>
    </div>
  </footer>
  <CookieBanner v-if="cookieConsent === undefined" />
</template>
