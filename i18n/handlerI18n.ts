// import { useI18n } from "vue-i18n";
// import { defaultDocument } from "@vueuse/core";
// import { BCP47CODE_TO_LOCALE, DEFAULT_LOCALE, type Locale } from "./shared";

// export function getCurrentLocale(): Locale {
//   const { locale } = useI18n();

//   if (import.meta.env.SSR) {
//     return locale.value as Locale;
//   }

//   const bcp74Code = defaultDocument?.documentElement.lang;
//   if (!bcp74Code) {
//     console.warn(
//       `Failed to get document language. Fallback to default locale "${DEFAULT_LOCALE}"`
//     );
//     return DEFAULT_LOCALE;
//   }

//   const mappedLocale = BCP47CODE_TO_LOCALE[bcp74Code];
//   if (!mappedLocale) {
//     console.warn(
//       `Failed to extract document language: unknown BCP47 code "${bcp74Code}". Fallback to default locale "${DEFAULT_LOCALE}"`
//     );
//     return DEFAULT_LOCALE;
//   }

//   return mappedLocale;
// }

import { useI18n } from "#i18n";
import { useRuntimeConfig } from "#app";
import { defaultDocument } from "@vueuse/core";
import type { Locale } from "./shared";

export function getCurrentLocale(): Locale {
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const locales = config.public.i18n.locales as { code: string; iso: string }[];
  const defaultLocale = config.public.i18n.defaultLocale as string;

  if (import.meta.env.SSR) {
    return locale.value as Locale;
  }

  const bcp74Code = defaultDocument?.documentElement.lang;
  if (!bcp74Code) {
    console.warn(
      `Failed to get document language. Fallback to default locale "${defaultLocale}"`
    );
    return defaultLocale as Locale;
  }

  const mappedLocale = locales.find((l) => l.iso === bcp74Code)?.code;
  if (!mappedLocale) {
    console.warn(
      `Unknown BCP47 code "${bcp74Code}". Fallback to default locale "${defaultLocale}"`
    );
    return defaultLocale as Locale;
  }

  return mappedLocale as Locale;
}
