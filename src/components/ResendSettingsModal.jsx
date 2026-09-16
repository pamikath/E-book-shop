import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, KeyRound, Mail, CheckCircle2, AlertCircle, ExternalLink, Loader2, Send } from 'lucide-react';

export default function ResendSettingsModal({ isOpen, onClose }) {
  const { resendApiKey, setResendApiKey, userProfile } = useStore();
  const [apiKeyInput, setApiKeyInput] = useState(resendApiKey || '');
  const [testEmail, setTestEmail] = useState(userProfile?.email || 'you@example.com');
  const [sending, setSending] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setResendApiKey(apiKeyInput.trim());
    setResultMessage({ type: 'success', text: 'บันทึก Resend API Key เรียบร้อยแล้ว!' });
    setTimeout(() => setResultMessage(null), 3000);
  };

  const handleTestSend = async () => {
    const key = apiKeyInput.trim() || resendApiKey;
    if (!key) {
      setResultMessage({ type: 'error', text: 'กรุณาใส่ Resend API Key ก่อนทดสอบส่งอีเมล' });
      return;
    }
    if (!testEmail || !testEmail.includes('@')) {
      setResultMessage({ type: 'error', text: 'กรุณาระบุอีเมลผู้รับที่ถูกต้อง' });
      return;
    }

    setSending(true);
    setResultMessage(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testEmail.trim(),
          orderId: 'ORD2026-TEST',
          bookTitle: 'Atomic Habits (ฉบับทดสอบ)',
          buyerName: userProfile?.name || 'ผู้ทดสอบระบบ',
          tempDownloadUrl: 'https://leafbook-demo.vercel.app/download?test=1',
          expiresAt: 'อายุ 24 ชั่วโมง',
          total: 259,
          apiKey: key
        })
      });

      const data = await response.json();

      if (data.success) {
        setResultMessage({
          type: 'success',
          text: `✓ ส่งอีเมลจริงสำเร็จแล้ว! Message ID: ${data.messageId || 'สำเร็จ'}`
        });
      } else {
        setResultMessage({
          type: 'error',
          text: `ส่งไม่สำเร็จ: ${data.error}`
        });
      }
    } catch (err) {
      setResultMessage({
        type: 'error',
        text: `เกิดข้อผิดพลาดในการเชื่อมต่อ: ${err.message}`
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-200 font-sans">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base">ตั้งค่าส่งอีเมลจริงด้วย Resend</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Info note regarding Resend domain limitation per assignment page 4 */}
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3.5 text-xs space-y-1">
            <p className="font-bold">⚠️ ข้อกำหนดสำคัญจากใบงาน (หน้า 4):</p>
            <p className="leading-relaxed text-amber-800">
              หากใช้โดเมนทดสอบฟรี <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">onboarding@resend.dev</code> จะสามารถส่งไปยัง<strong>อีเมลที่คุณใช้สมัครบัญชี Resend เท่านั้น</strong>
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-3">
            <label className="block font-semibold text-gray-800 text-xs">
              Resend API Key (ขึ้นต้นด้วย re_...)
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="re_123456789_abcdef..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-mono text-xs outline-none focus:border-leaf-primary focus:bg-white transition-all"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <a
                href="https://resend.com/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-leaf-primary hover:underline flex items-center gap-1"
              >
                <span>รับ API Key ฟรีที่ resend.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="submit"
                className="px-4 py-1.5 bg-leaf-primary hover:bg-leaf-hover text-white font-medium text-xs rounded-lg transition-colors shadow-xs"
              >
                บันทึก Key
              </button>
            </div>
          </form>

          {/* Test Send Section */}
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <label className="block font-semibold text-gray-800 text-xs">
              ทดสอบส่งอีเมลจริงไปยังกล่องข้อความ
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="อีเมลบัญชี Resend ของคุณ"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs outline-none focus:border-leaf-primary"
              />
              <button
                type="button"
                onClick={handleTestSend}
                disabled={sending}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>{sending ? 'กำลังส่ง...' : 'ทดสอบส่ง'}</span>
              </button>
            </div>
          </div>

          {/* Result Alert */}
          {resultMessage && (
            <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
              resultMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {resultMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <p className="leading-snug">{resultMessage.text}</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium rounded-lg"
          >
            ปิด
          </button>
        </div>

      </div>
    </div>
  );
}
