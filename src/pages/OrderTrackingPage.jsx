import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ArrowLeft, Check, ShieldAlert, Lock } from 'lucide-react';

export default function OrderTrackingPage() {
  const { navigateTo, trackingSearch, setTrackingSearch, verifyAndTrackOrder } = useStore();
  const [orderInput, setOrderInput] = useState(trackingSearch.orderId || 'ORD2026001');
  const [emailInput, setEmailInput] = useState(trackingSearch.email || 'you@example.com');
  
  // Initial verification on load
  const [trackingResult, setTrackingResult] = useState(() => {
    return verifyAndTrackOrder(trackingSearch.orderId || 'ORD2026001', trackingSearch.email || 'you@example.com');
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const result = verifyAndTrackOrder(orderInput, emailInput);
    setTrackingResult(result);
    if (result.success) {
      setTrackingSearch({ orderId: orderInput.trim().replace(/^#/, ''), email: emailInput.trim() });
    }
  };

  const order = trackingResult.success ? trackingResult.order : null;

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-12 space-y-6">
      
      {/* Page Title (Matching Screen 6) */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">
          ติดตามสถานะคำสั่งซื้อ
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          ระบบตรวจสอบสถานะคำสั่งซื้อที่มีการรักษาความปลอดภัยของข้อมูลผู้ซื้อ
        </p>
      </div>

      {/* Search Form (Matching Screen 6) */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            เลขที่คำสั่งซื้อ
          </label>
          <input
            type="text"
            placeholder="#ORD2026001"
            value={orderInput}
            onChange={(e) => setOrderInput(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-mono outline-none focus:border-leaf-primary focus:bg-white transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            อีเมล
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:border-leaf-primary focus:bg-white transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-leaf-primary hover:bg-leaf-hover text-white font-medium text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
        >
          <Search className="w-4 h-4" />
          <span>ค้นหา</span>
        </button>

        {/* Security Notice per assignment requirements */}
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 pt-1">
          <Lock className="w-3 h-3 text-leaf-primary" />
          <span>ระบบไม่เปิดเผยข้อมูลคำสั่งซื้อหากอีเมลไม่ตรงกับผู้สั่งซื้อ</span>
        </div>
      </form>

      {/* Security Error Alert if mismatch */}
      {!trackingResult.success && trackingResult.reason && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-xs space-y-1 animate-in fade-in flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{trackingResult.reason}</p>
            <p className="text-[11px] text-red-500 mt-0.5">
              เพื่อความปลอดภัยของข้อมูลผู้อื่น คุณต้องกรอกทั้งเลขที่คำสั่งซื้อและอีเมลที่ใช้สั่งซื้อให้ตรงกัน
            </p>
          </div>
        </div>
      )}

      {/* Search Result Card (Matching Screen 6) */}
      {order && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-6 animate-in fade-in">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900 font-mono">
              คำสั่งซื้อ #{order.id}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              วันที่สั่งซื้อ : {order.date}
            </p>
          </div>

          {/* Stepper Timeline: PENDING -> PAID -> จัดส่งลิงก์ -> เสร็จสิ้น */}
          <div className="relative select-none pt-2">
            <div className="flex items-center justify-between relative z-10 text-center">
              
              {/* Step 1: PENDING */}
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-leaf-primary flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 mt-2">PENDING</span>
                <span className="text-[9px] text-gray-400">รอชำระเงิน</span>
              </div>

              {/* Step 2: PAID */}
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs ${
                  order.status === 'PAID'
                    ? 'bg-emerald-100 text-leaf-primary'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {order.status === 'PAID' ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                </div>
                <span className={`text-[10px] font-bold mt-2 ${order.status === 'PAID' ? 'text-gray-800' : 'text-gray-400'}`}>
                  PAID
                </span>
                <span className="text-[9px] text-gray-400">ชำระเงินสำเร็จ</span>
              </div>

              {/* Step 3: ส่งลิงก์ดาวน์โหลด */}
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs ${
                  order.status === 'PAID'
                    ? 'bg-emerald-100 text-leaf-primary'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {order.status === 'PAID' ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                </div>
                <span className={`text-[10px] font-bold mt-2 ${order.status === 'PAID' ? 'text-gray-800' : 'text-gray-400'}`}>
                  จัดส่งลิงก์
                </span>
                <span className="text-[9px] text-gray-400">ส่งลิงก์ดาวน์โหลด</span>
              </div>

              {/* Step 4: เสร็จสิ้น */}
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs ${
                  order.status === 'PAID'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {order.status === 'PAID' ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
                </div>
                <span className={`text-[10px] font-bold mt-2 ${order.status === 'PAID' ? 'text-leaf-primary font-extrabold' : 'text-gray-400'}`}>
                  เสร็จสิ้น
                </span>
                <span className="text-[9px] text-gray-400">พร้อมใช้งาน</span>
              </div>

            </div>

            {/* Connecting progress line */}
            <div className="absolute top-5 inset-x-5 h-[2px] bg-gray-200 -z-0">
              <div 
                className={`h-full bg-emerald-500 transition-all duration-500 ${
                  order.status === 'PAID' ? 'w-full' : 'w-1/4'
                }`}
              />
            </div>
          </div>

          {/* Purchased Items */}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            <span className="text-xs font-semibold text-gray-700">รายการหนังสือ:</span>
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg">
                <span className="font-medium truncate max-w-[200px]">{item.title}</span>
                <span className="font-bold text-leaf-primary">฿ {item.price}</span>
              </div>
            ))}
          </div>

          {/* Back button */}
          <div className="pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ย้อนกลับ</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
