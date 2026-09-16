import React from 'react';
import { useStore } from '../context/StoreContext';
import { Home, ShoppingBag, User } from 'lucide-react';

export default function MobileBottomNav() {
  const { activePage, navigateTo, cartItemCount } = useStore();

  const navItems = [
    { id: 'home', label: 'หน้าร้าน', icon: Home },
    { id: 'cart', label: 'ตะกร้า', icon: ShoppingBag, badge: cartItemCount },
    { id: 'profile', label: 'โปรไฟล์', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 py-2 px-6 shadow-lg md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = 
            item.id === activePage || 
            (item.id === 'home' && activePage === 'detail') ||
            (item.id === 'profile' && (activePage === 'history' || activePage === 'tracking'));

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center transition-colors relative py-1 px-4 ${
                isActive ? 'text-leaf-primary font-medium' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.75]'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 bg-leaf-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
