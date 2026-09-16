import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Star, Tag, FileText, FileCheck, Minus, Plus, ShoppingBag, Zap, BookOpen } from 'lucide-react';
import BookCover from '../components/BookCover';

export default function BookDetailPage() {
  const { selectedBook, books, addToCart, navigateTo, setReaderBook } = useStore();
  const book = selectedBook || books[1]; // fallback to Atomic Habits
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(book, quantity);
    navigateTo('cart');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
      
      {/* Top back navigation bar */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-leaf-primary transition-colors py-1 px-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับหน้าร้าน</span>
        </button>
        <span className="text-xs text-gray-400 font-medium">รายละเอียดสินค้า</span>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xs">
        
        {/* Left Column: Book Cover */}
        <div className="md:col-span-5 flex flex-col items-center justify-start">
          <div className="w-full max-w-[240px] sm:max-w-[280px]">
            <BookCover
              type={book.coverType}
              title={book.title}
              author={book.author}
              size="lg"
            />
          </div>

          {/* Sample Read Button */}
          <button
            onClick={() => setReaderBook(book)}
            className="mt-4 w-full max-w-[240px] sm:max-w-[280px] py-2 px-3 rounded-xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100 text-leaf-primary text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>ทดลองอ่านตัวอย่างฟรี</span>
          </button>
        </div>

        {/* Right Column: Book Details (Matching Screen 2) */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-5">
          <div>
            {/* Title & Author */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">
              {book.thaiTitle || book.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              {book.author} {book.title !== book.thaiTitle && `(${book.title})`}
            </p>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                {book.rating || 4.8}
              </span>
              <span className="text-xs text-gray-400">
                ({book.reviewsCount || '1,245 รีวิว'})
              </span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <span className="text-2xl sm:text-3xl font-bold text-leaf-primary">
                ฿ {book.price}
              </span>
              {book.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ฿ {book.originalPrice}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {book.description}
            </p>

            {/* Book Metadata List (Matching Screen 2) */}
            <div className="mt-6 space-y-2.5 py-4 border-t border-b border-gray-100 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4 text-leaf-primary flex-shrink-0" />
                <span className="text-gray-400 font-light">ประเภท :</span>
                <span className="font-medium text-gray-800">{book.category}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-leaf-primary flex-shrink-0" />
                <span className="text-gray-400 font-light">จำนวนหน้า :</span>
                <span className="font-medium text-gray-800">{book.pages} หน้า</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-leaf-primary flex-shrink-0" />
                <span className="text-gray-400 font-light">รูปแบบ :</span>
                <span className="font-medium text-gray-800">{book.format}</span>
              </div>
            </div>
          </div>

          {/* Action Section: Quantity + Buttons */}
          <div className="space-y-4 pt-2">
            {/* Quantity Selector */}
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-1">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-semibold text-sm text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-gray-400 hidden sm:inline">ระบุจำนวนเล่ม</span>
            </div>

            {/* Notification alert */}
            {showNotification && (
              <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-lg flex items-center gap-2 animate-in fade-in">
                <span>✓ เพิ่ม "{book.thaiTitle || book.title}" ลงในตะกร้าแล้ว</span>
              </div>
            )}

            {/* Buttons (Matching Screen 2) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3 px-4 rounded-xl border-2 border-leaf-primary text-leaf-primary hover:bg-leaf-50 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>หยิบใส่ตะกร้า</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-xl bg-leaf-primary hover:bg-leaf-hover text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-98"
              >
                <Zap className="w-4 h-4" />
                <span>ซื้อเลย</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
