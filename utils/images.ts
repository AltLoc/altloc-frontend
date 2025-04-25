export function getCDNImageURL(key: string): string {
  return new URL(key, useRuntimeConfig().public.PUBLIC_CDN_URL).toString();
}

export const PLACEHOLDER_AVATAR = "/images/placeholder_image.webp";
