// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Thanks for subscribing to CarVoyance!",
      html: `
        <p>Hi there!</p>
        <p>Thank you for subscribing to <strong>CarVoyance</strong>. We're excited to have you on board! 🚗✨</p>
        <p>We'll notify you as soon as we launch.</p>
        <br/>
        <p>Best regards,<br/>The CarVoyance Team</p>
      `,
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.error("Email sending error:", err);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
