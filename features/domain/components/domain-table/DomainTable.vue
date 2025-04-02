<script setup lang="tsx">
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { useDeleteDomainMutation } from "@/features/domain/service/index";
import type { Domain } from "@/features/domain/model";

const props = defineProps<{
  domains: Domain[];
}>();

const { mutate: deleteDomain } = useDeleteDomainMutation();
</script>

<template>
  <div class="overflow-x-auto overflow-y-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(row, index) in props.domains" :key="index">
          <TableCell>
            <a :href="`/user/domain/${row.id}/`" class="text-blue-500">
              {{ row.name }}
            </a>
          </TableCell>

          <TableCell>
            {{
              dayjs(utcTimestampToDate(dayjs(row.createdAt).valueOf())).format(
                "MMMM D YYYY, h:mm A"
              )
            }}
          </TableCell>
          <TableCell>
            <div class="flex gap-3">
              <a :href="`/user/domain/${row.id}/`" class="text-zinc-400">
                Edit
              </a>
              <span
                @click="
                  () => {
                    deleteDomain(row.id);
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
