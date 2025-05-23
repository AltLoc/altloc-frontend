<script setup lang="tsx">
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/table";
import type { Domain } from "@/features/domain/model";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DotsHorizontalIcon from "@/assets/icons/dots-horizontal.svg?component";
import { DomainDropDownMenu } from "@/features/domain/components/domain-dropdown-menu/";

const props = defineProps<{
  domains: Domain[];
}>();
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
            {{ utcTimestampToDate(row.createdAt) }}
          </TableCell>
          <TableCell>
            <DropdownMenu :modal="false">
              <DropdownMenuTrigger
                class="p-1 hover:bg-black/5 rounded data-[state=open]:bg-black/5"
                aria-label="Actions"
              >
                <DotsHorizontalIcon
                  class="size-5 stroke-[1.75] text-zinc-600"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="min-w-40">
                <DomainDropDownMenu :domain="row" />
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
