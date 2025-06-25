"use client"

import { Star } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Contacts } from "../_lib/validations"
import ContactsEditRow from "./contacts-edit-row"

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
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original
      return (
        <ContactsEditRow contact={contact} />
      )
    },
  },
  {
    accessorKey: "display_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const displayName = row.getValue("display_name") as string

      return (
        <div className="flex items-center gap-2">
            <span className="font-medium">{displayName}</span>
        </div>
      )
    },
    meta: {
      label: "Name",
      variant: "text",
      placeholder: "Search names...",
    },
    enableColumnFilter: true,
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
  },
  {
    accessorKey: "primary_phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    cell: ({ row }) => {
      const phone = row.getValue("primary_phone") as string
      if (!phone) return <div className="text-muted-foreground">—</div>
      
      // Format phone number as (XXX) XXX-XXXX
      const formatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      
      return <div className="text-muted-foreground">{formatted}</div>
    },
    meta: {
      label: "Phone",
      variant: "text",
      placeholder: "Search phone numbers...",
    },
    enableColumnFilter: true,
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
            <Badge key={tag} variant="outline" className="text-xs">
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
  },
  {
    accessorKey: "is_favorite",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Favorite" />,
    cell: ({ row }) => {
      const isFavorite = row.getValue("is_favorite") as boolean
      return (
        <div className="flex justify-center">
          {isFavorite ? (
                <Star className="size-5 fill-yellow-400 text-yellow-700 dark:text-yellow-400 dark:fill-yellow-900/30" strokeWidth={1} />
            ) : (
                <Star className="size-5 fill-gray-200 text-gray-400 dark:text-gray-400 dark:fill-gray-900/30" strokeWidth={1} />
            )}
        </div>
      )
    },
    meta: {
      label: "Favorite",
      variant: "boolean",
    },
    enableColumnFilter: true,
  },
]
