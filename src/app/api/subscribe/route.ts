// app/api/subscribe/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email, phone } = await req.json();

  if (!email && !phone) {
    return NextResponse.json(
      { message: "Email or phone is required" },
      { status: 400 }
    );
  }

  try {
    // 1. Отправка email только если есть email
    if (email) {
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
    }

    // 2. Отправка в Google Таблицу (email или phone)
    const formData = new URLSearchParams();
    if (email) formData.append("email", email);
    if (phone) formData.append("phone", phone);

    await fetch(
      "https://script.google.com/macros/s/AKfycbwURIqwaLDommxq6BEKxlyPB6m92aEMPp4I60t5M8sGe7iuYR39RShsgaAGXrkaay2iHw/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
