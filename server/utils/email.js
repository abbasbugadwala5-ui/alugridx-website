const nodemailer = require('nodemailer');

// ─────────────────────────────────────────────────────────────
//  createTransporter
//  Reads credentials from .env and returns a Nodemailer transport.
//  Works with Gmail, cPanel/Webmail, Outlook, Zoho — see .env.example
// ─────────────────────────────────────────────────────────────
function createTransporter() {
  // cPanel / Business email (SMTP) — RECOMMENDED for production
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host   : process.env.SMTP_HOST,           // mail.alugridx.com
      port   : parseInt(process.env.SMTP_PORT) || 465,
      secure : process.env.SMTP_SECURE !== 'false', // true for port 465
      auth: {
        user : process.env.SMTP_USER,           // info@alugridx.com
        pass : process.env.SMTP_PASS,           // email password
      },
    });
  }

  // Gmail fallback (use App Password — NOT your main Gmail password)
  return nodemailer.createTransport({
    service : 'gmail',
    auth: {
      user : process.env.GMAIL_USER,            // yourname@gmail.com
      pass : process.env.GMAIL_APP_PASS,        // 16-char App Password from Google
    },
  });
}

// ─────────────────────────────────────────────────────────────
//  sendEnquiryNotification
//  Called after every form submission.
//  Sends 2 emails:
//    1. To ALUGRIDX team  → full enquiry details
//    2. To the user       → confirmation/thank-you
// ─────────────────────────────────────────────────────────────
async function sendEnquiryNotification(enquiry) {
  const transporter = createTransporter();
  const adminEmail  = process.env.ADMIN_EMAIL || 'info@alugridx.com';
  const fromAddress = `"ALUGRIDX Website" <${process.env.SMTP_USER || process.env.GMAIL_USER || adminEmail}>`;

  // ── 1. Notify admin ───────────────────────────────────────
  const adminMail = {
    from    : fromAddress,
    to      : adminEmail,
    subject : `📩 New Enquiry: ${enquiry.subject} — ${enquiry.name}`,
    html    : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body  { margin:0; padding:0; font-family: Arial, sans-serif; background:#f4f4f4; }
    .wrap { max-width:600px; margin:32px auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.08); }
    .hdr  { background:#0D1B3E; padding:28px 32px; }
    .hdr h1 { margin:0; color:#fff; font-size:20px; letter-spacing:.5px; }
    .hdr p  { margin:4px 0 0; color:rgba(255,255,255,.55); font-size:13px; }
    .body { padding:28px 32px; }
    .row  { display:flex; border-bottom:1px solid #f0f0f0; padding:10px 0; }
    .row:last-child { border-bottom:none; }
    .lbl  { width:130px; font-size:11px; font-weight:700; text-transform:uppercase; color:#999; letter-spacing:.5px; flex-shrink:0; padding-top:2px; }
    .val  { font-size:14px; color:#111; flex:1; line-height:1.5; }
    .msg  { background:#f7f8fc; border-left:3px solid #0D1B3E; padding:14px 16px; border-radius:4px; margin-top:16px; }
    .msg p { margin:0; font-size:14px; color:#333; line-height:1.6; }
    .ftr  { background:#0D1B3E; padding:18px 32px; text-align:center; }
    .ftr p { margin:0; color:rgba(255,255,255,.4); font-size:11px; }
    .btn  { display:inline-block; margin-top:20px; padding:11px 28px; background:#0D1B3E; color:#fff; text-decoration:none; border-radius:6px; font-size:13px; font-weight:700; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <h1>New Enquiry Received</h1>
    <p>${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} — Gulf Standard Time</p>
  </div>
  <div class="body">
    <div class="row"><div class="lbl">Name</div><div class="val"><strong>${enquiry.name}</strong></div></div>
    <div class="row"><div class="lbl">Email</div><div class="val"><a href="mailto:${enquiry.email}" style="color:#0D1B3E">${enquiry.email}</a></div></div>
    <div class="row"><div class="lbl">Phone</div><div class="val">${enquiry.phone || '—'}</div></div>
    <div class="row"><div class="lbl">Company</div><div class="val">${enquiry.company || '—'}</div></div>
    <div class="row"><div class="lbl">Subject</div><div class="val">${enquiry.subject || 'General Enquiry'}</div></div>
    <div class="msg"><p>${(enquiry.message || '—').replace(/\n/g, '<br>')}</p></div>
    <div style="text-align:center">
      <a href="mailto:${enquiry.email}?subject=Re: ${enquiry.subject}" class="btn">Reply to ${enquiry.name}</a>
    </div>
  </div>
  <div class="ftr"><p>ALUGRIDX Air Conditioning Industry LLC &nbsp;|&nbsp; Ajman, UAE</p></div>
</div>
</body>
</html>`,
  };

  // ── 2. Auto-reply to user ─────────────────────────────────
  const userMail = {
    from    : fromAddress,
    to      : enquiry.email,
    subject : `Thank you for contacting ALUGRIDX — We'll be in touch soon`,
    html    : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body  { margin:0; padding:0; font-family: Arial, sans-serif; background:#f4f4f4; }
    .wrap { max-width:580px; margin:32px auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.08); }
    .hdr  { background:#0D1B3E; padding:32px; text-align:center; }
    .hdr h1 { margin:0; color:#fff; font-size:22px; letter-spacing:.3px; }
    .hdr p  { margin:6px 0 0; color:rgba(255,255,255,.55); font-size:13px; }
    .body { padding:32px; }
    .body p { font-size:14px; color:#444; line-height:1.7; margin:0 0 14px; }
    .box  { background:#f7f8fc; border-radius:8px; padding:18px 20px; margin:20px 0; border-left:3px solid #0D1B3E; }
    .box p { margin:0; font-size:13px; color:#555; }
    .info { display:flex; align-items:center; gap:8px; margin:8px 0; font-size:13px; color:#555; }
    .ftr  { background:#0D1B3E; padding:20px 32px; text-align:center; }
    .ftr p { margin:0; color:rgba(255,255,255,.4); font-size:11px; line-height:1.7; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <h1>ALUGRIDX</h1>
    <p>Air Distribution Solutions — Ajman, UAE</p>
  </div>
  <div class="body">
    <p>Dear <strong>${enquiry.name}</strong>,</p>
    <p>Thank you for reaching out to ALUGRIDX. We have received your enquiry and our team will respond within <strong>1 business day</strong>.</p>
    <div class="box">
      <p><strong>Your Enquiry Summary</strong></p>
      <p style="margin-top:8px">Subject: ${enquiry.subject || 'General Enquiry'}</p>
      ${enquiry.message ? `<p>Message: ${enquiry.message}</p>` : ''}
    </div>
    <p>In the meantime, feel free to reach us directly:</p>
    <div class="info">📞 <a href="tel:+971585521251" style="color:#0D1B3E">+971 58 552 1251</a></div>
    <div class="info">📧 <a href="mailto:info@alugridx.com" style="color:#0D1B3E">info@alugridx.com</a></div>
    <div class="info">🌐 <a href="https://www.alugridx.com" style="color:#0D1B3E">www.alugridx.com</a></div>
    <p style="margin-top:20px">Best regards,<br><strong>ALUGRIDX Team</strong><br>Building No.144, Al Jurf 3, Ajman, UAE</p>
  </div>
  <div class="ftr">
    <p>© 2026 ALUGRIDX Air Conditioning Industry LLC<br>This is an automated confirmation email.</p>
  </div>
</div>
</body>
</html>`,
  };

  // Send both — if one fails it still resolves (don't block the API response)
  const results = await Promise.allSettled([
    transporter.sendMail(adminMail),
    transporter.sendMail(userMail),
  ]);

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(`❌  Email ${i === 0 ? 'admin' : 'user'} send failed:`, r.reason?.message);
    } else {
      console.log(`✅  Email ${i === 0 ? 'admin' : 'user'} sent:`, r.value?.messageId);
    }
  });
}

module.exports = { sendEnquiryNotification };