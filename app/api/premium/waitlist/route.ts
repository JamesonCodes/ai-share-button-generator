import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
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

    // Prepare custom properties for Resend
    // Map feature IDs to property names (only properties that exist in Resend)
    const properties: Record<string, string> = {
      interested_analytics: features.includes('analytics') ? 'true' : 'false',
      interested_custom_themes: features.includes('custom-themes') ? 'true' : 'false',
      interested_white_label: features.includes('white-label') ? 'true' : 'false',
    };

    // Log what we're sending for debugging
    console.log('Creating contact with properties:', properties);
    console.log('Features array:', features);

    // Add contact to Resend audience
    // Using Resend Contacts API
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    
    const contactData: any = {
      email: email.trim(),
      unsubscribed: false,
      properties: properties,
      // Don't include firstName/lastName to prevent auto-parsing from email
    };

    // Only include audienceId if provided
    if (audienceId) {
      contactData.audienceId = audienceId;
    }

    console.log('Contact data being sent:', JSON.stringify(contactData, null, 2));

    let { data, error } = await resend.contacts.create(contactData);
    
    // If contact already exists, update it with the new properties
    if (error && (error.message?.includes('already exists') || error.message?.includes('duplicate'))) {
      console.log('Contact already exists, updating with properties...');
      
      // Update existing contact with properties
      const updateResult = await resend.contacts.update({
        email: email.trim(),
        properties: properties,
      });
      
      if (updateResult.error) {
        console.error('Resend update error:', updateResult.error);
        return NextResponse.json(
          {
            success: true,
            message: 'You are already on the waitlist',
            warning: 'Could not update your preferences',
          },
          { status: 200 }
        );
      }
      
      console.log('Update result:', JSON.stringify(updateResult.data, null, 2));
      
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
      console.error('Resend API error:', error);
      throw new Error(error.message || 'Failed to add contact to Resend');
    }
    
    if (data) {
      console.log('Resend create response:', JSON.stringify(data, null, 2));
      
      // Update contact immediately after creation to ensure properties are set
      // Sometimes properties don't get set on initial create
      console.log('Updating contact to ensure properties are set...');
      const updateResult = await resend.contacts.update({
        email: email.trim(),
        properties: properties,
      });
      
      if (updateResult.error) {
        console.error('Resend update error after create:', updateResult.error);
      } else {
        console.log('Update after create result:', JSON.stringify(updateResult.data, null, 2));
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
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      {
        message: error.message || 'Failed to join waitlist. Please try again.',
      },
      { status: 500 }
    );
  }
}
