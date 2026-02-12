import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

// Create reusable transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.eu',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // SSL on port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function buildEmailHtml(data: ContactFormData): string {
  const phone = data.phone || '–';
  const message = data.message || '–';

  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #32302F; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #FFFFFF; font-size: 20px; margin: 0;">Neue Kontaktanfrage</h1>
      </div>
      <div style="background-color: #FFFFFF; padding: 32px; border: 1px solid #E5E5E5; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #F0F0F0; color: #8A8785; font-size: 14px; width: 120px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #F0F0F0; color: #32302F; font-size: 14px;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #F0F0F0; color: #8A8785; font-size: 14px;">Unternehmen</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #F0F0F0; color: #32302F; font-size: 14px;">${escapeHtml(data.company)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #F0F0F0; color: #8A8785; font-size: 14px;">E-Mail</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #F0F0F0; color: #32302F; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #32302F;">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #F0F0F0; color: #8A8785; font-size: 14px;">Telefon</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #F0F0F0; color: #32302F; font-size: 14px;">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #8A8785; font-size: 14px; vertical-align: top;">Nachricht</td>
            <td style="padding: 12px 0; color: #32302F; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #F0F0F0;">
          <p style="color: #8A8785; font-size: 12px; margin: 0;">Gesendet über das Kontaktformular auf soluty.io</p>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
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

    // Check SMTP configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials not configured');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
    const transporter = createTransporter();

    // Send email
    await transporter.sendMail({
      from: `"Soluty Kontaktformular" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      replyTo: data.email,
      subject: `Kontaktanfrage von ${data.name} – ${data.company}`,
      html: buildEmailHtml(data),
    });

    console.log('Contact form email sent:', {
      from: data.email,
      name: data.name,
      company: data.company,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
