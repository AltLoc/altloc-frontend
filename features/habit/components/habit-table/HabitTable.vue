<script setup lang="tsx">
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/table";
// import type { Domain } from "@/features/domain/model";
import dayjs from "dayjs";
import {
  fetchHabitsByDomain,
  useDeleteHabitMutation,
} from "@/features/habit/service/index";
import { useQuery } from "@tanstack/vue-query";
import type { Domain } from "@/features/domain/model";
import { convertSecondsToMinutes } from "@/utils/time";

const props = defineProps<{
  domain: Domain;
}>();
const { data: habit } = useQuery({
  ...fetchHabitsByDomain(props.domain.id),
  enabled: true,
});

const { mutate: deleteHabit } = useDeleteHabitMutation();
</script>

<template>
  <div class="overflow-x-auto overflow-y-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>

          <TableHeaderCell>Run time</TableHeaderCell>
          <TableHeaderCell>Day part</TableHeaderCell>
          <TableHeaderCell>Target</TableHeaderCell>
          <TableHeaderCell>Completions</TableHeaderCell>
          <TableHeaderCell> Created at </TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(row, index) in habit" :key="index">
          <TableCell>
            <a :href="`/user/domain/${row.id}/edit`" class="text-blue-500">
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
            {{
              dayjs(
                utcTimestampToDate(String(dayjs(row.createdAt).valueOf()))
              ).format("MMMM D YYYY, h:mm A")
            }}
          </TableCell>
          <TableCell>
            <div class="flex gap-3">
              <a :href="`/user/domain/${row.id}/edit`" class="text-zinc-400">
                Edit
              </a>
              <span
                @click="
                  () => {
                    deleteHabit(row.id);
                  }
                "
                class="text-zinc-400"
              >
                Delete
              </span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
