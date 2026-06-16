// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { rating, category, message } = body

  if (!message || message.trim().length === 0) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 })
  }
  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating is required" }, { status: 400 })
  }

  const webhookUrl = process.env.FEEDBACK_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Feedback webhook not configured" },
      { status: 500 }
    )
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rating,
      category: category || "General",
      message,
      name: body.name ?? null,
      email: body.email ?? null,
      submittedAt: new Date().toISOString(),
    }),
  })

  if (!res.ok) {
    console.error("Webhook error:", res.status, await res.text())
    return NextResponse.json(
      { error: "Failed to deliver feedback" },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
