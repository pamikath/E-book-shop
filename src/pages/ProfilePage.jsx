import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Clock, MapPin, KeyRound, LogOut, Check, Camera, Edit2 } from 'lucide-react';

export default function ProfilePage() {
  const { userProfile, setUserProfile, navigateTo } = useStore();

  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'orders' | 'address' | 'password'
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name || 'สมชาย ใจดี');
  const [email, setEmail] = useState(userProfile.email || 'you@example.com');
  const [phone, setPhone] = useState(userProfile.phone || '081-234-5678');
  const [address, setAddress] = useState(userProfile.address || '123/45 ซอยสุขุมวิท 55 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const sidebarLinks = [
    { id: 'info', label: 'ข้อมูลส่วนตัว', icon: User },
    { id: 'orders', label: 'ประวัติคำสั่งซื้อ', icon: Clock, action: () => navigateTo('history') },
    { id: 'address', label: 'ที่อยู่จัดส่ง', icon: MapPin },
    { id: 'password', label: 'เปลี่ยนรหัสผ่าน', icon: KeyRound },
    { id: 'logout', label: 'ออกจากระบบ', icon: LogOut, action: () => alert('ออกจากระบบเรียบร้อยแล้ว') },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      name,
      email,
      phone,
      address
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Sidebar (Matching Screen 7) */}
        <aside className="md:col-span-4 bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 shadow-xs h-fit space-y-1">
          {sidebarLinks.map(link => {
            const Icon = link.icon;
            const isCurrent = activeTab === link.id;

            return (
              <button
                key={link.id}
                onClick={() => link.action ? link.action() : setActiveTab(link.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                  isCurrent
                    ? 'bg-emerald-50 text-leaf-primary font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-leaf-primary' : 'text-gray-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Content Area (Matching Screen 7) */}
        <main className="md:col-span-8 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Top User Card Header (Avatar + Name + Email + Edit Button) */}
          <div className="flex items-center gap-4 sm:gap-6 pb-6 border-b border-gray-100">
            {/* Avatar with Leaf Badge */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100/90 border-2 border-emerald-300 flex items-center justify-center text-leaf-primary">
                <svg viewBox="0 0 24 24" className="w-9 h-9 fill-current text-leaf-primary">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-sans">
                {name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-mono">
                {email}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-1.5 rounded-xl bg-leaf-primary hover:bg-leaf-hover text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'ยกเลิก' : 'แก้ไขข้อมูล'}</span>
            </button>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-leaf-primary text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>บันทึกข้อมูลเรียบร้อยแล้ว</span>
            </div>
          )}

          {/* Tab 1: ข้อมูลส่วนตัว */}
          {activeTab === 'info' && (
            <form onSubmit={handleSave} className="space-y-5">
              <h3 className="text-sm font-bold text-gray-900 font-sans">
                ข้อมูลส่วนตัว
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center text-xs sm:text-sm">
                <label className="text-gray-500">ชื่อ - นามสกุล</label>
                <div className="sm:col-span-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-leaf-primary focus:bg-white text-xs sm:text-sm"
                    />
                  ) : (
                    <span className="font-medium text-gray-800">{name}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center text-xs sm:text-sm">
                <label className="text-gray-500">อีเมล</label>
                <div className="sm:col-span-2">
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-leaf-primary focus:bg-white text-xs sm:text-sm"
                    />
                  ) : (
                    <span className="font-mono text-gray-800">{email}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center text-xs sm:text-sm">
                <label className="text-gray-500">เบอร์โทรศัพท์</label>
                <div className="sm:col-span-2">
                  {isEditing ? (
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-leaf-primary focus:bg-white text-xs sm:text-sm"
                    />
                  ) : (
                    <span className="font-mono text-gray-800">{phone}</span>
                  )}
                </div>
              </div>

              {/* Profile Image Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center text-xs sm:text-sm pt-2">
                <label className="text-gray-500">รูปโปรไฟล์</label>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-leaf-primary">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('ฟังก์ชันอัปโหลดรูปภาพ')}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-xs hover:bg-gray-50 transition-colors"
                  >
                    เปลี่ยนรูปภาพ
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-leaf-primary hover:bg-leaf-hover text-white text-xs font-semibold shadow-xs"
                  >
                    บันทึกการเปลี่ยนแปลง
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Tab 2: ที่อยู่จัดส่ง */}
          {activeTab === 'address' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 font-sans">ที่อยู่สำหรับออกใบเสร็จ / จัดส่ง</h3>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:border-leaf-primary"
              />
              <button
                onClick={() => alert('บันทึกที่อยู่เรียบร้อย')}
                className="px-4 py-2 rounded-xl bg-leaf-primary text-white text-xs font-medium"
              >
                บันทึกที่อยู่
              </button>
            </div>
          )}

          {/* Tab 3: เปลี่ยนรหัสผ่าน */}
          {activeTab === 'password' && (
            <form onSubmit={(e) => { e.preventDefault(); alert('เปลี่ยนรหัสผ่านสำเร็จ'); }} className="space-y-4 max-w-sm">
              <h3 className="text-sm font-bold text-gray-900 font-sans">เปลี่ยนรหัสผ่านใหม่</h3>
              <input
                type="password"
                placeholder="รหัสผ่านปัจจุบัน"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none"
              />
              <input
                type="password"
                placeholder="รหัสผ่านใหม่"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-leaf-primary text-white text-xs font-medium"
              >
                อัปเดตรหัสผ่าน
              </button>
            </form>
          )}

        </main>

      </div>
    </div>
  );
}
