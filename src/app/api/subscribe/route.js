import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create Nodemailer Transporter
const createTransporter = async () => {
  // 1. Check if custom SMTP credentials exist in environment
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      host: host || "smtp.gmail.com",
      port: port,
      secure: port === 465,
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  // 2. Fallback to Ethereal / Test SMTP account if env credentials are not set
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email address is required" },
        { status: 400 }
      );
    }

    const recipientEmail = email.trim();

    // Create Nodemailer transporter
    const transporter = await createTransporter();

    // Define email options
    const mailOptions = {
      from: `"Nature Daily Blogs 🌿" <${process.env.SMTP_USER || "no-reply@naturedaily.com"}>`,
      to: recipientEmail,
      subject: "🎉 Welcome to Nature Daily Blogs! (Subscription Confirmed)",
      text: `Hello!\n\nThank you for subscribing to Nature Daily Blogs with ${recipientEmail}.\n\nYou are now set up to receive our top daily stories on Technology, Startup culture, and Lifestyle.\n\nBest regards,\nNature Daily Blogs Team`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0f1a; color: #e2e8f0; padding: 30px; border-radius: 12px; max-width: 550px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #4ade80; margin: 0; font-size: 26px;">🌿 Nature Daily Blogs</h1>
            <p style="color: #7c8fa6; font-size: 14px; margin-top: 5px;">Daily Stories on Tech, Startups & Lifestyle</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #1e2d45; margin: 20px 0;" />
          <h2 style="color: #ffffff; font-size: 20px;">Welcome Aboard! 🎉</h2>
          <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
            Thank you for subscribing with <strong>${recipientEmail}</strong>. You'll now receive our best daily blogs and insightful stories directly in your inbox.
          </p>
          <div style="background-color: #161d2e; border-left: 4px solid #4ade80; padding: 15px; border-radius: 6px; margin: 25px 0;">
            <p style="margin: 0; color: #4ade80; font-weight: bold; font-size: 14px;">⚡ Subscription Active</p>
            <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 13px;">Sent via Nodemailer Engine</p>
          </div>
          <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 30px;">
            © ${new Date().getFullYear()} Nature Daily Blogs. All rights reserved.
          </p>
        </div>
      `,
    };

    // Send email using Nodemailer
    const info = await transporter.sendMail(mailOptions);

    console.log("Nodemailer Email Sent. Message ID:", info.messageId);

    // Get preview URL if test transport was used
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log("Nodemailer Test Preview URL:", previewUrl);
    }

    return NextResponse.json({
      success: true,
      email: recipientEmail,
      messageId: info.messageId,
      previewUrl: previewUrl || null,
      message: `Email sent via Nodemailer to ${recipientEmail}`,
      deliveredAt: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    });
  } catch (error) {
    console.error("Nodemailer dispatch error:", error);
    return NextResponse.json(
      { success: false, message: "Nodemailer email dispatch failed: " + error.message },
      { status: 500 }
    );
  }
}
