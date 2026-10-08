import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend will be initialized inside the handler to prevent build-time crashes
// if the environment variable is not yet set.

export async function POST(request: Request) {
  try {
    // Initialize Resend using the API key from environment variables
    const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

    const body = await request.json();
    const { name, email, phone, company, requirement, description, budget } = body;

    // Validate required fields
    if (!name || !email || !requirement || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine the recipient email (defaults to the one in .env.local, or a fallback)
    const toEmail = process.env.CONTACT_EMAIL || 'teqdeepseek@gmail.com';

    // Send the email using Resend
    const data = await resend.emails.send({
      from: 'Teqdeepseek Leads <onboarding@resend.dev>', // Use this for testing. For production, verify your domain in Resend and change to something like `leads@yourdomain.com`
      to: toEmail,
      subject: `New Lead: ${name} - ${requirement}`,
      replyTo: email,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Requirement:</strong> ${requirement}</p>
        <p><strong>Budget Range:</strong> ${budget || 'Not provided'}</p>
        <h3>Project Description:</h3>
        <p>${description.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
