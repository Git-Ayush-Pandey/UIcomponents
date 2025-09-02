import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTable, Column } from './DataTable';

type User = { id: number; name: string; email: string; };

const data: User[] = [
  { id: 1, name: 'Bob', email: 'bob@test.com' },
  { id: 2, name: 'Alice', email: 'alice@test.com' },
  { id: 3, name: 'Charlie', email: 'charlie@test.com' },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={data} columns={columns} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4); 
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable data={[]} columns={columns} loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('sorts data by column when header clicked', () => {
    render(<DataTable data={data} columns={columns} />);
    const nameHeader = screen.getByRole('columnheader', { name: 'Name' });

    fireEvent.click(nameHeader); 
    const rowsAsc = screen.getAllByRole('row');
    expect(within(rowsAsc[1]).getByText('Alice')).toBeInTheDocument();
    expect(within(rowsAsc[2]).getByText('Bob')).toBeInTheDocument();

    fireEvent.click(nameHeader);
    const rowsDesc = screen.getAllByRole('row');
    expect(within(rowsDesc[1]).getByText('Charlie')).toBeInTheDocument();
    expect(within(rowsDesc[2]).getByText('Bob')).toBeInTheDocument();
  });

  it('allows row selection', () => {
    const onRowSelect = vi.fn();
    render(<DataTable data={data} columns={columns} selectable onRowSelect={onRowSelect} />);
    const aliceRow = screen.getByText('Alice').closest('tr')!;
    fireEvent.click(aliceRow);
    expect(onRowSelect).toHaveBeenCalledWith([data[1]]);
  });
});
