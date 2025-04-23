<!-- <script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const props = defineProps<{
  dayPart: string;
}>();
</script>

<template>
  <Tabs default-value="account" class="w-auto">
    <TabsList class="flex w-full justify-between p-1">
      <TabsTrigger value="MORNING">Morning</TabsTrigger>
      <TabsTrigger value="AFTERNOON">Afternoon</TabsTrigger>
      <TabsTrigger value="EVENING">Evening</TabsTrigger>
      <TabsTrigger value="NIGHT">Night</TabsTrigger>
    </TabsList>
  </Tabs>
</template> -->

<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ref, watch } from "vue";

const props = defineProps<{
  dayPart: string;
}>();

const emit = defineEmits<{
  (e: "update:dayPart", value: string): void;
}>();

const currentTab = ref(props.dayPart);

console.log("Current tab 77:", currentTab.value);

// watch(
//   () => props.dayPart,
//   (newVal) => {
//     currentTab.value = newVal;
//   }
// );

function updateTab(part: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT") {
  console.log("Current tab:", part);
  currentTab.value = part;
  emit("update:dayPart", part);
}

// function setDayPart(part: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT") {
//   console.log(`Emitting: ${part}`);
//   emit("update:dayPart", part);
// }
</script>

<template>
  <Tabs :default-value="currentTab" class="w-auto">
    <TabsList class="flex w-full justify-between p-1">
      <TabsTrigger value="MORNING" @click="updateTab('MORNING')">
        Morning
      </TabsTrigger>
      <TabsTrigger value="AFTERNOON" @click="updateTab('AFTERNOON')">
        Afternoon
      </TabsTrigger>
      <TabsTrigger value="EVENING" @click="updateTab('EVENING')">
        Evening
      </TabsTrigger>
      <TabsTrigger value="NIGHT" @click="updateTab('NIGHT')">
        Night
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
