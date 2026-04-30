import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subject, message } = body

    // Validation
    if (!subject || !message) {
      return NextResponse.json(
        { error: 'Subject and message are required' },
        { status: 400 }
      )
    }

    // Create transporter - using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content - email stays hidden
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: 'sarajhameed@hotmail.com', // Hidden - your email
      subject: `Portfolio Contact: ${subject}`,
      text: `
Subject: ${subject}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Contact Form Submission</h2>
  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
    <p><strong>Subject:</strong> ${subject}</p>
  </div>
  <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin-top: 20px;">
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
  </div>
  <p style="color: #64748b; font-size: 12px; margin-top: 30px; text-align: center;">
    Sent from your portfolio contact form at ${new Date().toLocaleString()}
  </p>
</div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    
    // More specific error messages
    let errorMessage = 'Failed to send message. Please try again.'
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email service configuration error. Please contact directly.'
      } else if (error.message.includes('Timeout')) {
        errorMessage = 'Connection timeout. Please try again.'
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
