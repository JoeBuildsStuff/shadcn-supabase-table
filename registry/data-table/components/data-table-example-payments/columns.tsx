"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../data-table/data-table-column-header"
import { Payment } from "./data-table-example-payments"

// Custom filter function that handles all our operators
function customFilterFn(row: { getValue: (key: string) => unknown }, columnId: string, filterValue: { operator: string; value: unknown; variant: string }) {
  if (!filterValue || typeof filterValue !== 'object') return true;
  
  const { operator, value, variant } = filterValue;
  const cellValue = row.getValue(columnId);

  // Handle empty/not empty operators first
  if (operator === "isEmpty") {
    return cellValue === null || cellValue === undefined || cellValue === "";
  }
  if (operator === "isNotEmpty") {
    return cellValue !== null && cellValue !== undefined && cellValue !== "";
  }

  // If no value provided for other operators, don't filter
  if (value === null || value === undefined || value === "") return true;

  // Convert values for comparison
  let compareValue = value;
  
  // Convert string numbers to actual numbers for numeric operations
  if (variant === "number" && typeof value === "string" && value !== "") {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      compareValue = numValue;
    }
  }
  
  // Convert date strings to Date objects for date operations
  if (variant === "date" && typeof value === "string" && value !== "") {
    compareValue = new Date(value);
  }
  
  // Convert string booleans to actual booleans
  if (variant === "boolean" && typeof value === "string") {
    compareValue = value === "true";
  }

  // Handle different operators
  switch (operator) {
    case "eq": // Is
      return cellValue === compareValue;
      
    case "ne": // Is not
      return cellValue !== compareValue;
      
    case "iLike": // Contains (case insensitive)
      if (typeof cellValue === "string" && typeof compareValue === "string") {
        return cellValue.toLowerCase().includes(compareValue.toLowerCase());
      }
      return false;
      
    case "notILike": // Does not contain (case insensitive)
      if (typeof cellValue === "string" && typeof compareValue === "string") {
        return !cellValue.toLowerCase().includes(compareValue.toLowerCase());
      }
      return true;
      
    case "lt": // Less than / Before
      if (typeof cellValue === "number" && typeof compareValue === "number") {
        return cellValue < compareValue;
      }
      if (cellValue instanceof Date && compareValue instanceof Date) {
        return cellValue < compareValue;
      }
      return false;
      
    case "gt": // Greater than / After
      if (typeof cellValue === "number" && typeof compareValue === "number") {
        return cellValue > compareValue;
      }
      if (cellValue instanceof Date && compareValue instanceof Date) {
        return cellValue > compareValue;
      }
      return false;
      
    case "inArray": // Has any of (for multi-select)
      if (Array.isArray(compareValue)) {
        return compareValue.includes(cellValue);
      }
      return false;
      
    case "notInArray": // Has none of (for multi-select)
      if (Array.isArray(compareValue)) {
        return !compareValue.includes(cellValue);
      }
      return true;
      
    case "isBetween": // Is between (for ranges)
      if (Array.isArray(value) && value.length === 2) {
        const [min, max] = value;
        const minNum = typeof min === "string" ? parseFloat(min) : min;
        const maxNum = typeof max === "string" ? parseFloat(max) : max;
        
        if (typeof cellValue === "number" && !isNaN(minNum as number) && !isNaN(maxNum as number)) {
          return cellValue >= (minNum as number) && cellValue <= (maxNum as number);
        }
      }
      return true;
      
    default:
      return true;
  }
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return <div className="">{row.getValue("status")}</div>
    },
    meta: {
      label: "Status",
      variant: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Processing", value: "processing" },
        { label: "Success", value: "success" },
        { label: "Failed", value: "failed" },
      ],
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return <div className="">{row.getValue("email")}</div>
    },
    meta: {
      label: "Email",
      variant: "text",
      placeholder: "Search emails...",
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="">{formatted}</div>
    },
    meta: {
      label: "Amount",
      variant: "number",
      unit: "$",
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    },
  },
]