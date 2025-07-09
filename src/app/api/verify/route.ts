// /app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const verifySid = process.env.TWILIO_VERIFY_SID!;

const client = twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { message: "Phone is required" },
        { status: 400 }
      );
    }

    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({
        to: `+${phone}`,
        channel: "sms",
      });

    return NextResponse.json({ status: verification.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to start verification" },
      { status: 500 }
    );
  }
}
