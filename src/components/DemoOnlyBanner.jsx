import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DemoOnlyBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-b-2 border-amber-500 text-amber-950 px-3 py-2 sm:py-2.5 shadow-sm select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 sm:gap-3.5 flex-wrap text-center">
        {/* Large Badge */}
        <span className="inline-flex items-center gap-1.5 bg-amber-950 text-amber-300 px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm md:text-base font-black tracking-wider uppercase shadow-xs">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse stroke-[2.5]" />
          <span>DEMO ONLY</span>
        </span>

        {/* Large Clear Description */}
        <span className="text-xs sm:text-sm md:text-base font-extrabold text-amber-950 tracking-tight leading-tight">
          ระบบจำลองเพื่อการศึกษาเท่านั้น • ห้ามรับหรือโอนเงินจริง (Mock Payment Only)
        </span>
      </div>
    </div>
  );
}
