"use client";

import { useMemo } from "react";
import type { Event, EventFilter } from "@/lib/events/types";
import {
  filterEvents,
  sortEvents,
  paginate,
  hasActiveFilters as hasActive,
} from "@/lib/events/utils";
import { EventStats } from "./EventStats";
import { EventToolbar } from "./EventToolbar";
import { FilterChips } from "./FilterChips";
import { EventTable } from "./EventTable";
import { EventEmptyState } from "./EventEmptyState";
import { EventPagination } from "./EventPagination";

interface EventsListViewProps {
  events: Event[];
  stats: { total: number; upcoming: number; ongoing: number; finished: number; draft: number };
  filters: EventFilter;
  onFilterChange: (next: Partial<EventFilter>) => void;
  onResetFilters: () => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopyLink: (id: string) => void;
  onPreview: (id: string) => void;
}

export function EventsListView({
  events,
  stats,
  filters,
  onFilterChange,
  onResetFilters,
  onAdd,
  onEdit,
  onDelete,
  onCopyLink,
  onPreview,
}: EventsListViewProps) {
  const filtered = useMemo(
    () => sortEvents(filterEvents(events, filters), filters.sortBy),
    [events, filters],
  );

  const pagination = useMemo(
    () => paginate(filtered, filters.page, filters.perPage),
    [filtered, filters.page, filters.perPage],
  );

  const active = hasActive(filters);

  return (
    <div className="space-y-6">
      <EventStats stats={stats} />

      <EventToolbar
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onResetFilters}
        onAdd={onAdd}
        hasActiveFilters={active}
      />

      {active && (
        <FilterChips
          filters={filters}
          onFilterChange={onFilterChange}
          onReset={onResetFilters}
        />
      )}

      {filtered.length === 0 ? (
        <EventEmptyState
          variant={events.length === 0 ? "no-data" : "no-results"}
          onAdd={events.length === 0 ? onAdd : undefined}
          onReset={events.length > 0 ? onResetFilters : undefined}
        />
      ) : (
        <>
          <EventTable
            events={pagination.data}
            startIndex={pagination.startIndex}
            onEdit={onEdit}
            onDelete={onDelete}
            onCopyLink={onCopyLink}
            onPreview={onPreview}
          />
          <EventPagination
            pagination={pagination}
            perPage={filters.perPage}
            onPageChange={(p) => onFilterChange({ page: p })}
            onPerPageChange={(n) => onFilterChange({ perPage: n, page: 1 })}
          />
        </>
      )}
    </div>
  );
}
