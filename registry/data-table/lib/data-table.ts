import type { RowData } from "@tanstack/react-table";
import type { ColumnFiltersState, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  textOperators: [
    { label: "Contains", value: "iLike" as const },
    { label: "Does not contain", value: "notILike" as const },
    { label: "Is", value: "eq" as const },
    { label: "Is not", value: "ne" as const },
    { label: "Is empty", value: "isEmpty" as const },
    { label: "Is not empty", value: "isNotEmpty" as const },
  ],
  numericOperators: [
    { label: "Is", value: "eq" as const },
    { label: "Is not", value: "ne" as const },
    { label: "Is less than", value: "lt" as const },
    { label: "Is greater than", value: "gt" as const },
    { label: "Is between", value: "isBetween" as const },
    { label: "Is empty", value: "isEmpty" as const },
    { label: "Is not empty", value: "isNotEmpty" as const },
  ],
  dateOperators: [
    { label: "Is", value: "eq" as const },
    { label: "Is not", value: "ne" as const },
    { label: "Is before", value: "lt" as const },
    { label: "Is after", value: "gt" as const },
    { label: "Is between", value: "isBetween" as const },
    { label: "Is empty", value: "isEmpty" as const },
    { label: "Is not empty", value: "isNotEmpty" as const },
  ],
  selectOperators: [
    { label: "Is", value: "eq" as const },
    { label: "Is not", value: "ne" as const },
    { label: "Is empty", value: "isEmpty" as const },
    { label: "Is not empty", value: "isNotEmpty" as const },
  ],
  multiSelectOperators: [
    { label: "Has any of", value: "inArray" as const },
    { label: "Has none of", value: "notInArray" as const },
    { label: "Is empty", value: "isEmpty" as const },
    { label: "Is not empty", value: "isNotEmpty" as const },
  ],
  booleanOperators: [
    { label: "Is", value: "eq" as const },
    { label: "Is not", value: "ne" as const },
  ],
  filterVariants: [
    "text", "number", "range", "date", "dateRange", "boolean", "select", "multiSelect"
  ] as const,
  operators: [
    "iLike", "notILike", "eq", "ne", "inArray", "notInArray", 
    "isEmpty", "isNotEmpty", "lt", "gt", "isBetween"
  ] as const,
}; 

// URL Search Parameters Types
export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface DataTableSearchParams {
  page?: string;
  pageSize?: string;
  sort?: string;
  filters?: string;
  visibility?: string;
}

export interface DataTableState {
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
}

// Utility Functions for URL Search Parameters
export function parseSearchParams(searchParams: SearchParams): Partial<DataTableState> {
  const state: Partial<DataTableState> = {};

  // Parse pagination
  const page = searchParams.page ? parseInt(searchParams.page as string) - 1 : 0;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize as string) : 10;
  state.pagination = {
    pageIndex: Math.max(0, page),
    pageSize: Math.max(1, pageSize),
  };

  // Parse sorting
  if (searchParams.sort) {
    try {
      const sortString = searchParams.sort as string;
      state.sorting = sortString.split(',').map(sort => {
        const [id, desc] = sort.split(':');
        return {
          id,
          desc: desc === 'desc'
        };
      });
    } catch {
      state.sorting = [];
    }
  } else {
    state.sorting = [];
  }

  // Parse filters
  if (searchParams.filters) {
    try {
      const filtersString = decodeURIComponent(searchParams.filters as string);
      state.columnFilters = JSON.parse(filtersString);
    } catch {
      state.columnFilters = [];
    }
  } else {
    state.columnFilters = [];
  }

  // Parse column visibility
  if (searchParams.visibility) {
    try {
      const visibilityString = decodeURIComponent(searchParams.visibility as string);
      state.columnVisibility = JSON.parse(visibilityString);
    } catch {
      state.columnVisibility = {};
    }
  } else {
    state.columnVisibility = {};
  }

  return state;
}

export function serializeTableState(state: DataTableState): DataTableSearchParams {
  const params: DataTableSearchParams = {};

  // Serialize pagination
  if (state.pagination.pageIndex > 0) {
    params.page = (state.pagination.pageIndex + 1).toString();
  }
  if (state.pagination.pageSize !== 10) {
    params.pageSize = state.pagination.pageSize.toString();
  }

  // Serialize sorting
  if (state.sorting.length > 0) {
    params.sort = state.sorting
      .map(sort => `${sort.id}:${sort.desc ? 'desc' : 'asc'}`)
      .join(',');
  }

  // Serialize filters
  if (state.columnFilters.length > 0) {
    params.filters = encodeURIComponent(JSON.stringify(state.columnFilters));
  }

  // Serialize column visibility (only if columns are hidden)
  const hiddenColumns = Object.entries(state.columnVisibility).filter(([, visible]) => !visible);
  if (hiddenColumns.length > 0) {
    params.visibility = encodeURIComponent(JSON.stringify(state.columnVisibility));
  }

  return params;
}

export function updateSearchParams(
  currentParams: URLSearchParams,
  newParams: DataTableSearchParams
): URLSearchParams {
  const updatedParams = new URLSearchParams(currentParams);

  // Remove existing data table params
  updatedParams.delete('page');
  updatedParams.delete('pageSize');
  updatedParams.delete('sort');
  updatedParams.delete('filters');
  updatedParams.delete('visibility');

  // Add new params
  Object.entries(newParams).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      updatedParams.set(key, value);
    }
  });

  return updatedParams;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  }
}

export interface Option {
  label: string;
  value: string;
  count?: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export type FilterOperator = DataTableConfig["operators"][number];
export type FilterVariant = DataTableConfig["filterVariants"][number];

export interface ExtendedColumnFilter<TData> {
  id: Extract<keyof TData, string>;
  value: string | string[] | number | boolean | Date;
  variant: FilterVariant;
  operator: FilterOperator;
  filterId: string;
} 