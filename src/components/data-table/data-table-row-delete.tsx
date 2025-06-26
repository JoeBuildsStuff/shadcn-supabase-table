"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DataTableRowDeleteProps {
  selectedRowIds: string[]
  deleteAction: (ids: string[]) => Promise<{ success: boolean; error?: string; deletedCount?: number }>
  onComplete?: () => void
}

export default function DataTableRowDelete({ 
  selectedRowIds, 
  deleteAction,
  onComplete 
}: DataTableRowDeleteProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const result = await deleteAction(selectedRowIds)
      
      if (result.success) {
        router.refresh()
        onComplete?.()
        setOpen(false)
      } else {
        console.error("Failed to delete items:", result.error)
      }
    } catch (error) {
      console.error("Error deleting items:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (selectedRowIds.length === 0) {
    return null
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash2 className="size-4 shrink-0" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Selected Items</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {selectedRowIds.length} selected item{selectedRowIds.length === 1 ? '' : 's'}? 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}