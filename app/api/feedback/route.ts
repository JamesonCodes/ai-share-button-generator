import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Rate limiting configuration
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000; // 1 minute
const rateLimitMap = new Map<string, number[]>();

// Security limits
const MAX_EMAIL_LENGTH = 254; // RFC 5321 limit
const MAX_MESSAGE_LENGTH = 2000; // Matches frontend limit
const MAX_REQUEST_BODY_SIZE = 10 * 1024; // 10KB max request body

/**
 * Sanitize string by removing control characters and limiting length
 */
function sanitizeString(value: string, maxLength: number): string {
  if (!value || typeof value !== 'string') {
    return '';
  }
  
  // Remove control characters except newlines, tabs, and carriage returns
  let sanitized = value.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  
  // Trim and limit length
  sanitized = sanitized.trim();
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

/**
 * Extract client IP address from request headers
 * Handles Vercel's proxy headers (x-forwarded-for, x-real-ip)
 */
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  // Fallback (shouldn't happen in Vercel, but good to have)
  return 'unknown';
}

/**
 * Check if the IP address has exceeded the rate limit
 * Returns true if allowed, false if rate limited
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  
  // Get existing timestamps for this IP
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps outside the current window
  const recentTimestamps = timestamps.filter(ts => ts > windowStart);
  
  // Check if limit exceeded
  if (recentTimestamps.length >= MAX_REQUESTS) {
    return false;
  }
  
  // Add current timestamp and update map
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  
  // Clean up old entries periodically (every 100 requests to avoid overhead)
  if (Math.random() < 0.01) {
    for (const [key, values] of rateLimitMap.entries()) {
      const filtered = values.filter(ts => ts > windowStart);
      if (filtered.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, filtered);
      }
    }
  }
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Validate Content-Type header
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { message: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    // Rate limiting check
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // Check for API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return NextResponse.json(
        { message: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      const text = await request.text();
      
      // Check body size
      if (text.length > MAX_REQUEST_BODY_SIZE) {
        return NextResponse.json(
          { message: 'Request body too large' },
          { status: 413 }
        );
      }
      
      body = JSON.parse(text);
    } catch (parseError) {
      return NextResponse.json(
        { message: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const { email, rating, message } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Sanitize and normalize email (lowercase, trim)
    const emailTrimmed = email.trim().toLowerCase();
    
    // Check email length
    if (emailTrimmed.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { message: 'Email address is too long' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate rating
    if (!rating || typeof rating !== 'string') {
      return NextResponse.json(
        { message: 'Rating is required' },
        { status: 400 }
      );
    }

    // Validate rating is between 1-5
    if (!['1', '2', '3', '4', '5'].includes(rating)) {
      return NextResponse.json(
        { message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Validate message if provided (optional but should be string if present)
    if (message !== undefined && typeof message !== 'string') {
      return NextResponse.json(
        { message: 'Message must be a string' },
        { status: 400 }
      );
    }

    // Sanitize message if provided
    let sanitizedMessage: string | undefined;
    if (message && typeof message === 'string') {
      sanitizedMessage = sanitizeString(message, MAX_MESSAGE_LENGTH);
    }

    // Prepare properties for Resend
    const properties: Record<string, string> = {
      feedback_rating: rating,
    };

    // Only include message if provided and not empty after sanitization
    if (sanitizedMessage && sanitizedMessage.length > 0) {
      properties.feedback_message = sanitizedMessage;
    }

    // Get feedback audience ID
    const audienceId = process.env.RESEND_FEEDBACK_AUDIENCE_ID;
    
    // Use normalized email (lowercase, trimmed)
    const contactEmail = emailTrimmed;

    const contactData: any = {
      email: contactEmail,
      unsubscribed: false,
      properties: properties,
    };

    // Only include audienceId if provided
    if (audienceId) {
      contactData.audienceId = audienceId;
    }

    let { data, error } = await resend.contacts.create(contactData);
    
    // If contact already exists, update it with the new feedback properties
    if (error && (error.message?.includes('already exists') || error.message?.includes('duplicate'))) {
      // Update existing contact with new feedback properties
      const updateResult = await resend.contacts.update({
        email: contactEmail,
        properties: properties,
      });
      
      if (updateResult.error) {
        console.error('Resend update error:', updateResult.error.message || 'Unknown error');
        return NextResponse.json(
          {
            success: true,
            message: 'Thank you for your feedback!',
            warning: 'Could not update your previous feedback',
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for your feedback!',
          data: updateResult.data,
        },
        { status: 200 }
      );
    }

    if (error) {
      console.error('Resend API error:', error.message || 'Unknown error');
      throw new Error(error.message || 'Failed to submit feedback');
    }
    
    if (data) {
      // Update contact immediately after creation to ensure properties are set
      // Sometimes properties don't get set on initial create
      const updateResult = await resend.contacts.update({
        email: contactEmail,
        properties: properties,
      });
      
      if (updateResult.error) {
        console.error('Resend update error after create:', updateResult.error.message || 'Unknown error');
        // Don't fail the request if update fails, properties might still be set
      }
    }

    // Successfully submitted feedback
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your feedback!',
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Log error without exposing sensitive information
    const errorMessage = error?.message || 'Unknown error';
    console.error('Feedback API error:', errorMessage);
    return NextResponse.json(
      {
        message: errorMessage || 'Failed to submit feedback. Please try again.',
      },
      { status: 500 }
    );
  }
}
