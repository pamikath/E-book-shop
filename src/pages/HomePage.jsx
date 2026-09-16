import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ArrowRight, Check, BookOpen } from 'lucide-react';
import BookCover from '../components/BookCover';

export default function HomePage() {
  const { books, navigateTo, addToCart, searchQuery, setSearchQuery } = useStore();
  const [addedBookId, setAddedBookId] = useState(null);

  const handleAddToCart = (e, book) => {
    e.stopPropagation();
    addToCart(book, 1);
    setAddedBookId(book.id);
    setTimeout(() => setAddedBookId(null), 1500);
  };

  // Filter books based on search
  const filteredBooks = books.filter(book => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      (book.thaiTitle && book.thaiTitle.toLowerCase().includes(q)) ||
      book.author.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner (Matching Screen 1) */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl mx-4 sm:mx-6 max-w-6xl md:mx-auto mt-4 md:mt-6 bg-gradient-to-r from-[#195a37] via-[#207247] to-[#124d2e] text-white shadow-lg shadow-emerald-950/10">
        {/* Decorative natural background illustrations */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <svg viewBox="0 0 1000 400" className="w-full h-full object-cover">
            <path d="M0,200 C300,100 400,250 700,120 C900,50 1000,180 1000,180 L1000,400 L0,400 Z" fill="#ffffff" opacity="0.15" />
            <path d="M0,280 C200,220 500,320 800,220 C950,180 1000,260 1000,260 L1000,400 L0,400 Z" fill="#ffffff" opacity="0.2" />
          </svg>
        </div>

        {/* Floating Book Art on the right (like in mockup banner) */}
        <div className="absolute -right-8 -bottom-10 hidden md:flex items-end opacity-85 pointer-events-none select-none">
          <div className="w-56 h-72 rounded-lg bg-emerald-900/60 border-2 border-emerald-400/30 shadow-2xl rotate-12 flex flex-col justify-between p-4">
            <div className="w-8 h-8 rounded-full bg-emerald-300/30" />
            <div className="space-y-2">
              <div className="w-3/4 h-3 bg-white/40 rounded" />
              <div className="w-1/2 h-2 bg-white/20 rounded" />
            </div>
          </div>
          <div className="w-64 h-80 rounded-lg bg-gradient-to-tr from-emerald-800 to-teal-700 border-2 border-emerald-300/40 shadow-2xl -ml-28 rotate-6 flex flex-col justify-between p-5">
            <BookOpen className="w-8 h-8 text-emerald-300" />
            <div className="space-y-2">
              <div className="w-4/5 h-4 bg-white/60 rounded" />
              <div className="w-2/3 h-2.5 bg-white/40 rounded" />
              <div className="w-1/2 h-2.5 bg-emerald-300/60 rounded" />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-16 md:max-w-2xl">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm font-sans">
            หนังสือดี ๆ<br />เริ่มต้นที่นี่
          </h1>
          <p className="mt-3 text-sm sm:text-base text-emerald-100 font-light max-w-lg">
            E-book คุณภาพ เพื่อการเรียนรู้และพัฒนาตัวเอง
          </p>

          {/* Banner Search Input Box (Matching Screen 1) */}
          <div className="mt-6 sm:mt-8 flex items-center bg-white rounded-full p-1.5 shadow-xl max-w-md ring-2 ring-white/30">
            <div className="pl-3 sm:pl-4 pr-2 text-gray-400">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
            </div>
            <input
              type="text"
              placeholder="ค้นหาหนังสือ, ชื่อผู้แต่ง, หมวดหมู่..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={() => {}}
              className="bg-leaf-primary hover:bg-leaf-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>ค้นหา</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Section: หนังสือแนะนำ (Recommended Books) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight font-sans">
            หนังสือแนะนำ
          </h2>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs sm:text-sm font-medium text-leaf-primary hover:underline flex items-center gap-1"
          >
            <span>ดูทั้งหมด</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Book Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBooks.map((book) => {
            const isJustAdded = addedBookId === book.id;

            return (
              <div
                key={book.id}
                onClick={() => navigateTo('detail', { book })}
                className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-xs hover:shadow-md hover:border-leaf-border transition-all cursor-pointer flex flex-col justify-between group"
              >
                {/* Book Cover */}
                <div className="w-full flex justify-center py-2 relative">
                  <BookCover
                    type={book.coverType}
                    title={book.title}
                    author={book.author}
                    size="md"
                    className="group-hover:scale-102 transition-transform duration-200"
                  />
                </div>

                {/* Title & Price */}
                <div className="mt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-leaf-primary transition-colors font-sans">
                      {book.thaiTitle || book.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                      {book.author}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-gray-50">
                    <div className="flex items-baseline gap-1.5 mb-2.5">
                      <span className="text-xs sm:text-sm font-bold text-leaf-primary">
                        ฿ {book.price}
                      </span>
                      {book.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ฿ {book.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button (Matching Screen 1) */}
                    <button
                      onClick={(e) => handleAddToCart(e, book)}
                      className={`w-full py-1.5 sm:py-2 px-3 rounded-lg sm:rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                        isJustAdded
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-leaf-primary hover:bg-leaf-hover text-white shadow-xs active:scale-98'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>เพิ่มแล้ว!</span>
                        </>
                      ) : (
                        <span>หยิบใส่ตะกร้า</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
            <p className="text-gray-500 text-sm">ไม่พบหนังสือที่ตรงกับคำค้นหา "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs text-leaf-primary font-medium underline"
            >
              ล้างการค้นหา
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
