import nodemailer from "nodemailer"

// ─── Input validation ──────────────────────────────────────────────────────
function validate({ name, email, message }) {
  if (!name?.trim())    return "Name is required."
  if (!email?.trim())   return "Email is required."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address."
  if (!message?.trim()) return "Message is required."
  return null
}

// ─── Handler ───────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." })
  }

  const { name, email, company, projectDesc, message } = req.body ?? {}

  // Validate
  const validationError = validate({ name, email, message })
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  // Guard: env vars must be set
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars.")
    return res.status(500).json({ error: "Server configuration error." })
  }

  // Build transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  // Compose email
  const subject = company
    ? `New Enquiry — ${company} (${name})`
    : `New Enquiry — ${name}`

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; color: #1a1a2e;">
      <h2 style="color: #2563eb; margin-bottom: 4px;">New Contact Enquiry</h2>
      <p style="color: #666; margin-top: 0; font-size: 13px;">Submitted via pce.com contact form</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 120px; vertical-align: top;"><strong>Name</strong></td>
          <td style="padding: 8px 0;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Email</strong></td>
          <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a></td>
        </tr>
        ${company ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Company</strong></td>
          <td style="padding: 8px 0;">${escapeHtml(company)}</td>
        </tr>` : ""}
      </table>

      ${projectDesc ? `
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <h4 style="color: #374151; margin-bottom: 8px;">Project Description</h4>
      <p style="font-size: 14px; color: #374151; white-space: pre-wrap; background: #f9fafb; padding: 12px; border-radius: 6px; border-left: 3px solid #2563eb;">${escapeHtml(projectDesc)}</p>
      ` : ""}

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <h4 style="color: #374151; margin-bottom: 8px;">Message</h4>
      <p style="font-size: 14px; color: #374151; white-space: pre-wrap; background: #f9fafb; padding: 12px; border-radius: 6px; border-left: 3px solid #00d2fd;">${escapeHtml(message)}</p>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="font-size: 11px; color: #9ca3af;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from:    `"PCE Contact Form" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,   // sends to itself; forward rule in Gmail handles the rest
      replyTo: email,
      subject,
      html,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error("Email send failed:", err.message)
    return res.status(500).json({ error: "Failed to send message. Please try again." })
  }
}

// ─── Utility ───────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
