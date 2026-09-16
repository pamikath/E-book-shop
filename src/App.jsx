import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import EbookReaderModal from './components/EbookReaderModal';
import EmailViewerModal from './components/EmailViewerModal';

// Pages
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import CartCheckoutPage from './pages/CartCheckoutPage';
import MockPaymentPage from './pages/MockPaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ProfilePage from './pages/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';

import DemoOnlyBanner from './components/DemoOnlyBanner';

function MainLayout() {
  const { activePage, navigateTo } = useStore();

  const renderActivePage = () => {
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
    <div className="min-h-screen flex flex-col bg-[#fbfdfc] pb-16 md:pb-6 antialiased">
      
      {/* Sticky Top Section: High-Visibility DEMO ONLY Banner + Navbar (Visible on EVERY page) */}
      <div className="sticky top-0 z-40">
        <DemoOnlyBanner />
        <Navbar />
      </div>

      {/* Main Dynamic Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Footer (Desktop only) */}
      <footer className="hidden md:block border-t border-gray-200/80 bg-white py-6 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-leaf-primary">LeafBook</span>
            <span>© 2026 E-Book Platform (Vibe Coding Project). Demo Only.</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button onClick={() => navigateTo('home')} className="hover:text-leaf-primary">หน้าร้าน</button>
            <button onClick={() => navigateTo('tracking')} className="hover:text-leaf-primary">ติดตามคำสั่งซื้อ</button>
            <button onClick={() => navigateTo('history')} className="hover:text-leaf-primary">ประวัติการสั่งซื้อ</button>
            <button onClick={() => navigateTo('profile')} className="hover:text-leaf-primary">โปรไฟล์</button>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />

      {/* Interactive E-Book Reader Modal */}
      <EbookReaderModal />

      {/* Sent Email Inspector Modal */}
      <EmailViewerModal />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
