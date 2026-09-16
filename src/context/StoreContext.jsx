import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BOOKS, INITIAL_ORDERS, INITIAL_USER } from '../data/initialData';

const StoreContext = createContext();

// Safe storage wrapper to prevent crashes in restricted WebViews or private browsing
const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn('Storage read warning:', e);
    }
    return null;
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn('Storage write warning:', e);
    }
  }
};

export function StoreProvider({ children }) {
  // Books catalog
  const [books] = useState(INITIAL_BOOKS);

  // Active navigation page: 'home' | 'detail' | 'cart' | 'payment' | 'success' | 'tracking' | 'profile' | 'history'
  const [activePage, setActivePage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(INITIAL_BOOKS[1]); // Default to Atomic Habits

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = safeStorage.getItem('leafbook_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [{ book: INITIAL_BOOKS[1], quantity: 1 }];
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = safeStorage.getItem('leafbook_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return INITIAL_ORDERS;
  });

  // User profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = safeStorage.getItem('leafbook_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return INITIAL_USER;
  });

  // Current active order being processed
  const [currentOrder, setCurrentOrder] = useState(INITIAL_ORDERS[0]);

  // Order tracking search params
  const [trackingSearch, setTrackingSearch] = useState({
    orderId: 'ORD2026001',
    email: 'you@example.com'
  });

  // e-Book Reader Modal
  const [readerBook, setReaderBook] = useState(null);

  // Search keyword in header
  const [searchQuery, setSearchQuery] = useState('');

  // Email Inspection Modal (shows simulated sent email)
  const [viewingEmail, setViewingEmail] = useState(null);

  // Resend API Key Management
  const [resendApiKey, setResendApiKey] = useState(() => {
    return safeStorage.getItem('leafbook_resend_key') || '';
  });

  // Resend Settings Modal Toggle
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);

  // Real email sending status for Resend
  const [lastEmailStatus, setLastEmailStatus] = useState({
    loading: false,
    success: null,
    messageId: null,
    error: null,
    sentTo: null
  });

  // Persist sent emails log for assignment verification
  const [sentEmails, setSentEmails] = useState(() => {
    const saved = safeStorage.getItem('leafbook_sent_emails');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        orderId: 'ORD2026001',
        to: 'you@example.com',
        recipientName: 'สมชาย ใจดี',
        bookTitle: 'นิสัยเล็กๆ ที่เปลี่ยนชีวิตได้ (Atomic Habits)',
        sentAt: '10 ก.ย. 2026 14:32',
        expiresAt: '11 ก.ย. 2026 14:32 (24 ชั่วโมง)',
        downloadToken: 'sec_tok_exp24h_8f29c4e1a0b3',
        tempDownloadUrl: 'https://leafbook-demo.vercel.app/download?token=sec_tok_exp24h_8f29c4e1a0b3'
      }
    ];
  });

  // Persist to safeStorage
  useEffect(() => {
    safeStorage.setItem('leafbook_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    safeStorage.setItem('leafbook_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    safeStorage.setItem('leafbook_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    safeStorage.setItem('leafbook_sent_emails', JSON.stringify(sentEmails));
  }, [sentEmails]);

  useEffect(() => {
    if (resendApiKey) {
      safeStorage.setItem('leafbook_resend_key', resendApiKey);
    }
  }, [resendApiKey]);

  // Cart actions
  const addToCart = (book, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity }];
    });
  };

  const updateCartQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.book.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Helper to generate temporary download link (valid for 24 hours per assignment requirement)
  const generateTempDownloadLink = (orderId) => {
    const token = 'tok_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    const expiresDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const formattedExpires = `${expiresDate.getDate()} ${thaiMonths[expiresDate.getMonth()]} 2026 ${String(expiresDate.getHours()).padStart(2, '0')}:${String(expiresDate.getMinutes()).padStart(2, '0')} (อายุ 24 ชม.)`;
    return {
      token,
      expiresAt: formattedExpires,
      url: `https://leafbook-demo.vercel.app/download?order=${orderId}&token=${token}`
    };
  };

  // Requirement: Checkout สร้างเลขคำสั่งซื้อและสถานะ PENDING ได้
  const createOrder = (buyerInfo) => {
    if (cart.length === 0) return null;
    const now = new Date();
    const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const formattedDate = `${now.getDate()} ${thaiMonths[now.getMonth()]} 2026 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newId = `ORD2026${String(orders.length + 1).padStart(3, '0')}`;

    const newOrder = {
      id: newId,
      date: formattedDate,
      status: 'PENDING', // Initial status is ALWAYS PENDING per requirement
      statusText: 'รอชำระเงิน',
      total: cartTotal,
      buyer: buyerInfo || userProfile,
      items: cart.map(item => ({
        bookId: item.book.id,
        title: item.book.thaiTitle || item.book.title,
        englishTitle: item.book.title,
        author: item.book.author,
        price: item.book.price,
        quantity: item.quantity,
        coverType: item.book.coverType
      }))
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    return newOrder;
  };

  // Real Email Delivery via Resend API
  const sendEmailViaResend = async (orderData, customKey = null) => {
    if (!orderData) return { success: false, error: 'ไม่พบข้อมูลคำสั่งซื้อ' };

    const recipientEmail = orderData.buyer?.email || 'you@example.com';
    setLastEmailStatus({
      loading: true,
      success: null,
      messageId: null,
      error: null,
      sentTo: recipientEmail
    });

    const key = customKey || resendApiKey || safeStorage.getItem('leafbook_resend_key');

    try {
      const payload = {
        to: recipientEmail,
        orderId: orderData.id,
        bookTitle: orderData.items?.[0]?.title || 'e-Book คุณภาพจาก LeafBook',
        buyerName: orderData.buyer?.name || 'ลูกค้า',
        tempDownloadUrl: orderData.tempDownloadLink?.url || `https://leafbook-demo.vercel.app/download?order=${orderData.id}`,
        expiresAt: orderData.tempDownloadLink?.expiresAt || 'อายุ 24 ชั่วโมง',
        total: orderData.total,
        apiKey: key
      };

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setLastEmailStatus({
          loading: false,
          success: true,
          messageId: data.messageId,
          sentTo: recipientEmail,
          error: null
        });
        return { success: true, messageId: data.messageId };
      } else {
        setLastEmailStatus({
          loading: false,
          success: false,
          error: data.error || 'ส่งอีเมลไม่สำเร็จ',
          sentTo: recipientEmail,
          messageId: null
        });
        return { success: false, error: data.error };
      }
    } catch (err) {
      setLastEmailStatus({
        loading: false,
        success: false,
        error: err.message,
        sentTo: recipientEmail,
        messageId: null
      });
      return { success: false, error: err.message };
    }
  };

  // Requirement: เมื่อ Mock Payment สำเร็จ -> เปลี่ยนสถานะเป็น PAID และสร้างลิงก์ชั่วคราว + ส่งอีเมลจริง
  const completePayment = (orderId) => {
    const tempLink = generateTempDownloadLink(orderId);
    let updatedOrder = null;

    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          updatedOrder = {
            ...o,
            status: 'PAID',
            statusText: 'ชำระเงินแล้ว',
            tempDownloadLink: tempLink
          };
          return updatedOrder;
        }
        return o;
      })
    );

    const targetOrder = orders.find(o => o.id === orderId) || currentOrder;
    const finalOrder = updatedOrder || {
      ...targetOrder,
      status: 'PAID',
      statusText: 'ชำระเงินแล้ว',
      tempDownloadLink: tempLink
    };

    setCurrentOrder(finalOrder);

    // Save sent email record
    const emailRecord = {
      orderId,
      to: finalOrder.buyer?.email || 'you@example.com',
      recipientName: finalOrder.buyer?.name || 'ลูกค้าผู้มีอุปการคุณ',
      bookTitle: finalOrder.items?.[0]?.title || 'E-book เล่มที่สั่งซื้อ',
      sentAt: finalOrder.date || 'เมื่อสักครู่',
      expiresAt: tempLink.expiresAt,
      downloadToken: tempLink.token,
      tempDownloadUrl: tempLink.url
    };
    setSentEmails(prev => [emailRecord, ...prev.filter(e => e.orderId !== orderId)]);

    // Trigger Real Email Sending via Resend in background
    sendEmailViaResend(finalOrder);

    clearCart();
    setActivePage('success');
  };

  const cancelOrder = (orderId) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? { ...o, status: 'CANCELLED', statusText: 'ยกเลิก' }
          : o
      )
    );
  };

  // Requirement: หน้าติดตามคำสั่งซื้อไม่เปิดเผยข้อมูลของผู้อื่น (ต้องตรงทั้ง Order ID และ Email)
  const verifyAndTrackOrder = (orderId, email) => {
    const cleanId = (orderId || '').trim().replace(/^#/, '').toLowerCase();
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanId || !cleanEmail) {
      return { success: false, reason: 'กรุณากรอกทั้งเลขที่คำสั่งซื้อและอีเมล' };
    }

    const matched = orders.find(o => o.id.toLowerCase() === cleanId);
    if (!matched) {
      return { success: false, reason: 'ไม่พบข้อมูลคำสั่งซื้อนี้ในระบบ' };
    }

    // Strict email check to prevent leaking other customers' private data
    const buyerEmail = (matched.buyer?.email || '').trim().toLowerCase();
    if (buyerEmail !== cleanEmail) {
      return {
        success: false,
        reason: 'เพื่อความปลอดภัยของข้อมูล อีเมลที่ระบุไม่ตรงกับคำสั่งซื้อนี้'
      };
    }

    return { success: true, order: matched };
  };

  // Navigation helpers
  const navigateTo = (page, data = null) => {
    if (data?.book) setSelectedBook(data.book);
    if (data?.order) setCurrentOrder(data.order);
    if (data?.trackingSearch) setTrackingSearch(data.trackingSearch);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        books,
        activePage,
        setActivePage,
        selectedBook,
        setSelectedBook,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        orders,
        currentOrder,
        setCurrentOrder,
        createOrder,
        completePayment,
        cancelOrder,
        userProfile,
        setUserProfile,
        trackingSearch,
        setTrackingSearch,
        readerBook,
        setReaderBook,
        searchQuery,
        setSearchQuery,
        navigateTo,
        verifyAndTrackOrder,
        sentEmails,
        viewingEmail,
        setViewingEmail,
        resendApiKey,
        setResendApiKey,
        isResendModalOpen,
        setIsResendModalOpen,
        lastEmailStatus,
        sendEmailViaResend
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
