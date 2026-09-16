# 🚀 คู่มือการ Deploy ระบบ LeafBook ขึ้น Vercel จริง (ตามใบงานหน้า 4)

คู่มือนี้สรุปขั้นตอนการนำโปรเจกต์ **LeafBook** ขึ้น Vercel เป็น Production URL จริง เพื่อใช้ส่งงานและนำ URL ไปใส่ใน **MIT App Inventor**

---

## 🔒 1. ตรวจสอบความปลอดภัยก่อน Deploy (Security First)

ก่อนจะนำโค้ดขึ้น GitHub หรือ Vercel ให้ตรวจสอบไฟล์ในโปรเจกต์:
- [x] **มีไฟล์ `.gitignore`**: ถูกตั้งค่าให้ละเว้นโฟลเดอร์ `node_modules`, `dist` และไฟล์ `.env`, `.env.local` เรียบร้อยแล้ว
- [x] **ไม่มีการ Hardcode Secret**: API Key จะถูกดึงผ่าน `process.env.RESEND_API_KEY` ในระดับ Serverless
- [x] **มีไฟล์ `vercel.json`**: ตั้งค่า Build Command (`npm run build`), Output (`dist`), และ Rewrite API สำหรับฟังก์ชันส่งอีเมล `api/send-email.js`

---

## 📦 2. วิธีที่ 1: Deploy ผ่าน GitHub (วิธีมาตรฐานตามใบงาน)

### ขั้นตอนที่ 2.1: เตรียม Git ในเครื่อง
เปิด Terminal ในโฟลเดอร์โปรเจกต์ `C:\Users\acer\.gemini\antigravity\scratch\leafbook`:

```bash
# 1. เริ่มต้น Git
git init

# 2. เพิ่มไฟล์ทั้งหมด (ไฟล์ .env จะไม่ถูกเพิ่มเพราะมี .gitignore)
git add .

# 3. ตรวจสอบว่าไม่มีไฟล์ .env หรือ secret ติดอยู่
git status

# 4. Commit ข้อมูล
git commit -m "feat: complete LeafBook e-book platform with Resend integration"
```

### ขั้นตอนที่ 2.2: Push ขึ้น GitHub
1. เปิดเว็บไซต์ [github.com](https://github.com) แล้วกด **New repository**
2. ตั้งชื่อ Repository เช่น `leafbook` แล้วกด **Create repository**
3. คัดลอกคำสั่งมาเชื่อมโยงและ Push ใน Terminal:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/leafbook.git
   git push -u origin main
   ```

### ขั้นตอนที่ 2.3: นำเข้าสู่ Vercel และใส่ Environment Variables
1. เปิดเว็บไซต์ [vercel.com](https://vercel.com) แล้วเข้าสู่ระบบด้วยบัญชี GitHub
2. กดปุ่ม **"Add New..."** -> **"Project"**
3. ที่หัวข้อ Import Git Repository จะเห็น repository `leafbook` ให้กด **"Import"**
4. ที่หน้าตั้งค่าโปรเจกต์ (Configure Project):
   - **Framework Preset**: เลือก `Vite`
   - **Root Directory**: `./` (ค่าเริ่มต้น)
   - ขยายหัวข้อ **"Environment Variables"** (สำคัญมากสำหรับการส่งอีเมลจริง):
     - **Key**: `RESEND_API_KEY`
     - **Value**: `re_xxxxxxxxxxxxxxxxxxxx` (นำ API Key จาก [resend.com](https://resend.com/api-keys) มาใส่)
     - กดปุ่ม **Add**
5. กดปุ่ม **"Deploy"**
6. รอ Vercel คอมไพล์ประมาณ 20-30 วินาที จะได้ **Production URL จริง** เช่น:
   `https://leafbook-xyz.vercel.app` 🎉

---

## ⚡ 3. วิธีที่ 2: Deploy ด่วนด้วย Vercel CLI (ไม่ต้องใช้ GitHub)

หากต้องการ Deploy ตรงจากเครื่องเข้า Vercel ทันที:

```bash
# 1. รันคำสั่ง Vercel
npx vercel

# 2. ตอบคำถามใน Terminal:
# - Set up and deploy? [Y]
# - Which scope? [เลือกบัญชีของคุณ]
# - Link to existing project? [N]
# - What's your project's name? [leafbook]
# - In which directory is your code located? [./]

# 3. ตั้งค่า Secret ใน Vercel
npx vercel env add RESEND_API_KEY

# 4. Deploy ขึ้น Production ทันที
npx vercel --prod
```

---

## 🧪 4. การทดสอบบน Production URL จริง (ตามใบงานหน้า 4 ข้อ 8-9)

1. เปิด Production URL บนคอมพิวเตอร์และบนสมาร์ทโฟนจริง
2. ทดสอบเลือกซื้อหนังสือ (เช่น Task Manager PRO หรือ Atomic Habits)
3. ไปที่หน้าตะกร้า -> กรอกชื่อและอีเมล (หากใช้ Resend โดเมนฟรี ให้ใช้อีเมลที่ลงทะเบียนกับ Resend)
4. กดชำระเงินจำลอง (Mock Payment) -> ตรวจสอบว่าคำสั่งซื้อเปลี่ยนเป็น `PAID`
5. ตรวจสอบกล่องจดหมายอีเมลจริงว่าได้รับอีเมลยืนยันพร้อมลิงก์ดาวน์โหลด e-Book ชั่วคราว 24 ชั่วโมงหรือไม่

---

## 📱 5. นำ URL ไปใส่ใน MIT App Inventor (ใบงานหน้า 5)

เมื่อได้ Production URL มาแล้ว เช่น `https://leafbook-yourname.vercel.app`:
1. เปิดโปรเจกต์ใน [ai2.appinventor.mit.edu](https://ai2.appinventor.mit.edu)
2. คลิกที่คอมโพเนนต์ `WebViewer1`
3. ในช่อง **HomeUrl** ให้วาง URL จริงที่ได้จาก Vercel ลงไป
4. สั่ง **Build** -> **Android App (.apk)** เพื่อนำไฟล์ `.apk` ไปติดตั้งบนมือถือจริงตามใบงานหน้า 6
