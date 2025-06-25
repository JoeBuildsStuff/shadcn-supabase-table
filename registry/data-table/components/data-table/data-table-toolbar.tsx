import { DataTableViewOptions } from "./data-table-view-options"
import { Table } from "@tanstack/react-table"
import DataTableFilter from "./data-table-filter"
import DataTableSort from "./data-table-sort"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import DataTableAddRow from "./data-table-add-row"
import DataTableDeleteRows from "./data-table-delete-rows"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    AddRowFormComponent?: React.ComponentType<{
      onSuccess?: () => void
      onCancel?: () => void
    }>
    deleteAction?: (ids: string[]) => Promise<{ success: boolean; error?: string; deletedCount?: number }>
  }

export default function DataTableToolbar<TData>({ table, AddRowFormComponent, deleteAction }: DataTableToolbarProps<TData>) {
    
  // Check if there are any active sorts or filters
  const hasActiveSorts = table.getState().sorting.length > 0
  const hasActiveFilters = table.getState().columnFilters.length > 0
  const hasActiveFiltersOrSorts = hasActiveSorts || hasActiveFilters

  // Check if there are selected rows
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedRowIds = selectedRows.map(row => (row.original as { id: string }).id)

  const clearAllFiltersAndSorts = () => {
    table.setSorting([])
    table.setColumnFilters([])
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        {AddRowFormComponent && (
          <DataTableAddRow 
            FormComponent={AddRowFormComponent}
            title="Add New Contact"
            description="Add a new contact to your list."
          />
        )}
        {deleteAction && selectedRowIds.length > 0 && (
          <DataTableDeleteRows
            selectedRowIds={selectedRowIds}
            deleteAction={deleteAction}
            onComplete={() => table.toggleAllRowsSelected(false)}
          />
        )}
        <DataTableSort table={table} />
        <DataTableFilter table={table} />
        {hasActiveFiltersOrSorts && (
          <Button variant="outline" size="icon" onClick={clearAllFiltersAndSorts}>
            <X className="size-4 shrink-0" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />

    </div>
  )
}