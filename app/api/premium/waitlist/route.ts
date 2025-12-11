import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Rate limiting configuration
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000; // 1 minute
const rateLimitMap = new Map<string, number[]>();

// Security limits
const MAX_EMAIL_LENGTH = 254; // RFC 5321 limit
const MAX_REQUEST_BODY_SIZE = 10 * 1024; // 10KB max request body

// Allowed feature values
const ALLOWED_FEATURES = ['analytics', 'custom-themes', 'white-label'] as const;

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
    const { email, features, source } = body;

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

    // Validate features
    if (!features || !Array.isArray(features) || features.length === 0) {
      return NextResponse.json(
        { message: 'At least one feature must be selected' },
        { status: 400 }
      );
    }

    // Validate and sanitize features array - only allow predefined values
    const sanitizedFeatures = features.filter((feature: any) => 
      typeof feature === 'string' && ALLOWED_FEATURES.includes(feature as typeof ALLOWED_FEATURES[number])
    );

    if (sanitizedFeatures.length === 0) {
      return NextResponse.json(
        { message: 'At least one valid feature must be selected' },
        { status: 400 }
      );
    }

    // Prepare custom properties for Resend
    // Map feature IDs to property names (only properties that exist in Resend)
    // Use sanitizedFeatures instead of original features array
    const properties: Record<string, string> = {
      interested_analytics: sanitizedFeatures.includes('analytics') ? 'true' : 'false',
      interested_custom_themes: sanitizedFeatures.includes('custom-themes') ? 'true' : 'false',
      interested_white_label: sanitizedFeatures.includes('white-label') ? 'true' : 'false',
    };

    // Add contact to Resend audience
    // Using Resend Contacts API
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    
    // Use normalized email (lowercase, trimmed)
    const contactEmail = emailTrimmed;
    
    const contactData: any = {
      email: contactEmail,
      unsubscribed: false,
      properties: properties,
      // Don't include firstName/lastName to prevent auto-parsing from email
    };

    // Only include audienceId if provided
    if (audienceId) {
      contactData.audienceId = audienceId;
    }

    let { data, error } = await resend.contacts.create(contactData);
    
    // If contact already exists, update it with the new properties
    if (error && (error.message?.includes('already exists') || error.message?.includes('duplicate'))) {
      // Update existing contact with properties
      const updateResult = await resend.contacts.update({
        email: contactEmail,
        properties: properties,
      });
      
      if (updateResult.error) {
        console.error('Resend update error:', updateResult.error.message || 'Unknown error');
        return NextResponse.json(
          {
            success: true,
            message: 'You are already on the waitlist',
            warning: 'Could not update your preferences',
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        {
          success: true,
          message: 'Successfully updated your waitlist preferences',
          data: updateResult.data,
        },
        { status: 200 }
      );
    }

    if (error) {
      console.error('Resend API error:', error.message || 'Unknown error');
      throw new Error(error.message || 'Failed to add contact to Resend');
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
      }
    }

    // Successfully added to waitlist
    return NextResponse.json(
      {
        success: true,
        message: 'Successfully added to waitlist',
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Log error without exposing sensitive information
    const errorMessage = error?.message || 'Unknown error';
    console.error('Waitlist API error:', errorMessage);
    return NextResponse.json(
      {
        message: errorMessage || 'Failed to join waitlist. Please try again.',
      },
      { status: 500 }
    );
  }
}
