<script setup lang="ts">
import GlobeIcon from "@/assets/icons/globe.svg?component";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "universal-cookie";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { locale, locales, setLocale } = useI18n();
const cookies = new Cookies();

const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const changeLocale = (newLocale: "en" | "uk" | "pl" | "de" | "fr" | "es") => {
  setLocale(newLocale);
  cookies.set("locale", newLocale, {
    path: "/",
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
};

const flagIcons = import.meta.glob("@/assets/icons/flags/*.svg", {
  eager: true,
  as: "url",
}) as Record<string, string>;

const getFlagSrc = (code: string): string => {
  return flagIcons[`/assets/icons/flags/${code}.svg`] || "";
};
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger
      class="mx-1 flex items-center justify-start gap-x-2 whitespace-nowrap border-none bg-transparent px-2.5 py-2 transition-colors xs:justify-end"
    >
      <img
        :src="getFlagSrc(currentLocale)"
        alt="Flag"
        class="h-4 w-6 object-cover rounded-sm"
      />
      <span class="text-sm font-medium tracking-wide text-zinc-300">
        {{ currentLocale.toUpperCase() }}
      </span>
      <GlobeIcon
        aria-hidden="true"
        class="size-6 shrink-0 stroke-[1.25] text-zinc-300"
      />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuCheckboxItem
        v-for="loc in availableLocales"
        :key="loc.code"
        :checked="loc.code === locale"
        class="cursor-pointer flex items-center gap-1"
        @click="changeLocale(loc.code)"
      >
        <img
          :src="getFlagSrc(loc.code)"
          alt="Flag"
          class="h-4 w-6 object-cover rounded-sm"
        />
        {{ loc.name }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
