import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Download, CreditCard, ChevronRight, Eye, BookOpen, Clock } from 'lucide-react';
import BookCover from '../components/BookCover';

export default function OrderHistoryPage() {
  const { orders, navigateTo, setReaderBook, books } = useStore();
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'PAID' | 'CANCELLED'

  const filterTabs = [
    { id: 'ALL', label: 'ทั้งหมด' },
    { id: 'PENDING', label: 'รอชำระเงิน' },
    { id: 'PAID', label: 'ชำระเงินแล้ว' },
    { id: 'CANCELLED', label: 'ยกเลิก' },
  ];

  const filteredOrders = orders.filter(order => {
    if (filter === 'ALL') return true;
    return order.status === filter;
  });

  const handleOpenBook = (order) => {
    const firstItem = order.items?.[0];
    const book = books.find(b => b.id === firstItem?.bookId) || books[1];
    setReaderBook(book);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10 space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">
          ประวัติคำสั่งซื้อ
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          รายการสั่งซื้อและไฟล์ e-Book ของคุณทั้งหมด
        </p>
      </div>

      {/* Filter Tabs (Matching Screen 8) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
        {filterTabs.map(tab => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-leaf-primary text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Order Cards List (Matching Screen 8) */}
      <div className="space-y-4">
        {filteredOrders.map(order => {
          const isPaid = order.status === 'PAID';
          const isPending = order.status === 'PENDING';
          const isCancelled = order.status === 'CANCELLED';
          const firstItem = order.items?.[0] || {};

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-200 transition-all"
            >
              {/* Left: Thumbnail & Details */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-20 flex-shrink-0 cursor-pointer" onClick={() => handleOpenBook(order)}>
                  <BookCover
                    type={firstItem.coverType || 'atomic'}
                    title={firstItem.title}
                    author={firstItem.author}
                    size="sm"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs sm:text-sm text-gray-900">
                      #{order.id}
                    </span>
                    {/* Status Badge */}
                    {isPaid && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-leaf-primary">
                        PAID
                      </span>
                    )}
                    {isPending && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                        PENDING
                      </span>
                    )}
                    {isCancelled && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500">
                        CANCELLED
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-gray-400 mt-1">
                    {order.date}
                  </p>

                  <p className="text-xs font-medium text-gray-800 mt-0.5 truncate max-w-[220px]">
                    {firstItem.title}
                  </p>

                  <div className="text-xs sm:text-sm font-extrabold text-leaf-primary mt-1">
                    ฿ {order.total}
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                {isPaid && (
                  <button
                    onClick={() => handleOpenBook(order)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-leaf-primary hover:bg-leaf-hover text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>เปิดอ่าน e-Book</span>
                  </button>
                )}

                {isPending && (
                  <button
                    onClick={() => navigateTo('payment', { order })}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>ชำระเงิน</span>
                  </button>
                )}

                <button
                  onClick={() => navigateTo('tracking', { trackingSearch: { orderId: order.id, email: order.buyer?.email } })}
                  className="text-[11px] text-gray-500 hover:text-leaf-primary font-medium flex items-center gap-1 transition-colors px-1 py-0.5"
                >
                  <span>ดูรายละเอียด</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
            <Clock className="w-8 h-8 mx-auto text-gray-300 mb-2" />
            <p className="text-xs text-gray-500">ไม่มีคำสั่งซื้อในหมวดหมู่นี้</p>
          </div>
        )}
      </div>

    </div>
  );
}
