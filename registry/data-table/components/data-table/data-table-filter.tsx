"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ListFilter, Plus, ChevronRight } from "lucide-react";
import DataTableFilterItem from "./data-table-filter-item";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Table } from "@tanstack/react-table";
import type { ExtendedColumnFilter } from "@/types/data-table";

// Generate a random ID
function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

export default function DataTableFilter<TData>({ table }: { table: Table<TData> }) {
  const [filters, setFilters] = useState<ExtendedColumnFilter<TData>[]>([
    {
      filterId: generateId(),
      id: "" as Extract<keyof TData, string>,
      value: "",
      operator: "iLike",
      variant: "text",
    },
  ]);
  const [logicalOperator, setLogicalOperator] = useState<"and" | "or">("and");
  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addFilter = () => {
    const newFilter: ExtendedColumnFilter<TData> = {
      filterId: generateId(),
      id: "" as Extract<keyof TData, string>,
      value: "",
      operator: "iLike",
      variant: "text",
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (filterId: string) => {
    setFilters(filters.filter((f) => f.filterId !== filterId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFilters((items) => {
        const oldIndex = items.findIndex((item) => item.filterId === active.id);
        const newIndex = items.findIndex((item) => item.filterId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateFilter = (filterId: string, newFilter: ExtendedColumnFilter<TData>) => {
    setFilters(
      filters.map((f) => (f.filterId === filterId ? newFilter : f))
    );
  };

  const applyFilters = () => {
    // Get valid filters (those with column selected and either have value or are empty/not empty operators)
    const validFilters = filters.filter((f) => 
      f.id && f.operator && (
        (f.value !== "" && f.value !== null && f.value !== undefined) || 
        ["isEmpty", "isNotEmpty"].includes(f.operator)
      )
    );

    // Convert to TanStack table format with custom filter functions
    const columnFilters = validFilters.map((filter) => {
      return {
        id: filter.id as string,
        value: {
          operator: filter.operator,
          value: filter.value,
          variant: filter.variant
        }
      };
    });
    
    table.setColumnFilters(columnFilters);
    setOpen(false); // Close the popover after applying filters
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ListFilter className="h-4 w-4" />
          <div>Filter</div>
          <Badge variant="secondary">
            {filters.length}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-3">
        <div className="flex w-full flex-col gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            Filter by:
          </p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filters.map((item) => item.filterId)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {filters.map((filter, index) => (
                  <DataTableFilterItem
                    key={filter.filterId}
                    table={table}
                    filter={filter}
                    onFilterChange={(newFilter) => updateFilter(filter.filterId, newFilter)}
                    onRemove={() => removeFilter(filter.filterId)}
                    index={index}
                    logicalOperator={logicalOperator}
                    onLogicalOperatorChange={setLogicalOperator}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <Separator />

          <div className="flex flex-row items-center justify-between gap-3">
            <Button
              variant="secondary"
              className="flex flex-row items-center h-8"
              onClick={addFilter}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
            <Button
              variant="default"
              className="flex flex-row items-center h-8"
              onClick={applyFilters}
            >
              Apply
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}