import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Mail, Download, Clock, ShieldCheck, ExternalLink } from 'lucide-react';

export default function EmailViewerModal() {
  const { viewingEmail, setViewingEmail, setReaderBook, books } = useStore();

  if (!viewingEmail) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Email Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              กล่องข้อความจำลอง: อีเมลยืนยันคำสั่งซื้อ #{viewingEmail.orderId}
            </span>
          </div>
          <button
            onClick={() => setViewingEmail(null)}
            className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Metadata */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/60 text-xs space-y-1.5 font-sans">
          <div className="flex justify-between">
            <span className="text-gray-400">จาก:</span>
            <span className="font-semibold text-gray-800">LeafBook Store &lt;orders@leafbook.com&gt;</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">ถึง:</span>
            <span className="font-mono text-leaf-primary font-semibold">{viewingEmail.to}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">วันที่ส่ง:</span>
            <span className="text-gray-600">{viewingEmail.sentAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">เรื่อง:</span>
            <span className="font-medium text-gray-900">[LeafBook] ยืนยันคำสั่งซื้อ #{viewingEmail.orderId} พร้อมลิงก์ดาวน์โหลด e-Book</span>
          </div>
        </div>

        {/* Email Body Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm text-gray-700 font-sans max-h-[60vh] overflow-y-auto">
          <div className="space-y-1">
            <p className="font-bold text-gray-900">เรียนคุณ {viewingEmail.recipientName},</p>
            <p className="text-gray-600 leading-relaxed">
              ขอบคุณสำหรับการสั่งซื้อ e-Book กับทางร้าน <strong>LeafBook</strong> ขณะนี้การชำระเงินของคุณได้รับการยืนยันเรียบร้อยแล้ว (สถานะ PAID)
            </p>
          </div>

          {/* Secure Temporary Link Box (Per Assignment requirement) */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-leaf-primary" />
              <span>ลิงก์ดาวน์โหลด e-Book แบบชั่วคราว (Secure Temporary Link)</span>
            </div>

            <div className="p-2.5 bg-white border border-emerald-200/80 rounded-lg text-xs font-mono text-emerald-800 break-all select-all">
              {viewingEmail.tempDownloadUrl}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>ลิงก์นี้มีอายุใช้งาน: {viewingEmail.expiresAt}</span>
            </div>

            <button
              onClick={() => {
                setViewingEmail(null);
                setReaderBook(books[1]); // open reader
              }}
              className="w-full py-2 px-3 bg-leaf-primary hover:bg-leaf-hover text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>คลิกเพื่อทดสอบเปิดไฟล์ e-Book ทันที</span>
            </button>
          </div>

          <div className="text-[11px] text-gray-500 border-t pt-3 space-y-1">
            <p>• หากคุณไม่ได้เป็นผู้ทำรายการนี้ กรุณาติดต่อ support@leafbook.com</p>
            <p>• เพื่อความปลอดภัย อย่าแชร์ลิงก์ดาวน์โหลดนี้ให้แก่บุคคลอื่น</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => setViewingEmail(null)}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium rounded-lg transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
}
