import { NextRequest, NextResponse } from 'next/server';

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

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message?: string;
  _honeypot?: string;
  _loadTime?: number;
}

interface ValidationError {
  field: string;
  message: string;
}

function validateFormData(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name || !data.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  // Company validation
  if (!data.company || !data.company.trim()) {
    errors.push({ field: 'company', message: 'Company is required' });
  } else if (data.company.trim().length < 2) {
    errors.push({ field: 'company', message: 'Company must be at least 2 characters' });
  }

  // Email validation
  if (!data.email || !data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  // Phone validation (optional)
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone format' });
  }

  // Message validation (optional, max 1000 chars)
  if (data.message && data.message.length > 1000) {
    errors.push({ field: 'message', message: 'Message must be 1000 characters or less' });
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Honeypot check (spam protection)
    if (data._honeypot) {
      // Return success to fool bots, but don't process
      return NextResponse.json({ success: true });
    }

    // Time-based validation (< 3 seconds = likely bot)
    if (data._loadTime) {
      const timeSinceLoad = Date.now() - data._loadTime;
      if (timeSinceLoad < 3000) {
        // Return success to fool bots, but don't process
        return NextResponse.json({ success: true });
      }
    }

    // Server-side validation
    const validationErrors = validateFormData(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending here
    // Options:
    // - nodemailer with SMTP
    // - Resend API
    // - SendGrid
    // - AWS SES
    //
    // For now, log the submission (remove in production)
    console.log('Contact form submission:', {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || '(not provided)',
      message: data.message || '(not provided)',
      timestamp: new Date().toISOString(),
    });

    // Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
