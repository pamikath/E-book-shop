import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ChevronLeft, ChevronRight, BookOpen, Download, Check } from 'lucide-react';
import BookCover from './BookCover';

export default function EbookReaderModal() {
  const { readerBook, setReaderBook } = useStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState('base'); // 'sm' | 'base' | 'lg' | 'xl'
  const [downloaded, setDownloaded] = useState(false);

  if (!readerBook) return null;

  const chapters = readerBook.sampleContent || [
    {
      chapter: "บทนำ",
      text: "ยินดีต้อนรับสู่หนังสือ " + (readerBook.thaiTitle || readerBook.title) + " ฉบับเต็มรูปแบบดิจิทัล (E-book) จากสำนักพิมพ์ LeafBook คุณสามารถเปิดอ่านได้ทุกที่ทุกเวลาบนทุกอุปกรณ์"
    }
  ];

  const currentChapter = chapters[currentPage] || chapters[0];

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const fontClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#fefdfa] rounded-2xl w-full max-w-2xl h-[85vh] max-h-[720px] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Reader Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-[#f9f7f0]">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-leaf-primary" />
            <div>
              <h3 className="font-semibold text-sm text-stone-800 line-clamp-1">
                {readerBook.thaiTitle || readerBook.title}
              </h3>
              <p className="text-[11px] text-stone-500">{readerBook.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Font Size Adjust */}
            <div className="flex items-center bg-stone-200/70 rounded-lg p-0.5 text-xs font-medium text-stone-700">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 rounded ${fontSize === 'sm' ? 'bg-white shadow-xs' : 'hover:text-stone-900'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 rounded ${fontSize === 'base' ? 'bg-white shadow-xs' : 'hover:text-stone-900'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 rounded ${fontSize === 'lg' ? 'bg-white shadow-xs' : 'hover:text-stone-900'}`}
              >
                A+
              </button>
            </div>

            {/* Download File Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-leaf-primary hover:bg-leaf-hover text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
            >
              {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloaded ? 'บันทึกแล้ว' : 'ดาวน์โหลด PDF'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setReaderBook(null)}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Content Body */}
        <div className="flex-1 overflow-y-auto px-8 py-8 font-serif select-text text-stone-800">
          <div className="max-w-xl mx-auto space-y-6">
            
            {/* Chapter header */}
            <div className="border-b border-stone-200 pb-4 mb-6 text-center">
              <span className="text-xs uppercase tracking-widest text-leaf-primary font-sans font-semibold">
                หน้า {currentPage + 1} จาก {chapters.length}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2 font-sans">
                {currentChapter.chapter}
              </h2>
            </div>

            {/* Chapter body text */}
            <p className={`${fontClasses[fontSize]} text-stone-700 indent-8`}>
              {currentChapter.text}
            </p>

            <p className={`${fontClasses[fontSize]} text-stone-700 indent-8`}>
              การอ่านหนังสือดิจิทัลมอบความยืดหยุ่นและการเข้าถึงความรู้อย่างไร้ขีดจำกัด ไม่ว่าคุณจะอยู่ที่ใดบนโลกนี้ คุณสามารถพกพาคลังปัญญานี้ติดตัวไปได้ตลอดเวลา ขอบคุณที่สนับสนุนผลงานเขียนลิขสิทธิ์แท้ผ่านทาง LeafBook
            </p>

            {/* Book metadata card in reader */}
            <div className="mt-10 p-4 rounded-xl bg-stone-100 border border-stone-200 flex items-center gap-4 font-sans text-xs text-stone-600">
              <div className="w-12 h-16 flex-shrink-0">
                <BookCover type={readerBook.coverType} title={readerBook.title} author={readerBook.author} size="xs" />
              </div>
              <div>
                <div className="font-semibold text-stone-800">{readerBook.thaiTitle || readerBook.title}</div>
                <div className="text-stone-500 mt-0.5">รูปแบบ: {readerBook.format || 'PDF'} • ขนาด: {readerBook.fileSize || '15 MB'}</div>
                <div className="text-leaf-primary font-medium mt-1">✓ ลิขสิทธิ์ถูกต้องพร้อมอ่าน</div>
              </div>
            </div>

          </div>
        </div>

        {/* Reader Bottom Controls */}
        <div className="px-6 py-3 border-t border-stone-200 bg-[#f9f7f0] flex items-center justify-between text-xs text-stone-600">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ตอนก่อนหน้า</span>
          </button>

          <span className="font-medium">
            {currentPage + 1} / {chapters.length}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(chapters.length - 1, prev + 1))}
            disabled={currentPage === chapters.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 transition-colors"
          >
            <span>ตอนถัดไป</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
