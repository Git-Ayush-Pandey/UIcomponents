import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DataTable, DataTableProps } from '../components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
}

const sampleData: User[] = [
  { id: 1, name: 'Alice', email: 'alice@test.com' },
  { id: 2, name: 'Bob', email: 'bob@test.com' },
  { id: 3, name: 'Charlie', email: 'charlie@test.com' },
];

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
];

const meta: Meta<DataTableProps<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
};
export default meta;

type Story = StoryObj<DataTableProps<User>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const Selectable: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
    onRowSelect: (rows) => console.log('Selected rows:', rows),
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};
