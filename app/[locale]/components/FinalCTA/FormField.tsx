'use client';

import { useId } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  isRequired?: boolean;
  optionalText?: string;
  maxLength?: number;
  isFocused?: boolean;
  onFocus?: () => void;
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  isRequired = false,
  optionalText,
  maxLength,
  isFocused = false,
  onFocus,
}: FormFieldProps) {
  const generatedId = useId();
  const inputId = `${name}-${generatedId}`;
  const errorId = `${name}-error-${generatedId}`;

  const hasError = !!error;

  const getBorderColor = () => {
    if (hasError) return 'var(--color-error)';
    if (isFocused) return 'var(--color-brand-primary)';
    return 'var(--color-border)';
  };

  const getBoxShadow = () => {
    if (hasError) return '0 0 0 3px var(--color-error-subtle)';
    if (isFocused) return '0 0 0 3px var(--color-brand-subtle)';
    return 'none';
  };

  const sharedStyles: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-bg-card)',
    border: `1px solid ${getBorderColor()}`,
    borderRadius: '8px',
    padding: '12px 16px',
    outline: 'none',
    boxShadow: getBoxShadow(),
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  };

  const sharedClasses = 'w-full focus:outline-none';

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label
        htmlFor={inputId}
        className="flex items-baseline gap-1"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
        }}
      >
        {label}
        {!isRequired && optionalText && (
          <span
            style={{
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--color-text-muted)',
            }}
          >
            {optionalText}
          </span>
        )}
      </label>

      {/* Input or Textarea */}
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-required={isRequired}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          maxLength={maxLength}
          rows={4}
          className={sharedClasses}
          style={{
            ...sharedStyles,
            resize: 'vertical',
            minHeight: '120px',
          }}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-required={isRequired}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={sharedClasses}
          style={{
            ...sharedStyles,
            height: '48px',
          }}
        />
      )}

      {/* Error Message */}
      {hasError && (
        <p
          id={errorId}
          role="alert"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--color-error)',
            marginTop: '2px',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
