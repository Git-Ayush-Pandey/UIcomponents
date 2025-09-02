import React, { useId, useState } from 'react';
import clsx from 'clsx';

export interface InputFieldProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password';
  onClear?: () => void;           
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  onClear,
}) => {
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = invalid && errorMessage ? `${inputId}-error` : undefined;
  const [showPassword, setShowPassword] = useState(false);

  const base =
    'border rounded p-2 w-full transition outline-none focus:ring-2 focus:ring-offset-0';
  const byVariant = {
    filled: 'bg-gray-100 border-gray-300 focus:ring-gray-400 dark:bg-gray-800 dark:border-gray-700',
    outlined: 'bg-white border-gray-400 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700',
    ghost: 'bg-transparent border-transparent focus:ring-blue-500',
  } as const;

  const bySize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  } as const;

  const isPassword = type === 'password';
  const effectiveType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid || undefined}
          aria-busy={loading || undefined}
          aria-describedby={invalid ? errorId : helperId}
          type={effectiveType}
          className={clsx(
            base,
            byVariant[variant],
            bySize[size],
            invalid && 'border-red-500 focus:ring-red-500',
            (disabled || loading) && 'opacity-60 cursor-not-allowed pr-10',
            isPassword && 'pr-10',
            onClear && value ? 'pr-20' : null
          )}
        />

        {onClear && value ? (
          <button
            type="button"
            aria-label="Clear input"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ×
          </button>
        ) : null}

        {isPassword ? (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((s) => !s)}
            className={clsx(
              'absolute top-1/2 -translate-y-1/2',
              onClear && value ? 'right-10' : 'right-2',
              'px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        ) : null}

        {loading ? (
          <span
            aria-hidden="true"
            className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin"
          >
            ⏳
          </span>
        ) : null}
      </div>

      {helperText && !invalid && (
        <span id={helperId} className="text-gray-500 text-sm">
          {helperText}
        </span>
      )}
      {invalid && errorMessage && (
        <span id={errorId} className="text-red-500 text-sm">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
