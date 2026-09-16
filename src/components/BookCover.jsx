import React from 'react';

export default function BookCover({ type, title, author, className = '', size = 'md' }) {
  // Size mapping
  const sizeClasses = {
    xs: 'w-12 h-16 text-[8px]',
    sm: 'w-16 h-22 text-[10px]',
    md: 'w-full aspect-[3/4] max-h-56',
    lg: 'w-full max-w-[260px] aspect-[3/4.2]'
  };

  // 1. Task Manager PRO Cover (from User PDF 1)
  if (type === 'taskmanager') {
    return (
      <div className={`relative overflow-hidden rounded-md flex flex-col items-center justify-between p-3 select-none text-[#2d2926] book-cover-shadow bg-[#fbf9f4] border border-[#e4decb] ${sizeClasses[size] || ''} ${className}`}>
        {/* Spine shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-3 book-spine pointer-events-none z-10" />

        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#5c5549] pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#5c5549] pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#5c5549] pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#5c5549] pointer-events-none" />

        {/* Top Diamond Motif */}
        <div className="z-10 text-[9px] tracking-widest text-[#8a7f6c] mt-1 flex items-center gap-1">
          <span>◈</span> <span>✧</span> <span>◈</span>
        </div>

        {/* Title */}
        <div className="z-10 text-center my-auto px-1 space-y-1">
          <div className="text-[9px] text-[#8a7f6c]">✦</div>
          <h2 className="font-serif font-black text-sm md:text-base tracking-wider text-[#2d2926] uppercase">
            TASK MANAGER
          </h2>
          <div className="font-serif font-black text-xs md:text-sm tracking-widest text-[#4d4436]">
            PRO
          </div>
          <div className="text-[8px] text-[#8a7f6c]">✦</div>
          <p className="text-[7.5px] text-[#6b6252] font-medium pt-1 line-clamp-2">
            คู่มือนักพัฒนาและซอร์สโค้ดฉบับสมบูรณ์
          </p>
        </div>

        {/* Bottom Motif & Developer Guide Box */}
        <div className="z-10 text-center pb-1 space-y-1.5 w-full flex flex-col items-center">
          <div className="text-[8px] tracking-widest text-[#8a7f6c] flex items-center gap-1">
            <span>◈</span> <span>✧</span> <span>◈</span>
          </div>
          <div className="px-2 py-0.5 rounded border border-[#b8ae9c] text-[7px] md:text-[8px] tracking-wider text-[#5c5344] uppercase font-mono font-semibold bg-[#f3ede0]">
            DEVELOPER GUIDE
          </div>
        </div>
      </div>
    );
  }

  // 2. Media Player PRO Cover (from User PDF 2)
  if (type === 'mediaplayer') {
    return (
      <div className={`relative overflow-hidden rounded-md flex flex-col items-center justify-between p-3 select-none text-white book-cover-shadow bg-[#141414] border border-neutral-800 ${sizeClasses[size] || ''} ${className}`}>
        {/* Spine shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-3 book-spine pointer-events-none z-10" />

        {/* Inner Dashed Card Frame */}
        <div className="absolute inset-2 border border-dashed border-[#f05d5e]/50 rounded-sm pointer-events-none" />

        {/* Top Heart / Flourish */}
        <div className="z-10 text-center pt-2 text-[#f05d5e] text-xs">
          ❦
        </div>

        {/* Title */}
        <div className="z-10 text-center my-auto px-2 space-y-2">
          <h2 className="font-sans font-extrabold text-sm md:text-base tracking-tight text-[#f05d5e] leading-snug drop-shadow-sm">
            MEDIA PLAYER PRO
          </h2>
          <div className="w-12 h-[1px] bg-[#f05d5e]/70 mx-auto" />
          <p className="text-[8px] md:text-[9px] text-neutral-300 font-light">
            คู่มือการพัฒนาและสถาปัตยกรรมระบบ
          </p>
          <p className="text-[7.5px] text-neutral-400">
            ฉบับปรับปรุง • กันยายน 2026
          </p>
        </div>

        {/* Bottom Flourish */}
        <div className="z-10 text-center pb-2 text-[#f05d5e] text-xs">
          ❦
        </div>
      </div>
    );
  }

  // 3. Tarot App Cover (from User PDF 3)
  if (type === 'tarot') {
    return (
      <div className={`relative overflow-hidden rounded-md flex flex-col items-center justify-between p-3 select-none text-white book-cover-shadow bg-[#1a1412] border border-neutral-800 ${sizeClasses[size] || ''} ${className}`}>
        {/* Spine shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-3 book-spine pointer-events-none z-10" />

        {/* Outer subtle frame */}
        <div className="w-full flex-1 border border-[#cba358]/80 rounded p-3 flex flex-col items-center justify-center my-auto relative">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-1 bg-[#1a1412] text-[8px] text-[#cba358]">✦</div>
          <h2 className="font-serif font-bold text-base md:text-lg tracking-widest text-[#dfba6e] uppercase text-center leading-tight">
            TAROT APP
          </h2>
          <p className="text-[8px] md:text-[9px] text-[#b89b65] italic tracking-wide text-center mt-2">
            Developer Guide & Source Code
          </p>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 bg-[#1a1412] text-[8px] text-[#cba358]">✦</div>
        </div>

        <div className="z-10 text-[7px] text-[#8c744c] font-sans tracking-widest uppercase mt-1">
          Python PyQt6
        </div>
      </div>
    );
  }

  if (type === 'mountain') {
    return (
      <div className={`relative overflow-hidden rounded-md flex flex-col justify-between p-3 select-none text-white book-cover-shadow bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#022c22] ${sizeClasses[size] || ''} ${className}`}>
        <div className="absolute left-0 top-0 bottom-0 w-3 book-spine pointer-events-none z-10" />
        <div className="absolute inset-0 opacity-70 pointer-events-none">
          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-80" />
          <div className="absolute top-4 right-6 w-1.5 h-1.5 bg-white rounded-full opacity-90 blur-[0.5px]" />
          <div className="absolute top-8 left-12 w-0.5 h-0.5 bg-white rounded-full" />
        </div>
        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-amber-100 opacity-80 blur-[1px]" />
        <div className="z-10 text-center mt-2 px-1">
          <div className="font-serif tracking-wider text-xs md:text-sm font-semibold uppercase text-slate-100 drop-shadow">
            The Mountain
          </div>
          <div className="font-serif tracking-widest text-[10px] md:text-xs text-emerald-300 font-light uppercase">
            Within
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
          <svg viewBox="0 0 100 65" className="w-full h-auto text-[#0d3f2e] opacity-90 fill-current">
            <polygon points="0,65 25,25 45,45 70,18 100,65" />
          </svg>
        </div>
        <div className="z-10 text-center text-[9px] text-emerald-200/80 tracking-wide mt-auto">
          {author || 'Alex Rivera'}
        </div>
      </div>
    );
  }

  if (type === 'atomic') {
    return (
      <div className={`relative overflow-hidden rounded-md flex flex-col items-center justify-between p-3 select-none text-stone-800 book-cover-shadow bg-[#f7f4eb] border border-stone-200 ${sizeClasses[size] || ''} ${className}`}>
        <div className="absolute left-0 top-0 bottom-0 w-3 book-spine pointer-events-none z-10" />
        <div className="z-10 text-center pt-1 text-[8px] tracking-widest text-stone-500 uppercase font-sans">
          #1 New York Times Bestseller
        </div>
        <div className="z-10 text-center my-auto px-1">
          <div className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#2d2926] leading-none">
            Atomic
          </div>
          <div className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#8c6d3b] leading-tight">
            Habits
          </div>
        </div>
        <div className="my-1 flex items-center justify-center z-10">
          <svg viewBox="0 0 60 70" className="w-12 h-14 text-[#2e6b3f]">
            <path d="M30 65 Q 30 40 30 25" stroke="#4a5d3f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M30 50 C 15 48 10 38 14 32 C 22 30 28 42 30 50 Z" fill="#387a4c" />
            <path d="M30 46 C 45 44 50 34 46 28 C 38 26 32 38 30 46 Z" fill="#2d683f" />
            <path d="M30 32 C 18 28 16 18 22 14 C 28 14 30 24 30 32 Z" fill="#4fa168" />
            <path d="M30 30 C 42 26 44 16 38 12 C 32 12 30 22 30 30 Z" fill="#3b8753" />
          </svg>
        </div>
        <div className="z-10 text-center pb-1">
          <div className="text-[9px] font-medium text-stone-600">
            {author || 'James Clear'}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'stars') {
    return (
      <div className={`relative overflow-hidden rounded-md flex flex-col justify-between p-3 select-none text-white book-cover-shadow bg-gradient-to-b from-[#090a1a] via-[#101438] to-[#1e1435] ${sizeClasses[size] || ''} ${className}`}>
        <div className="absolute left-0 top-0 bottom-0 w-3 book-spine pointer-events-none z-10" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-3 left-6 w-1 h-1 bg-cyan-200 rounded-full blur-[0.5px]" />
          <div className="absolute top-5 right-5 w-1.5 h-1.5 bg-yellow-100 rounded-full" />
        </div>
        <div className="z-10 text-center mt-3 px-1">
          <div className="font-sans font-semibold text-xs md:text-sm text-cyan-100 drop-shadow leading-snug">
            ดวงดาว
          </div>
          <div className="font-sans font-light text-[10px] md:text-xs text-amber-200/90 leading-tight">
            ในคืนที่มืดที่สุด
          </div>
        </div>
        <div className="z-10 text-center text-[9px] text-purple-200/80 tracking-wide mt-auto">
          {author || 'พราวประกายดาว'}
        </div>
      </div>
    );
  }

  // Fallback cover
  return (
    <div className={`relative overflow-hidden rounded-md flex flex-col justify-between p-3 select-none text-white book-cover-shadow bg-gradient-to-br from-emerald-800 to-teal-950 ${sizeClasses[size] || ''} ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-3 book-spine pointer-events-none z-10" />
      <div className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">LeafBook</div>
      <div className="my-auto text-center font-bold text-sm text-white">{title}</div>
      <div className="text-[10px] text-emerald-200 text-center">{author}</div>
    </div>
  );
}
