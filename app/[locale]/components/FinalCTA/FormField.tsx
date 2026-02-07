'use client';

import { useId } from 'react';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  error: '#DC2626',
  errorSubtle: 'rgba(220, 38, 38, 0.1)',
  border: 'rgba(50, 48, 47, 0.12)',
  borderStrong: 'rgba(50, 48, 47, 0.25)',
  focusRing: 'rgba(50, 48, 47, 0.08)',
  bgCard: '#FFFFFF',
};

const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

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
    if (hasError) return COLORS.error;
    if (isFocused) return COLORS.borderStrong;
    return COLORS.border;
  };

  const getBoxShadow = () => {
    if (hasError) return `0 0 0 3px ${COLORS.errorSubtle}`;
    if (isFocused) return `0 0 0 3px ${COLORS.focusRing}`;
    return 'none';
  };

  const sharedStyles = {
    width: '100%',
    fontFamily: FONTS.sans,
    fontSize: '16px',
    color: COLORS.textPrimary,
    backgroundColor: COLORS.bgCard,
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
      {/* form-label */}
      <label
        htmlFor={inputId}
        className="flex items-baseline gap-1"
        style={{
          fontFamily: FONTS.sans,
          fontSize: '14px',
          fontWeight: 500,
          color: COLORS.textPrimary,
        }}
      >
        {label}
        {!isRequired && optionalText && (
          <span
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: COLORS.textSecondary,
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
            fontFamily: FONTS.sans,
            fontSize: '14px',
            fontWeight: 400,
            color: COLORS.error,
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
