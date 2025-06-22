import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { Table } from "@tanstack/react-table"
import DataTableFilter from "./data-table-filter"
import DataTableSort from "./data-table-sort"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
  }

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
        />
        <DataTableSort table={table} />
        <DataTableFilter />
      </div>

      <DataTableViewOptions table={table} />

    </div>
  )
}