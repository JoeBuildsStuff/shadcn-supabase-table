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

export interface Filter {
  id: string;
  columnId: string;
  operator: string;
  value: string;
}

export default function DataTableFilter<TData>({ table }: { table: Table<TData> }) {
  const [filters, setFilters] = useState<Filter[]>([
    { id: Date.now().toString(), columnId: "", operator: "", value: "" },
  ]);
  const [logicalOperator, setLogicalOperator] = useState<"and" | "or">("and");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addFilter = () => {
    const newId = Date.now().toString();
    setFilters([
      ...filters,
      { id: newId, columnId: "", operator: "", value: "" },
    ]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFilters((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateFilter = (id: string, newFilter: Partial<Filter>) => {
    setFilters(
      filters.map((f) => (f.id === id ? { ...f, ...newFilter } : f))
    );
  };

  const applyFilters = () => {
    const columnFilters = filters
      .filter((f) => f.columnId && f.operator)
      .map(({ columnId, value }) => ({
        id: columnId,
        value,
      }));
    table.setColumnFilters(columnFilters);
  };

  return (
    <Popover>
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
              items={filters.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {filters.map((filter, index) => (
                  <DataTableFilterItem
                    key={filter.id}
                    id={filter.id}
                    table={table}
                    filter={filter}
                    onRemove={() => removeFilter(filter.id)}
                    onUpdate={(newFilter: Partial<Filter>) => updateFilter(filter.id, newFilter)}
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
              className="flex h-8 flex-row items-center gap-2"
              onClick={addFilter}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
            <Button
              variant="default"
              className="flex h-8 flex-row items-center gap-2"
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