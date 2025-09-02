import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InputField } from '../components/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    helperText: 'This is a helper text',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    invalid: true,
    errorMessage: 'Invalid email address',
  },
};

export const Loading: Story = {
  args: {
    label: 'Username',
    placeholder: 'Loading...',
    loading: true,
  },
};

