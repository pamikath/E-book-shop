export function generateEmailHtml({ buyerName, orderId, bookTitle, tempDownloadUrl, expiresAt, total }) {
  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <title>ยืนยันคำสั่งซื้อ e-Book - LeafBook</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f5; margin: 0; padding: 20px; color: #333333; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px border #e2e8f0; }
    .header { background: linear-gradient(135deg, #186438 0%, #1e7e47 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; }
    .body { padding: 32px 28px; }
    .greeting { font-size: 16px; font-weight: bold; margin-bottom: 12px; color: #1a202c; }
    .message { font-size: 14px; line-height: 1.6; color: #4a5568; margin-bottom: 24px; }
    .order-box { background: #f8faf9; border: 1px solid #e2ece5; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px; }
    .order-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
    .order-row:last-child { margin-bottom: 0; padding-top: 8px; border-top: 1px dashed #cbd5e1; font-weight: bold; }
    .download-card { background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px; }
    .download-card h3 { margin: 0 0 8px 0; color: #065f46; font-size: 16px; }
    .download-btn { display: inline-block; background: #186438; color: #ffffff !important; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; margin: 12px 0; box-shadow: 0 2px 6px rgba(24,100,56,0.3); }
    .expiry { font-size: 12px; color: #047857; margin-top: 8px; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌿 LeafBook</h1>
      <p>ร้านจำหน่าย e-Book และซอร์สโค้ดคุณภาพ</p>
    </div>
    <div class="body">
      <div class="greeting">เรียนคุณ ${buyerName || 'ลูกค้าผู้มีอุปการคุณ'},</div>
      <div class="message">
        การชำระเงินสำหรับคำสั่งซื้อ <strong>#${orderId}</strong> ได้รับการยืนยันเรียบร้อยแล้ว (สถานะ PAID) ขอบคุณที่สนับสนุนผลงานเขียนลิขสิทธิ์แท้ผ่านทาง LeafBook ครับ
      </div>

      <div class="order-box">
        <div class="order-row">
          <span style="color: #64748b;">เลขที่คำสั่งซื้อ:</span>
          <span style="font-family: monospace; font-weight: 600;">#${orderId}</span>
        </div>
        <div class="order-row">
          <span style="color: #64748b;">หนังสือที่สั่งซื้อ:</span>
          <span style="font-weight: 600;">${bookTitle}</span>
        </div>
        <div class="order-row">
          <span style="color: #64748b;">ยอดเงินที่ชำระ:</span>
          <span style="color: #186438; font-size: 15px;">฿ ${total || '259'}</span>
        </div>
      </div>

      <div class="download-card">
        <h3>📥 ไฟล์ e-Book ของคุณพร้อมให้ดาวน์โหลดแล้ว</h3>
        <p style="font-size: 13px; color: #047857; margin: 0;">คลิกที่ปุ่มด้านล่างเพื่อดาวน์โหลดไฟล์ PDF ฉบับเต็ม</p>
        <a href="${tempDownloadUrl}" target="_blank" class="download-btn">ดาวน์โหลด e-Book ทันที</a>
        <div class="expiry">⏳ ลิงก์ชั่วคราวนี้มีอายุใช้งาน: ${expiresAt || '24 ชั่วโมง'}</div>
      </div>

      <p style="font-size: 12px; color: #64748b; line-height: 1.6;">
        <strong>คำแนะนำด้านความปลอดภัย:</strong> ลิงก์ดาวน์โหลดนี้เป็นลิงก์ส่วนบุคคลที่มีอายุจำกัด กรุณาอย่าส่งต่อลิงก์นี้ให้ผู้อื่น หากคุณพบปัญหาในการดาวน์โหลด สามารถติดต่อเราได้ที่ support@leafbook.com
      </p>
    </div>
    <div class="footer">
      LeafBook - Vibe Coding E-Book Platform Demo<br>
      ข้อความนี้เป็นการส่งอีเมลจริงผ่านบริการ Resend API เพื่อการทดสอบระบบ
    </div>
  </div>
</body>
</html>
  `;
}
