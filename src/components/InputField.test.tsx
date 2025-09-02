import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(<InputField label="Name" placeholder="Enter name" />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('shows error message when invalid', () => {
    render(<InputField label="Email" invalid errorMessage="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
