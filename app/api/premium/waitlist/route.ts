import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, features, source } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

    // Add contact to Resend audience
    // Using Resend Contacts API
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    
    const contactData: any = {
      email: email.trim(),
      unsubscribed: false,
    };

    if (audienceId) {
      contactData.audienceId = audienceId;
    }

    const { data, error } = await resend.contacts.create(contactData);

    if (error) {
      console.error('Resend API error:', error);
      
      // If contact already exists, that's okay
      if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
        return NextResponse.json(
          {
            success: true,
            message: 'You are already on the waitlist',
          },
          { status: 200 }
        );
      }

      throw new Error(error.message || 'Failed to add contact to Resend');
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
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      {
        message: error.message || 'Failed to join waitlist. Please try again.',
      },
      { status: 500 }
    );
  }
}
