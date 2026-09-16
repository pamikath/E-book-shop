import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, User, Mail, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';
import BookCover from '../components/BookCover';

export default function CartCheckoutPage() {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartTotal, 
    createOrder, 
    navigateTo, 
    userProfile 
  } = useStore();

  const [buyerName, setBuyerName] = useState(userProfile.name || 'สมชาย ใจดี');
  const [buyerEmail, setBuyerEmail] = useState(userProfile.email || 'you@example.com');
  const [errors, setErrors] = useState({});

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!buyerName.trim()) newErrors.name = 'กรุณาระบุชื่อ-นามสกุล';
    if (!buyerEmail.trim() || !buyerEmail.includes('@')) newErrors.email = 'กรุณาระบุอีเมลที่ถูกต้อง';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new order and go to Mock Payment page
    const order = createOrder({
      name: buyerName,
      email: buyerEmail,
      phone: userProfile.phone || '081-234-5678'
    });

    if (order) {
      navigateTo('payment', { order });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 sm:py-10 space-y-6">
      
      {/* 3-Step Indicator (Matching Screen 3) */}
      <div className="flex items-center justify-between max-w-sm mx-auto px-4 select-none">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-leaf-primary text-white font-bold text-xs flex items-center justify-center shadow-xs">
            1
          </div>
          <span className="text-[11px] font-semibold text-leaf-primary mt-1.5">
            ตะกร้า
          </span>
        </div>

        {/* Line 1 */}
        <div className="flex-1 h-[2px] bg-emerald-200 mx-2 -mt-4" />

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-semibold text-xs flex items-center justify-center">
            2
          </div>
          <span className="text-[11px] text-gray-500 mt-1.5">
            ข้อมูลผู้ซื้อ
          </span>
        </div>

        {/* Line 2 */}
        <div className="flex-1 h-[2px] bg-gray-200 mx-2 -mt-4" />

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 font-semibold text-xs flex items-center justify-center">
            3
          </div>
          <span className="text-[11px] text-gray-400 mt-1.5">
            ยืนยันคำสั่งซื้อ
          </span>
        </div>
      </div>

      {/* Cart Container Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 sm:p-7 space-y-6">
        
        {/* Section 1: รายการสั่งซื้อ */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 font-sans mb-4">
            รายการสั่งซื้อ
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-10 text-gray-500 space-y-3">
              <ShoppingBag className="w-10 h-10 mx-auto text-gray-300" />
              <p className="text-sm">ตะกร้าสินค้าว่างเปล่า</p>
              <button
                onClick={() => navigateTo('home')}
                className="text-xs text-leaf-primary font-medium underline"
              >
                เลือกดูหนังสือ
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.book.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-14 h-18 flex-shrink-0">
                    <BookCover
                      type={item.book.coverType}
                      title={item.book.title}
                      author={item.book.author}
                      size="sm"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                      {item.book.thaiTitle || item.book.title}
                    </h3>
                    <div className="text-xs font-bold text-leaf-primary mt-1">
                      ฿ {item.book.price}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
                      <span>จำนวน : {item.quantity}</span>
                      <div className="inline-flex items-center border border-gray-200 rounded-md ml-2 bg-gray-50">
                        <button
                          onClick={() => updateCartQuantity(item.book.id, item.quantity - 1)}
                          className="px-1.5 py-0.5 text-gray-500 hover:text-gray-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => updateCartQuantity(item.book.id, item.quantity + 1)}
                          className="px-1.5 py-0.5 text-gray-500 hover:text-gray-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Delete & Subtotal */}
                  <div className="flex flex-col items-end justify-between self-stretch">
                    <button
                      onClick={() => removeFromCart(item.book.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="ลบรายการ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-gray-900">
                      ฿ {item.book.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subtotal */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-sm text-gray-800">รวมทั้งหมด</span>
            <span className="text-lg font-extrabold text-leaf-primary">
              ฿ {cartTotal}
            </span>
          </div>
        </div>

        {/* Section 2: ข้อมูลผู้ซื้อ (Buyer Info Form) */}
        {cart.length > 0 && (
          <form onSubmit={handleProceedToPayment} className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 font-sans">
              ข้อมูลผู้ซื้อ
            </h3>

            {/* Name Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="ชื่อ - นามสกุล เช่น สมชาย ใจดี"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2.5 bg-gray-50/70 border rounded-xl text-xs sm:text-sm outline-none transition-all ${
                    errors.name ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200 focus:border-leaf-primary focus:bg-white'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[11px] text-red-500 mt-1 pl-2">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="อีเมล เช่น you@example.com"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2.5 bg-gray-50/70 border rounded-xl text-xs sm:text-sm outline-none transition-all ${
                    errors.email ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200 focus:border-leaf-primary focus:bg-white'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-red-500 mt-1 pl-2">{errors.email}</p>}
            </div>

            {/* Submit Button (Matching Screen 3) */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-leaf-primary hover:bg-leaf-hover text-white font-semibold text-sm transition-all shadow-md shadow-leaf-primary/20 flex items-center justify-center gap-2 active:scale-98"
              >
                <span>ไปยังการชำระเงิน</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
