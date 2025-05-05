<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  dayPart: string;
}>();

const emit = defineEmits<{
  (e: "update:dayPart", value: string): void;
}>();

const currentTab = ref(props.dayPart);

function updateTab(part: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT") {
  console.log("Current tab:", part);
  currentTab.value = part;
  emit("update:dayPart", part);
}
</script>

<template>
  <Tabs :default-value="currentTab" class="w-auto">
    <TabsList
      class="flex w-full justify-between p-2 bg-blue-50 rounded-lg opacity-40"
    >
      <TabsTrigger value="MORNING" @click="updateTab('MORNING')">
        {{ t("app.habit.dayPart.morning") }}
      </TabsTrigger>
      <TabsTrigger value="AFTERNOON" @click="updateTab('AFTERNOON')">
        {{ t("app.habit.dayPart.afternoon") }}
      </TabsTrigger>
      <TabsTrigger value="EVENING" @click="updateTab('EVENING')">
        {{ t("app.habit.dayPart.evening") }}
      </TabsTrigger>
      <TabsTrigger value="NIGHT" @click="updateTab('NIGHT')">
        {{ t("app.habit.dayPart.night") }}
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
