import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { to, orderId, bookTitle, buyerName, tempDownloadUrl, expiresAt, total, apiKey } = req.body || {};

  // Retrieve Resend API Key from Environment variable or request body
  const resendApiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY || apiKey;

  if (!resendApiKey) {
    return res.status(400).json({
      success: false,
      error: 'ไม่พบ RESEND_API_KEY กรุณาตั้งค่าใน Environment Variables หรือระบุในหน้าจอตั้งค่า'
    });
  }

  if (!to) {
    return res.status(400).json({
      success: false,
      error: 'กรุณาระบุอีเมลผู้รับ (to)'
    });
  }

  try {
    const resend = new Resend(resendApiKey);

    const emailHtml = `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <title>ยืนยันคำสั่งซื้อ e-Book - LeafBook</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f7f5; margin: 0; padding: 20px; color: #333;">
  <div style="max-width: 580px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: #186438; padding: 28px 20px; text-align: center; color: #fff;">
      <h1 style="margin: 0; font-size: 24px;">🌿 LeafBook</h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">ร้านจำหน่าย e-Book และซอร์สโค้ดคุณภาพ</p>
    </div>
    <div style="padding: 28px 24px;">
      <p style="font-size: 15px; font-weight: bold; margin-bottom: 8px;">เรียนคุณ ${buyerName || 'ลูกค้าผู้มีอุปการคุณ'},</p>
      <p style="font-size: 13px; line-height: 1.6; color: #4a5568;">
        การชำระเงินสำหรับคำสั่งซื้อ <strong>#${orderId}</strong> ได้รับการยืนยันเรียบร้อยแล้ว (สถานะ PAID)
      </p>

      <div style="background: #f8faf9; border: 1px solid #e2ece5; border-radius: 12px; padding: 16px; margin: 16px 0; font-size: 13px;">
        <div style="margin-bottom: 6px;"><strong>เลขที่คำสั่งซื้อ:</strong> #${orderId}</div>
        <div style="margin-bottom: 6px;"><strong>หนังสือที่สั่งซื้อ:</strong> ${bookTitle}</div>
        <div><strong>ยอดเงินที่ชำระ:</strong> <span style="color: #186438; font-weight: bold;">฿ ${total || '259'}</span></div>
      </div>

      <div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
        <h3 style="margin: 0 0 8px 0; color: #065f46;">📥 ไฟล์ e-Book ของคุณพร้อมให้ดาวน์โหลดแล้ว</h3>
        <p style="font-size: 12px; color: #047857; margin: 0 0 14px 0;">คลิกที่ปุ่มด้านล่างเพื่อเปิดอ่านหรือดาวน์โหลดไฟล์</p>
        <a href="${tempDownloadUrl}" target="_blank" style="display: inline-block; background: #186438; color: #fff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px;">ดาวน์โหลด e-Book ทันที</a>
        <div style="font-size: 11px; color: #047857; margin-top: 8px;">⏳ ลิงก์ชั่วคราวนี้มีอายุใช้งาน: ${expiresAt || '24 ชั่วโมง'}</div>
      </div>

      <p style="font-size: 11px; color: #718096; line-height: 1.5;">
        * ลิงก์ดาวน์โหลดนี้เป็นลิงก์ชั่วคราวที่มีอายุจำกัด เพื่อความปลอดภัยตามมาตรฐาน หากมีปัญหาติดต่อ support@leafbook.com
      </p>
    </div>
    <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
      LeafBook - Vibe Coding E-Book Platform • ส่งด้วย Resend API
    </div>
  </div>
</body>
</html>
    `;

    // Resend test domain allows sending from onboarding@resend.dev
    const data = await resend.emails.send({
      from: 'LeafBook <onboarding@resend.dev>',
      to: [to],
      subject: `[LeafBook] ยืนยันคำสั่งซื้อ #${orderId} พร้อมลิงก์ดาวน์โหลด e-Book`,
      html: emailHtml
    });

    if (data.error) {
      return res.status(400).json({ success: false, error: data.error.message });
    }

    return res.status(200).json({
      success: true,
      messageId: data.data?.id,
      sentTo: to
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ Resend API'
    });
  }
}
