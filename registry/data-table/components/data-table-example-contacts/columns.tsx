"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Star } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "../data-table/data-table-column-header"
import { Contacts } from "./data-table-example-contacts"

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
      // Handle date comparisons for equality
      if (variant === "date") {
        const cellDate = typeof cellValue === "string" ? new Date(cellValue) : cellValue;
        const compareDate = compareValue instanceof Date ? compareValue : new Date(compareValue as string);
        if (cellDate instanceof Date && compareDate instanceof Date && !isNaN(cellDate.getTime()) && !isNaN(compareDate.getTime())) {
          // Compare dates by day (ignore time)
          return cellDate.toDateString() === compareDate.toDateString();
        }
      }
      return cellValue === compareValue;
      
    case "ne": // Is not
      // Handle date comparisons for inequality
      if (variant === "date") {
        const cellDate = typeof cellValue === "string" ? new Date(cellValue) : cellValue;
        const compareDate = compareValue instanceof Date ? compareValue : new Date(compareValue as string);
        if (cellDate instanceof Date && compareDate instanceof Date && !isNaN(cellDate.getTime()) && !isNaN(compareDate.getTime())) {
          // Compare dates by day (ignore time)
          return cellDate.toDateString() !== compareDate.toDateString();
        }
      }
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
      // Handle date comparisons
      if (variant === "date") {
        const cellDate = typeof cellValue === "string" ? new Date(cellValue) : cellValue;
        const compareDate = compareValue instanceof Date ? compareValue : new Date(compareValue as string);
        if (cellDate instanceof Date && compareDate instanceof Date && !isNaN(cellDate.getTime()) && !isNaN(compareDate.getTime())) {
          return cellDate < compareDate;
        }
      }
      if (cellValue instanceof Date && compareValue instanceof Date) {
        return cellValue < compareValue;
      }
      return false;
      
    case "gt": // Greater than / After
      if (typeof cellValue === "number" && typeof compareValue === "number") {
        return cellValue > compareValue;
      }
      // Handle date comparisons
      if (variant === "date") {
        const cellDate = typeof cellValue === "string" ? new Date(cellValue) : cellValue;
        const compareDate = compareValue instanceof Date ? compareValue : new Date(compareValue as string);
        if (cellDate instanceof Date && compareDate instanceof Date && !isNaN(cellDate.getTime()) && !isNaN(compareDate.getTime())) {
          return cellDate > compareDate;
        }
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

export const columns: ColumnDef<Contacts>[] = [
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
    accessorKey: "display_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const displayName = row.getValue("display_name") as string
      const isFavorite = row.getValue("is_favorite") as boolean
      
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{displayName}</span>
          {isFavorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        </div>
      )
    },
    meta: {
      label: "Name",
      variant: "text",
      placeholder: "Search names...",
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: "primary_email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      const email = row.getValue("primary_email") as string
      return <div className="text-muted-foreground">{email}</div>
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
    accessorKey: "primary_phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    cell: ({ row }) => {
      const phone = row.getValue("primary_phone") as string
      return <div className="text-muted-foreground">{phone}</div>
    },
    meta: {
      label: "Phone",
      variant: "text",
      placeholder: "Search phone numbers...",
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: "company",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company" />,
    cell: ({ row }) => {
      const company = row.getValue("company") as string
      return <div className="">{company}</div>
    },
    meta: {
      label: "Company",
      variant: "text",
      placeholder: "Search companies...",
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: "job_title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Job Title" />,
    cell: ({ row }) => {
      const jobTitle = row.getValue("job_title") as string
      return <div className="text-sm">{jobTitle}</div>
    },
    meta: {
      label: "Job Title",
      variant: "text",
      placeholder: "Search job titles...",
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: "tags",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tags" />,
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[] | null
      
      if (!tags || tags.length === 0) {
        return <div className="text-muted-foreground">—</div>
      }
      
      return (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )
    },
    meta: {
      label: "Tags",
      variant: "multiSelect",
      options: [
        { label: "Engineering", value: "engineering" },
        { label: "Product", value: "product" },
        { label: "Analytics", value: "analytics" },
        { label: "Operations", value: "ops" },
        { label: "Marketing", value: "marketing" },
        { label: "Investing", value: "investing" },
        { label: "Developer", value: "developer" },
        { label: "AI", value: "ai" },
        { label: "CTO", value: "cto" },
        { label: "Design", value: "design" },
        { label: "Energy", value: "energy" },
        { label: "Sustainability", value: "sustainability" },
        { label: "Automation", value: "automation" },
        { label: "Leadership", value: "leadership" },
        { label: "Business", value: "business" },
        { label: "Founder", value: "founder" },
        { label: "Operations", value: "operations" },
        { label: "Creative", value: "creative" },
        { label: "Compliance", value: "compliance" },
      ],
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at") as string
      if (!createdAt) return <div className="text-muted-foreground">—</div>
      
      const date = new Date(createdAt)
      const formatted = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date)
      
      return <div className="text-sm text-muted-foreground">{formatted}</div>
    },
    meta: {
      label: "Created",
      variant: "date",
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated" />,
    cell: ({ row }) => {
      const updatedAt = row.getValue("updated_at") as string
      if (!updatedAt) return <div className="text-muted-foreground">—</div>
      
      const date = new Date(updatedAt)
      const formatted = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date)
      
      return <div className="text-sm text-muted-foreground">{formatted}</div>
    },
    meta: {
      label: "Updated",
      variant: "date",
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    accessorKey: "is_favorite",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Favorite" />,
    cell: ({ row }) => {
      const isFavorite = row.getValue("is_favorite") as boolean
      return (
        <div className="flex justify-center">
          {isFavorite ? (
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ) : (
            <Star className="h-4 w-4 text-muted-foreground/30" />
          )}
        </div>
      )
    },
    meta: {
      label: "Favorite",
      variant: "boolean",
    },
    enableColumnFilter: true,
    filterFn: customFilterFn,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original
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
                onClick={() => navigator.clipboard.writeText(contact.id)}
              >
                Copy contact ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(contact.primary_email || "")}
              >
                Copy email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit contact</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Toggle favorite logic would go here
                  console.log("Toggle favorite for", contact.display_name)
                }}
              >
                {contact.is_favorite ? "Remove from favorites" : "Add to favorites"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
