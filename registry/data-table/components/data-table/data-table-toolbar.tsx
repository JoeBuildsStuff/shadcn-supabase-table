
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
        <DataTableSort table={table} />
        <DataTableFilter table={table} />
      </div>

      <DataTableViewOptions table={table} />

    </div>
  )
}