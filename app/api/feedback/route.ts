import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Rate limiting configuration
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000; // 1 minute
const rateLimitMap = new Map<string, number[]>();

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

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { email, rating, message } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
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

    // Prepare properties for Resend
    const properties: Record<string, string> = {
      feedback_rating: rating,
    };

    // Only include message if provided and not empty
    if (message && message.trim()) {
      properties.feedback_message = message.trim();
    }

    // Get feedback audience ID
    const audienceId = process.env.RESEND_FEEDBACK_AUDIENCE_ID;
    
    const contactEmail = email.trim();

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
