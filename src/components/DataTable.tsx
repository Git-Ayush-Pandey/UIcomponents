// src/components/DataTable.tsx
import React, { useState } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  let sortedData = [...data];
  if (sortKey) {
    sortedData.sort((a, b) => {
      const valA = a[sortKey as keyof T];
      const valB = b[sortKey as keyof T];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const toggleRow = (id: string | number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
    onRowSelect?.(data.filter((d) => newSelected.has(d.id)));
  };

  const toggleAll = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set(data.map((d) => d.id));
      setSelected(all);
      onRowSelect?.(data);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200" role="table">
        <thead className="bg-gray-100">
          <tr role="row">
            {selectable && (
              <th className="p-2 border-b">
                <input
                  type="checkbox"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={toggleAll}
                  aria-label="Select All Rows"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                role="columnheader"
                scope="col"
                aria-sort={sortKey === col.key ? sortOrder : 'none'}
                onClick={() => col.sortable && handleSort(col.key)}
                className="p-2 text-left border-b cursor-pointer select-none hover:bg-gray-200"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="p-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr
                key={row.id}
                role="row"
                onClick={() => selectable && toggleRow(row.id)}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selected.has(row.id) ? 'bg-blue-100' : ''
                }`}
              >
                {selectable && (
                  <td className="p-2 border-b">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      readOnly
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} role="cell" className="p-2 border-b">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
