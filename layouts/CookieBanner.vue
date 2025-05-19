<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Cookie from "universal-cookie";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale, locales, setLocale } = useI18n();

const cookie = new Cookie();
const isOpen = ref(true);

const currentLocale = computed(() => locale.value);
</script>

<template>
  <div
    class="pointer-events-none fixed left-0 top-0 z-50 flex h-dvh w-full items-end justify-end"
  >
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="pointer-events-auto m-3 flex max-w-96 flex-col rounded-lg border border-zinc-200 bg-neutral-100 p-4 shadow-lg"
      >
        <span class="mb-1 text-base font-semibold text-zinc-900">
          {{ t("cookie.title") }}
        </span>
        <p class="text-sm font-medium text-zinc-500">
          {{ t("cookie.description") }}
        </p>
        <div class="mt-3 flex gap-1">
          <Button
            type="button"
            class="flex-1"
            size="xs"
            variant="tertiary"
            @click="
              () => {
                cookie.set('cookie-consent', 'rejected', { path: '/' });
                isOpen = false;
              }
            "
          >
            {{ t("cookie.reject") }}
          </Button>
          <Button
            type="button"
            class="flex-1"
            size="xs"
            variant="primary"
            @click="
              () => {
                cookie.set('cookie-consent', 'accepted', { path: '/' });
                isOpen = false;
              }
            "
          >
            {{ t("cookie.accept") }}
          </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.15s,
    transform 0.15s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
