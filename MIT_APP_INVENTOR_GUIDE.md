# 📱 คู่มือการสร้าง Android App (.apk) ด้วย MIT App Inventor (ตามใบงานหน้า 5 - 6)

คู่มือนี้สำหรับนำเว็บไซต์ **LeafBook** ที่ Deploy บน Vercel แล้วมาห่อหุ้มเป็น Android Mobile App ด้วย **MIT App Inventor** ตามข้อกำหนดของใบงาน

---

## 🎯 องค์ประกอบขั้นต่ำและค่าที่ต้องตั้ง

### 1. การตั้งค่าหน้าจอ (Screen1)
- **Title**: `LeafBook`
- **Sizing**: `Responsive` *(สำคัญมาก เพื่อให้แสดงผลเต็มจอสมาร์ทโฟน)*
- **ShowStatusBar**: `True`
- **AppName**: `LeafBook`

### 2. การตั้งค่าคอมโพเนนต์ WebViewer (WebViewer1)
ลากคอมโพเนนต์ `WebViewer` จากหมวด **User Interface** มาวางไว้บน `Screen1`:
- **Width**: `Fill parent`
- **Height**: `Fill parent`
- **HomeUrl**: `https://<YOUR-VERCEL-PROJECT-NAME>.vercel.app` *(ใส่ Vercel Production URL ของคุณ ห้ามใช้ localhost)*
- **FollowLinks**: `True` (เพื่อให้คลิกเปลี่ยนหน้าในเว็บได้)
- **IgnoreSslErrors**: `False` *(ข้อพึงระวัง: ห้ามตั้งเป็น true เพื่อความปลอดภัยตามใบงาน)*
- **UsesLocation**: `False` (เนื่องจากเว็บไม่ได้ใช้ GPS ตำแหน่ง)

---

## 🧩 การต่อบล็อกโค้ด (Blocks Logic)

ปุ่มย้อนกลับของ Android: **ไม่ออกจากแอปทันทีเมื่อเว็บยังย้อนกลับได้**

เปิดแท็บ **Blocks** ที่มุมขวาบนของ MIT App Inventor แล้วต่อบล็อกดังนี้:

```blocks
when Screen1.BackPressed do
    if call WebViewer1.CanGoBack then
        call WebViewer1.GoBack
    else
        call close application
```

### คำอธิบายบล็อก:
1. เลือก `Screen1` ทางด้านซ้าย ดึงบล็อกสีทอง `when Screen1.BackPressed do`
2. เลือกหมวด `Control` ดึงบล็อก `if ... then ... else` มาวางข้างใน
3. เลือก `WebViewer1` ดึงบล็อกสีม่วง `call WebViewer1.CanGoBack` ใส่ในช่อง `if`
4. ดึงบล็อก `call WebViewer1.GoBack` ใส่ในช่อง `then`
5. ในช่อง `else` เลือกหมวด `Control` ดึงบล็อก `call close application`

---

## 📦 ขั้นตอนการทดสอบและ Build ไฟล์ .APK (หน้า 6)

1. **ทดสอบกับมือถือจริง (AI Companion)**:
   - บนแถบเมนูด้านบน คลิก **Connect** -> **AI Companion**
   - เปิดแอป `MIT AI2 Companion` บนโทรศัพท์มือถือ แล้วสแกน QR Code เพื่อทดสอบทันที
2. **Build เป็นไฟล์ .APK**:
   - บนแถบเมนูด้านบน คลิก **Build** -> **Android App (.apk)**
   - รอระบบประมวลผลประมาณ 1-2 นาที
   - เมื่อเสร็จแล้ว จะมี QR Code ให้สแกนดาวน์โหลดติดตั้งบนมือถือ หรือดาวน์โหลดไฟล์ `.apk` ลงคอมพิวเตอร์
3. **บันทึกไฟล์โครงการ .aia**:
   - คลิก **Projects** -> **Export selected project (.aia) to my computer** เพื่อเก็บไฟล์ส่งอาจารย์หรือสำรองข้อมูล
