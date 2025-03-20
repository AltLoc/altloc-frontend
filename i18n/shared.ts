export const LOCALES = ["en", "pl", "uk"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  pl: "Polski",
  uk: "Українська",
};

export const LOCALE_TO_BCP47CODE: Record<Locale, string> = {
  en: "en-US",
  pl: "pl-PL",
  uk: "uk-UA",
};

export const BCP47CODE_TO_LOCALE = Object.fromEntries(
  Object.entries(LOCALE_TO_BCP47CODE).map(([a, b]) => [b, a])
) as Record<string, Locale>;
