import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronsUpDown, GripVertical, X } from "lucide-react"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function DataTableFilterItem({
  onRemove,
  index,
  logicalOperator,
  onLogicalOperatorChange,
  id,
}: {
  onRemove: () => void
  index: number
  logicalOperator: "and" | "or"
  onLogicalOperatorChange: (value: "and" | "or") => void
  id: string
}) {
  const [open, setOpen] = useState(false)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const renderLogicalOperator = () => {
    if (index === 0) {
      return "Where"
    }
    if (index === 1) {
      return (
        <Button
          variant="secondary"
          className="w-full capitalize"
          onClick={() =>
            onLogicalOperatorChange(logicalOperator === "and" ? "or" : "and")
          }
        >
          {logicalOperator}
        </Button>
      )
    }
    return <div className="capitalize">{logicalOperator}</div>
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row items-center gap-2"
    >
      <Button
        variant="ghost"
        size="icon"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </Button>
      <div className="w-[4rem] text-center text-sm font-medium text-muted-foreground">
        {renderLogicalOperator()}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex-1">
            <span className="flex-1 text-left capitalize">Column</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Command>
            <CommandInput placeholder="Search column" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="status"
                  onSelect={() => {
                    // Handle status selection
                  }}
                  className="capitalize"
                >
                  status
                </CommandItem>
                <CommandItem
                  key="email"
                  onSelect={() => {
                    // Handle email selection
                  }}
                  className="capitalize"
                >
                  email
                </CommandItem>
                <CommandItem
                  key="amount"
                  onSelect={() => {
                    // Handle amount selection
                  }}
                  className="capitalize"
                >
                  amount
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Select>
        <SelectTrigger className="w-[7.5rem]">
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="contains">contains</SelectItem>
          <SelectItem value="not_contains">does not contain</SelectItem>
          <SelectItem value="is_empty">is</SelectItem>
          <SelectItem value="is_not_empty">is not empty</SelectItem>
          <SelectItem value="is_null">is empty</SelectItem>
          <SelectItem value="is_not_null">is not empty</SelectItem>
        </SelectContent>
      </Select>

      <Input placeholder="Value" className="w-[10rem]" />

      <Button variant="ghost" size="icon" onClick={onRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
