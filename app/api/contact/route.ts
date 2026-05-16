import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, service, city, details } = body

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      )
    }

    // Create mailto link content for the business
    const subject = `New Quote Request from ${name}`
    const emailBody = `
New quote request from the website:

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Project Type: ${service}
City: ${city || "Not provided"}
Details: ${details || "None provided"}

---
Sent from Proactive Painting website
    `.trim()

    // For now, we'll use a simple approach that works without external services
    // In production, you'd integrate with SendGrid, Resend, or similar
    
    // Option 1: Use Formspree (recommended - free tier available)
    // Uncomment and add your Formspree form ID:
    /*
    const formspreeResponse = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        service,
        city,
        details,
        _subject: subject,
      }),
    })
    
    if (!formspreeResponse.ok) {
      throw new Error("Failed to send to Formspree")
    }
    */

    // For demonstration, log the submission
    console.log("[v0] Contact form submission:", {
      to: "proactivepaintingsv@gmail.com",
      subject,
      body: emailBody,
    })

    return NextResponse.json({ 
      success: true, 
      message: "Quote request received! We'll get back to you within one business day.",
      // Include mailto link as fallback
      mailtoLink: `mailto:proactivepaintingsv@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
    })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please call us directly at (408) 516-7750." },
      { status: 500 }
    )
  }
}
