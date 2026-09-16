import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CreditCard, AlertCircle, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

export default function MockPaymentPage() {
  const { currentOrder, completePayment, cancelOrder, navigateTo } = useStore();
  const [processing, setProcessing] = useState(false);

  // Fallback order info if none active
  const orderId = currentOrder?.id || 'ORD2026001';
  const orderTotal = currentOrder?.total || 259;

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      completePayment(orderId);
    }, 900);
  };

  const handleCancel = () => {
    cancelOrder(orderId);
    navigateTo('home');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-12 space-y-6">
      
      {/* Page Title (Matching Screen 4) */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">
          ชำระเงิน (Mock Payment)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          ระบบจำลองการชำระเงินเพื่อทดสอบระบบ e-Book
        </p>
      </div>

      {/* Main Payment Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-7 space-y-6">
        
        {/* DEMO ONLY Banner (High-Visibility per Requirement) */}
        <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 shadow-xs">
          <div className="p-2.5 rounded-xl bg-amber-200 text-amber-900 flex-shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="inline-block bg-amber-950 text-amber-300 text-xs sm:text-sm font-black px-2.5 py-0.5 rounded uppercase tracking-wider mb-1">
              DEMO ONLY
            </div>
            <p className="text-xs sm:text-sm font-bold text-amber-950 leading-snug">
              การจำลองการชำระเงินเท่านั้น • ห้ามโอนหรือจ่ายเงินจริงโดยเด็ดขาด
            </p>
          </div>
        </div>

        {/* Order Details (Matching Screen 4) */}
        <div className="space-y-4 py-2 border-y border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-normal">เลขที่คำสั่งซื้อ</span>
            <span className="font-mono font-semibold text-gray-900">
              #{orderId}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-normal">ยอดที่ต้องชำระ</span>
            <span className="text-xl font-extrabold text-leaf-primary">
              ฿ {orderTotal}
            </span>
          </div>
        </div>

        {/* Action Buttons (Matching Screen 4) */}
        <div className="space-y-3 pt-2">
          {/* Primary simulate payment button */}
          <button
            onClick={handleSimulatePayment}
            disabled={processing}
            className="w-full py-3.5 px-4 rounded-xl bg-leaf-primary hover:bg-leaf-hover text-white font-medium text-sm transition-all shadow-md shadow-leaf-primary/20 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>กำลังประมวลผลคำสั่งซื้อ...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>จำลองชำระเงินสำเร็จ</span>
              </>
            )}
          </button>

          {/* Cancel button */}
          <button
            onClick={handleCancel}
            disabled={processing}
            className="w-full py-2.5 text-center text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            ยกเลิก
          </button>
        </div>

      </div>
    </div>
  );
}
