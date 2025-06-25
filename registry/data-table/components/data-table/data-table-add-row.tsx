"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface DataTableAddRowProps {
  FormComponent: React.ComponentType<{
    onSuccess?: () => void
    onCancel?: () => void
  }>
  title?: string
  description?: string
}

export default function DataTableAddRow({ 
  FormComponent, 
  title = "Add new Row to Table",
  description = "Add a new row to the table."
}: DataTableAddRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="size-4 shrink-0" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
          <FormComponent
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
      </SheetContent>
    </Sheet>
  )
}