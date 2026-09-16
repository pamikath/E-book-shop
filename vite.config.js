import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { Resend } from 'resend'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'resend-api-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/send-email' && req.method === 'POST') {
              let bodyStr = ''
              req.on('data', chunk => { bodyStr += chunk })
              req.on('end', async () => {
                res.setHeader('Content-Type', 'application/json')
                try {
                  const body = JSON.parse(bodyStr || '{}')
                  const apiKey = env.RESEND_API_KEY || env.VITE_RESEND_API_KEY || body.apiKey || process.env.RESEND_API_KEY

                  if (!apiKey) {
                    res.statusCode = 400
                    return res.end(JSON.stringify({
                      success: false,
                      error: 'ไม่พบ RESEND_API_KEY กรุณาระบุ API Key ในไฟล์ .env หรือในหน้าต่างตั้งค่า'
                    }))
                  }

                  const resend = new Resend(apiKey)

                  const htmlContent = `
                    <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2ece5;">
                      <div style="background: #186438; padding: 24px; text-align: center; color: #ffffff;">
                        <h2 style="margin: 0; font-size: 24px;">🌿 LeafBook</h2>
                        <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">ยืนยันคำสั่งซื้อ e-Book ลิขสิทธิ์แท้</p>
                      </div>
                      <div style="padding: 24px;">
                        <p style="font-size: 15px; font-weight: bold; margin-bottom: 8px;">เรียนคุณ ${body.buyerName || 'ลูกค้า'},</p>
                        <p style="font-size: 13px; line-height: 1.6; color: #4a5568;">
                          คำสั่งซื้อ <strong>#${body.orderId}</strong> สำหรับหนังสือ <em>${body.bookTitle}</em> ชำระเงินเรียบร้อยแล้ว (สถานะ PAID)
                        </p>
                        <div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
                          <h3 style="margin: 0 0 8px 0; color: #065f46; font-size: 16px;">📥 ไฟล์ e-Book ของคุณพร้อมดาวน์โหลดแล้ว</h3>
                          <a href="${body.tempDownloadUrl}" target="_blank" style="display: inline-block; background: #186438; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; margin: 8px 0;">ดาวน์โหลด e-Book ทันที</a>
                          <div style="font-size: 11px; color: #047857; margin-top: 8px;">⏳ ลิงก์ชั่วคราวนี้มีอายุใช้งาน: ${body.expiresAt || '24 ชั่วโมง'}</div>
                        </div>
                        <p style="font-size: 11px; color: #94a3b8; line-height: 1.5;">
                          * ลิงก์ดาวน์โหลดนี้เป็นลิงก์ชั่วคราวที่มีอายุจำกัด เพื่อความปลอดภัยตามมาตรฐาน หากมีปัญหาติดต่อ support@leafbook.com
                        </p>
                      </div>
                    </div>
                  `

                  const result = await resend.emails.send({
                    from: 'LeafBook <onboarding@resend.dev>',
                    to: [body.to],
                    subject: `[LeafBook] ยืนยันคำสั่งซื้อ #${body.orderId} พร้อมลิงก์ดาวน์โหลด e-Book`,
                    html: htmlContent
                  })

                  if (result.error) {
                    res.statusCode = 400
                    return res.end(JSON.stringify({ success: false, error: result.error.message }))
                  }

                  res.statusCode = 200
                  return res.end(JSON.stringify({
                    success: true,
                    messageId: result.data?.id,
                    sentTo: body.to
                  }))
                } catch (err) {
                  res.statusCode = 500
                  return res.end(JSON.stringify({
                    success: false,
                    error: err.message || 'เกิดข้อผิดพลาดในการส่งอีเมล'
                  }))
                }
              })
              return
            }
            next()
          })
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    }
  }
})
