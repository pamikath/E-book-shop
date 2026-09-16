import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Mail, ArrowLeft, BookOpen, ExternalLink, ShieldCheck, KeyRound, Loader2, RefreshCw, Send, Check } from 'lucide-react';
import ResendSettingsModal from '../components/ResendSettingsModal';

export default function OrderSuccessPage() {
  const { 
    currentOrder, 
    navigateTo, 
    setReaderBook, 
    books, 
    setViewingEmail, 
    sentEmails,
    lastEmailStatus,
    sendEmailViaResend,
    isResendModalOpen,
    setIsResendModalOpen
  } = useStore();

  const [resending, setResending] = useState(false);

  const order = currentOrder || {
    id: 'ORD2026001',
    total: 259,
    date: '10 ก.ย. 2026 14:32',
    buyer: { email: 'you@example.com', name: 'สมชาย ใจดี' },
    items: [{ bookId: 'book-2', title: 'นิสัยเล็กๆ ที่เปลี่ยนชีวิตได้' }]
  };

  const purchasedBook = books.find(b => b.id === order.items?.[0]?.bookId) || books[1];

  const handleInspectEmail = () => {
    const emailRecord = sentEmails.find(e => e.orderId === order.id) || {
      orderId: order.id,
      to: order.buyer?.email || 'you@example.com',
      recipientName: order.buyer?.name || 'สมชาย ใจดี',
      bookTitle: order.items?.[0]?.title || 'นิสัยเล็กๆ ที่เปลี่ยนชีวิตได้',
      sentAt: order.date,
      expiresAt: 'อายุ 24 ชั่วโมง (Temporary Link)',
      downloadToken: 'sec_tok_exp24h_8f29c4e1a0b3',
      tempDownloadUrl: `https://leafbook-demo.vercel.app/download?order=${order.id}&token=sec_tok_exp24h_8f29c4e1a0b3`
    };
    setViewingEmail(emailRecord);
  };

  const handleManualResend = async () => {
    setResending(true);
    await sendEmailViaResend(order);
    setResending(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-12 space-y-6 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Top Success Banner (Matching Screen 5) */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 flex items-center justify-center text-leaf-primary shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans">
          ชำระเงินสำเร็จ!
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          คำสั่งซื้อของคุณได้รับการยืนยันแล้ว
        </p>
      </div>

      {/* Order Receipt Box (Matching Screen 5) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between text-xs sm:text-sm pb-3 border-b border-gray-100">
          <span className="text-gray-500">เลขที่คำสั่งซื้อ</span>
          <span className="font-mono font-bold text-gray-900">
            #{order.id}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm pb-3 border-b border-gray-100">
          <span className="text-gray-500">ยอดที่ชำระ</span>
          <span className="font-bold text-leaf-primary text-base">
            ฿ {order.total}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-500">วันที่สั่งซื้อ</span>
          <span className="text-gray-700 font-medium">
            {order.date}
          </span>
        </div>
      </div>

      {/* Real Email (Resend) Status Box */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-leaf-primary" />
            <span className="text-xs font-bold text-gray-900 font-sans">
              การส่งอีเมลจริงด้วย Resend API
            </span>
          </div>
          <button
            onClick={() => setIsResendModalOpen(true)}
            className="text-[11px] font-semibold text-leaf-primary hover:underline flex items-center gap-1"
          >
            <KeyRound className="w-3 h-3" />
            <span>ตั้งค่า API Key</span>
          </button>
        </div>

        {/* Live Status indicator */}
        {lastEmailStatus.loading || resending ? (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600 flex-shrink-0" />
            <span>กำลังส่งอีเมลจริงผ่านบริการ Resend ไปยัง {order.buyer?.email}...</span>
          </div>
        ) : lastEmailStatus.success ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>ส่งอีเมลจริงสำเร็จแล้ว!</span>
            </div>
            <p className="text-[11px] text-emerald-700">
              ส่งไปยัง: <span className="font-mono font-medium">{lastEmailStatus.sentTo}</span>
            </p>
            {lastEmailStatus.messageId && (
              <p className="text-[10px] text-emerald-600 font-mono">
                Message ID: {lastEmailStatus.messageId}
              </p>
            )}
          </div>
        ) : lastEmailStatus.error ? (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
            <div className="font-semibold flex items-center gap-1.5">
              <span>⚠️ ยังไม่ได้ส่งอีเมลจริง:</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed font-mono">
              {lastEmailStatus.error}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIsResendModalOpen(true)}
                className="px-3 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-lg text-[11px] font-semibold transition-colors"
              >
                ใส่ Resend API Key
              </button>
              <button
                onClick={handleManualResend}
                className="px-3 py-1 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 rounded-lg text-[11px] font-medium flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>ลองส่งใหม่</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 flex items-center justify-between">
            <span>พร้อมส่งอีเมลไปยัง {order.buyer?.email}</span>
            <button
              onClick={handleManualResend}
              className="px-3 py-1 bg-leaf-primary hover:bg-leaf-hover text-white rounded-lg text-[11px] font-medium flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>ส่งอีเมลทันที</span>
            </button>
          </div>
        )}

        {/* Button to inspect virtual email */}
        <div className="pt-1">
          <button
            onClick={handleInspectEmail}
            className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-leaf-primary font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>✉️ ดูตัวอย่างอีเมลเสมือน (Inspect Sent Email)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Security notice regarding temporary download link */}
      <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200">
        <ShieldCheck className="w-4 h-4 text-leaf-primary flex-shrink-0" />
        <span>ระบบใช้ลิงก์ดาวน์โหลดชั่วคราว (Temporary Link มีอายุ 24 ชม.) ตามมาตรฐานความปลอดภัย</span>
      </div>

      {/* Action Buttons (Matching Screen 5) */}
      <div className="space-y-3 pt-2">
        {/* Read e-book right away */}
        <button
          onClick={() => setReaderBook(purchasedBook)}
          className="w-full py-3.5 px-4 rounded-xl bg-leaf-primary hover:bg-leaf-hover text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-leaf-primary/20 flex items-center justify-center gap-2 active:scale-98"
        >
          <BookOpen className="w-4 h-4" />
          <span>เปิดอ่าน e-Book ทันที</span>
        </button>

        {/* Back to Home Store */}
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้าร้าน</span>
        </button>
      </div>

      {/* Resend API Key Settings Modal */}
      <ResendSettingsModal
        isOpen={isResendModalOpen}
        onClose={() => setIsResendModalOpen(false)}
      />

    </div>
  );
}
