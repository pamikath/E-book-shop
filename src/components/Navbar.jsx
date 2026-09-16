import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { 
    activePage, 
    navigateTo, 
    cartItemCount, 
    searchQuery,
    setSearchQuery
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navLinks = [
    { id: 'home', label: 'หน้าร้าน' },
    { id: 'all-books', label: 'หนังสือทั้งหมด', action: () => navigateTo('home') },
    { id: 'tracking', label: 'ติดตามคำสั่งซื้อ' },
    { id: 'history', label: 'ประวัติคำสั่งซื้อ' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo (Matching UI) */}
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-2 group transition-transform active:scale-95 text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-leaf-700 to-leaf-500 flex items-center justify-center text-white shadow-sm shadow-leaf-700/20 group-hover:scale-105 transition-all">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 font-sans">
              Leaf<span className="text-leaf-primary font-extrabold">Book</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => link.action ? link.action() : navigateTo(link.id)}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive 
                      ? 'text-leaf-primary font-semibold' 
                      : 'text-gray-600 hover:text-leaf-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-leaf-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Toggle/Input */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 ring-1 ring-leaf-primary/30">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อหนังสือ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-xs w-28 sm:w-40 text-gray-800 placeholder-gray-400"
                    autoFocus
                    onBlur={() => !searchQuery && setShowSearchInput(false)}
                  />
                  <button 
                    onClick={() => { setSearchQuery(''); setShowSearchInput(false); }}
                    className="text-gray-400 hover:text-gray-600 ml-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  aria-label="ค้นหา"
                  className="p-2 text-gray-600 hover:text-leaf-primary hover:bg-leaf-50 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5 stroke-[1.75]" />
                </button>
              )}
            </div>

            {/* Shopping Cart Button with Badge */}
            <button
              onClick={() => navigateTo('cart')}
              aria-label="ตะกร้าสินค้า"
              className="p-2 text-gray-600 hover:text-leaf-primary hover:bg-leaf-50 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-leaf-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-75">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={() => navigateTo('profile')}
              aria-label="โปรไฟล์ผู้ใช้"
              className={`p-1.5 rounded-full border transition-all ${
                activePage === 'profile' 
                  ? 'border-leaf-primary bg-leaf-50 text-leaf-primary' 
                  : 'border-gray-200 text-gray-600 hover:border-leaf-primary/50'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-leaf-primary font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-leaf-primary rounded-lg"
              aria-label="เมนูหลัก"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => {
                link.action ? link.action() : navigateTo(link.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-sm font-medium rounded-md hover:bg-leaf-50 text-gray-700 hover:text-leaf-primary transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              {activePage === link.id && <span className="w-2 h-2 rounded-full bg-leaf-primary"></span>}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
