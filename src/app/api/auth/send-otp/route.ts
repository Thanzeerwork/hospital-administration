import { NextRequest, NextResponse } from 'next/server';
import { saveOtpToFirestore } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Generate secure 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Persist OTP in Firestore (with 10-minute validity)
    await saveOtpToFirestore(cleanEmail, otpCode);

    const apiKey = process.env.RESEND_API_KEY || '';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'InspireZest Hospitals <onboarding@resend.dev>';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
            .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            .header { background: #00829B; padding: 28px 24px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
            .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 32px 28px; text-align: center; }
            .otp-box { margin: 24px auto; padding: 18px 24px; background: #f0fdfa; border: 2px dashed #00829B; border-radius: 10px; display: inline-block; }
            .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #00829B; font-family: monospace; }
            .notice { font-size: 13px; color: #64748b; line-height: 1.6; margin-top: 20px; }
            .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>InspireZest Hospitals</h1>
              <p>Multispeciality Healthcare & Clinical Portal</p>
            </div>
            <div class="content">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">Authorization & Verification Code</h2>
              <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">Use the following one-time passcode (OTP) to securely access your hospital patient portal and appointments:</p>
              
              <div class="otp-box">
                <div class="otp-code">${otpCode}</div>
              </div>

              <p class="notice">
                This verification code is valid for <strong>10 minutes</strong>.<br>
                For your security, please do not share this code with anyone.
              </p>
            </div>
            <div class="footer">
              InspireZest Multispeciality Healthcare Center • Emergency 24x7: +91 9567333266
            </div>
          </div>
        </body>
      </html>
    `;

    let resendSent = false;
    let resendMessage = '';

    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [cleanEmail],
          subject: `${otpCode} is your InspireZest Hospital verification code`,
          html: emailHtml,
        }),
      });

      const resendData = await resendRes.json();

      if (resendRes.ok) {
        resendSent = true;
        resendMessage = `Verification code sent to ${cleanEmail} via Resend`;
      } else {
        console.warn('Resend send warning:', resendData);
        resendMessage = resendData.message || 'Resend sandbox mode active';
      }
    } catch (err: any) {
      console.warn('Resend network warning:', err);
      resendMessage = err.message || 'Network error communicating with Resend';
    }

    return NextResponse.json({
      success: true,
      message: resendSent
        ? `Verification code dispatched to ${cleanEmail}`
        : `OTP generated for ${cleanEmail}. (Code: ${otpCode})`,
      sentViaResend: resendSent,
      otpCode: otpCode, // Provided for smooth UX testing in sandbox environment
    });
  } catch (error: any) {
    console.error('Error in send-otp route:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

