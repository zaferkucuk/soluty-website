'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { FormField } from './FormField';
import { SuccessMessage } from './SuccessMessage';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  textMuted: '#8A8785',
  textInverse: '#FFFFFF',
  brandPrimary: '#4DB6A0',
  brandHover: '#3DA08C',
  error: '#DC2626',
  errorSubtle: 'rgba(220, 38, 38, 0.1)',
  bgCard: '#FFFFFF',
};

const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

// Validation utilities
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
  return phoneRegex.test(phone);
};

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('finalCta');

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Honeypot for spam protection
  const [honeypot, setHoneypot] = useState('');

  // Time-based validation (record load time)
  const loadTimeRef = useRef<number>(Date.now());

  // Reset load time when form is reset
  useEffect(() => {
    loadTimeRef.current = Date.now();
  }, [status]);

  // Validation function for individual fields
  const validateField = useCallback((field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return t('validation.nameRequired');
        if (value.trim().length < 2) return t('validation.nameMinLength');
        return undefined;
      case 'company':
        if (!value.trim()) return t('validation.companyRequired');
        if (value.trim().length < 2) return t('validation.companyMinLength');
        return undefined;
      case 'email':
        if (!value.trim()) return t('validation.emailRequired');
        if (!isValidEmail(value)) return t('validation.emailInvalid');
        return undefined;
      case 'phone':
        if (value && !isValidPhone(value)) return t('validation.phoneInvalid');
        return undefined;
      case 'message':
        if (value.length > 1000) return t('validation.messageMaxLength');
        return undefined;
      default:
        return undefined;
    }
  }, [t]);

  // Validate all fields
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;

    const companyError = validateField('company', formData.company);
    if (companyError) newErrors.company = companyError;

    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validateField('phone', formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const messageError = validateField('message', formData.message);
    if (messageError) newErrors.message = messageError;

    return newErrors;
  }, [formData, validateField]);

  // Handle field change
  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle field blur (validate on blur)
  const handleBlur = (field: keyof FormData) => () => {
    setFocusedField(null);
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  // Handle focus
  const handleFocus = (field: string) => () => {
    setFocusedField(field);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous submit error
    setSubmitError(null);

    // Honeypot check (spam protection)
    if (honeypot) {
      // Silently fail for bots
      setStatus('success');
      return;
    }

    // Time-based validation (< 3 seconds = likely bot)
    const timeSinceLoad = Date.now() - loadTimeRef.current;
    if (timeSinceLoad < 3000) {
      // Silently fail for bots
      setStatus('success');
      return;
    }

    // Validate all fields
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Submit form
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _honeypot: honeypot,
          _loadTime: loadTimeRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setSubmitError(t('error.message', { email: 'info@soluty.de' }));
    }
  };

  // Handle retry after error
  const handleRetry = () => {
    setStatus('idle');
    setSubmitError(null);
    loadTimeRef.current = Date.now();
  };

  // Handle sending another request after success
  const handleSendAnother = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    });
    setErrors({});
    setStatus('idle');
    setSubmitError(null);
    loadTimeRef.current = Date.now();
  };

  // Render success state
  if (status === 'success') {
    return <SuccessMessage onSendAnother={handleSendAnother} />;
  }

  const isSubmitting = status === 'submitting';

  return (
    <div
      className="p-6 md:p-8 rounded-xl shadow-md"
      style={{
        backgroundColor: COLORS.bgCard,
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot field - visually hidden */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5">
          {/* Name Field */}
          <FormField
            label={t('form.name.label')}
            name="name"
            type="text"
            placeholder={t('form.name.placeholder')}
            value={formData.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            onFocus={handleFocus('name')}
            error={errors.name}
            isRequired
            isFocused={focusedField === 'name'}
          />

          {/* Company Field */}
          <FormField
            label={t('form.company.label')}
            name="company"
            type="text"
            placeholder={t('form.company.placeholder')}
            value={formData.company}
            onChange={handleChange('company')}
            onBlur={handleBlur('company')}
            onFocus={handleFocus('company')}
            error={errors.company}
            isRequired
            isFocused={focusedField === 'company'}
          />

          {/* Email Field */}
          <FormField
            label={t('form.email.label')}
            name="email"
            type="email"
            placeholder={t('form.email.placeholder')}
            value={formData.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            onFocus={handleFocus('email')}
            error={errors.email}
            isRequired
            isFocused={focusedField === 'email'}
          />

          {/* Phone Field */}
          <FormField
            label={t('form.phone.label')}
            name="phone"
            type="tel"
            placeholder={t('form.phone.placeholder')}
            value={formData.phone}
            onChange={handleChange('phone')}
            onBlur={handleBlur('phone')}
            onFocus={handleFocus('phone')}
            error={errors.phone}
            optionalText={t('form.phone.optional')}
            isFocused={focusedField === 'phone'}
          />

          {/* Message Field */}
          <FormField
            label={t('form.message.label')}
            name="message"
            type="textarea"
            placeholder={t('form.message.placeholder')}
            value={formData.message}
            onChange={handleChange('message')}
            onBlur={handleBlur('message')}
            onFocus={handleFocus('message')}
            error={errors.message}
            optionalText={t('form.message.optional')}
            maxLength={1000}
            isFocused={focusedField === 'message'}
          />

          {/* Error Banner */}
          {status === 'error' && submitError && (
            <div
              role="alert"
              className="p-4 rounded-lg"
              style={{
                backgroundColor: COLORS.errorSubtle,
                border: `1px solid ${COLORS.error}`,
              }}
            >
              <p
                className="text-sm font-medium mb-2"
                style={{
                  fontFamily: FONTS.sans,
                  color: COLORS.error,
                }}
              >
                {t('error.heading')}
              </p>
              <p
                className="text-sm"
                style={{
                  fontFamily: FONTS.sans,
                  color: COLORS.textSecondary,
                }}
              >
                {submitError}
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-3 text-sm font-medium underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  color: COLORS.brandPrimary,
                }}
              >
                {t('error.retry')}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-lg font-medium text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              fontFamily: FONTS.sans,
              backgroundColor: isSubmitting ? COLORS.brandPrimary : COLORS.brandPrimary,
              color: COLORS.textInverse,
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = COLORS.brandHover;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.brandPrimary;
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t('form.submitting')}
              </span>
            ) : (
              t('form.submit')
            )}
          </button>

          {/* Privacy Policy Link */}
          <p
            className="text-center text-sm"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textMuted,
            }}
          >
            {t.rich('form.privacy', {
              privacyLink: (chunks) => (
                <a
                  href="/de/datenschutz"
                  className="underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ color: COLORS.brandPrimary }}
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
