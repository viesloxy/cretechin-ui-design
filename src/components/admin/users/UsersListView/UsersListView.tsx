"use client";

import { useMemo } from "react";
import type { User, UserFilter, UserStats as UserStatsType } from "@/lib/users/types";
import {
  filterUsers,
  sortUsers,
  paginate,
  hasActiveFilters as hasActive,
} from "@/lib/users/utils";
import { UserStats } from "./UserStats";
import { UserToolbar } from "./UserToolbar";
import { FilterChips } from "./FilterChips";
import { UserTable } from "./UserTable";
import { UserEmptyState } from "./UserEmptyState";
import { UserPagination } from "./UserPagination";

interface UsersListViewProps {
  users: User[];
  stats: UserStatsType;
  filters: UserFilter;
  currentAdminId: string;
  onFilterChange: (next: Partial<UserFilter>) => void;
  onResetFilters: () => void;
  onExport: () => void;
  onAddUser: () => void;
  onEdit: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onResetPassword: (id: string) => void;
}

export function UsersListView({
  users,
  stats,
  filters,
  currentAdminId,
  onFilterChange,
  onResetFilters,
  onExport,
  onAddUser,
  onEdit,
  onToggleStatus,
  onResetPassword,
}: UsersListViewProps) {
  const filtered = useMemo(
    () => sortUsers(filterUsers(users, filters), filters.sortBy),
    [users, filters],
  );

  const pagination = useMemo(
    () => paginate(filtered, filters.page, filters.perPage),
    [filtered, filters.page, filters.perPage],
  );

  const active = hasActive(filters);

  return (
    <div className="space-y-6">
      <UserStats stats={stats} />

      <UserToolbar
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onResetFilters}
        onExport={onExport}
        onAddUser={onAddUser}
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
        <UserEmptyState
          variant={users.length === 0 ? "no-data" : "no-results"}
          onReset={users.length > 0 ? onResetFilters : undefined}
        />
      ) : (
        <>
          <UserTable
            users={pagination.data}
            currentAdminId={currentAdminId}
            startIndex={pagination.startIndex}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
            onResetPassword={onResetPassword}
          />
          <UserPagination
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
