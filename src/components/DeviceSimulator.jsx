import React from 'react';
import { useStore } from '../context/StoreContext';
import { Wifi, BatteryMedium, Signal, X, RotateCcw } from 'lucide-react';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import BookDetailPage from '../pages/BookDetailPage';
import CartCheckoutPage from '../pages/CartCheckoutPage';
import MockPaymentPage from '../pages/MockPaymentPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import OrderTrackingPage from '../pages/OrderTrackingPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import MobileBottomNav from './MobileBottomNav';

export default function DeviceSimulator({ children }) {
  const { isMobileSimulator, setIsMobileSimulator, activePage } = useStore();

  if (!isMobileSimulator) {
    return <>{children}</>;
  }

  // Render the current active page inside mobile screen
  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home': return <HomePage />;
      case 'detail': return <BookDetailPage />;
      case 'cart': return <CartCheckoutPage />;
      case 'payment': return <MockPaymentPage />;
      case 'success': return <OrderSuccessPage />;
      case 'tracking': return <OrderTrackingPage />;
      case 'profile': return <ProfilePage />;
      case 'history': return <OrderHistoryPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start py-8 px-4">
      {/* Simulator Control Header */}
      <div className="w-full max-w-4xl flex items-center justify-between bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-700 mb-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sm font-semibold tracking-wide text-emerald-300">
            โหมดจำลองหน้าจอมือถือ (Mobile WebView Preview - ตามภาพที่ 9)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSimulator(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-all shadow"
          >
            <X className="w-4 h-4" />
            <span>กลับสู่มุมมอง Desktop ปกติ</span>
          </button>
        </div>
      </div>

      {/* Side-by-side or Single Smartphone Mockup Container */}
      <div className="flex flex-wrap items-center justify-center gap-10">
        
        {/* Phone 1: Interactive Device Frame */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-400 mb-2 font-medium">
            📱 หน้าจอที่กำลังใช้งานขณะนี้ (Interactive Live): <b className="text-white capitalize">{activePage}</b>
          </span>

          <div className="relative w-[360px] h-[740px] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-white/20 border-4 border-slate-800 flex flex-col overflow-hidden">
            {/* Phone Speaker Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-xl z-50 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-800 rounded-full" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-2 border border-slate-800" />
            </div>

            {/* Status Bar */}
            <div className="relative z-40 pt-1 px-5 pb-1 flex justify-between items-center text-[11px] text-gray-800 bg-white select-none border-b border-gray-100">
              <span className="font-semibold text-gray-700">11:20</span>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <BatteryMedium className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Inner Phone Screen Content */}
            <div className="flex-1 bg-[#fbfdfc] overflow-y-auto relative pb-16 text-slate-800 select-text">
              {renderCurrentPage()}
            </div>

            {/* Mobile Bottom Navigation in simulator */}
            <div className="absolute bottom-0 inset-x-0">
              <MobileBottomNav />
            </div>

            {/* Home indicator bar at bottom */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400/60 rounded-full z-50 pointer-events-none" />
          </div>
        </div>

        {/* Phone 2: Profile Screen Mirror (matching Screen 9 right side) */}
        <div className="hidden xl:flex flex-col items-center">
          <span className="text-xs text-slate-400 mb-2 font-medium">
            📱 ตัวอย่างหน้าจอโปรไฟล์ (Profile WebView Screen)
          </span>

          <div className="relative w-[360px] h-[740px] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-white/20 border-4 border-slate-800 flex flex-col overflow-hidden opacity-95">
            {/* Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-xl z-50 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-800 rounded-full" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-2 border border-slate-800" />
            </div>

            {/* Status Bar */}
            <div className="relative z-40 pt-1 px-5 pb-1 flex justify-between items-center text-[11px] text-gray-800 bg-white select-none border-b border-gray-100">
              <span className="font-semibold text-gray-700">11:20</span>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <BatteryMedium className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Inner Profile View */}
            <div className="flex-1 bg-[#fbfdfc] overflow-y-auto relative pb-16 text-slate-800">
              <ProfilePage />
            </div>

            {/* Bottom Nav */}
            <div className="absolute bottom-0 inset-x-0">
              <MobileBottomNav />
            </div>

            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400/60 rounded-full z-50 pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
}
