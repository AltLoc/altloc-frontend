<script setup lang="tsx">
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/table";
import { fetchHabitsByDomain } from "@/features/habit/service/index";
import { useQuery } from "@tanstack/vue-query";
import type { Domain } from "@/features/domain/model";
import { convertSecondsToMinutes } from "@/utils/time";
import { useI18n } from "vue-i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DotsHorizontalIcon from "@/assets/icons/dots-horizontal.svg?component";
import { HabitDropDownMenu } from "@/features/habit/components/habit-dropdown-menu/";

const { t } = useI18n();

const props = defineProps<{
  domain: Domain;
}>();
const { data: habit } = useQuery({
  ...fetchHabitsByDomain(props.domain.id),
  enabled: true,
});
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>{{ t("common.name") }}</TableHeaderCell>
        <TableHeaderCell>{{ t("app.habit.runTime") }}</TableHeaderCell>
        <TableHeaderCell>{{ t("app.habit.dayPart.title") }}</TableHeaderCell>
        <TableHeaderCell>{{ t("app.habit.target") }}</TableHeaderCell>
        <TableHeaderCell>{{ t("app.habit.completions") }}</TableHeaderCell>
        <TableHeaderCell>{{ t("common.createdAt") }}</TableHeaderCell>
        <TableHeaderCell>Action</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(row, index) in habit" :key="index">
        <TableCell>
          <a :href="`/user/habit/${row.id}/`" class="text-blue-500">
            {{ row.name }}
          </a>
        </TableCell>

        <TableCell>
          {{ convertSecondsToMinutes(row.runtime) }}
        </TableCell>
        <TableCell>
          {{ row.dayPart }}
        </TableCell>
        <TableCell>
          {{ row.targetNumberOfCompletions }}
        </TableCell>
        <TableCell>
          {{ row.numberOfCompletions }}
        </TableCell>
        <TableCell>
          {{ utcTimestampToDate(row.createdAt) }}
        </TableCell>
        <TableCell>
          <DropdownMenu :modal="false">
            <DropdownMenuTrigger
              class="p-1 hover:bg-black/5 rounded data-[state=open]:bg-black/5"
              aria-label="Actions"
            >
              <DotsHorizontalIcon class="size-5 stroke-[1.75] text-zinc-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="min-w-40">
              <HabitDropDownMenu :habit="row" />
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
