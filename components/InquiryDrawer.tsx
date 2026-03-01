"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiry, useInquiryDrawer, generateWhatsAppMessage, generateEmailBody } from "@/lib/inquiry-store";

export default function InquiryDrawer() {
  const { items, remove, update, clear, count } = useInquiry();
  const { isOpen, open, close, highlightCode, clearHighlight } = useInquiryDrawer();
  const [mounted, setMounted] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Shake floating button every 10 seconds
  useEffect(() => {
    if (!mounted || isOpen || count === 0) return;
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }, 10000);
    return () => clearInterval(interval);
  }, [mounted, isOpen, count]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Clear highlight after animation
  useEffect(() => {
    if (highlightCode) {
      const timer = setTimeout(clearHighlight, 1500);
      return () => clearTimeout(timer);
    }
  }, [highlightCode, clearHighlight]);

  const handleSendWhatsApp = () => {
    const msg = generateWhatsAppMessage(items);
    window.open(`https://wa.me/905396359822?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSendEmail = () => {
    const body = generateEmailBody(items);
    const subject = encodeURIComponent(`Quote Request - ${items.length} Sandvik Parts`);
    window.location.href = `mailto:berkan@bktrading.com.tr?subject=${subject}&body=${body}`;
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating Inquiry Pill ── */}
      {!isOpen && (
        <button
          onClick={() => open()}
          className={`fixed bottom-5 right-5 z-[80] flex items-center gap-2.5 rounded-full transition-all group ${
            count > 0
              ? "pl-5 pr-3.5 py-3 bg-white border border-gray-200 shadow-lg hover:shadow-xl"
              : "p-4 bg-white/90 border border-gray-200 shadow-md hover:shadow-lg hover:bg-white"
          } ${shake ? "animate-[wiggle_0.5s_ease-in-out]" : ""}`}
        >
          {count > 0 ? (
            <>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition">Inquiry</span>
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold"
                style={{ backgroundColor: "#c90000" }}
              >
                {count}
              </span>
            </>
          ) : (
            <svg className="w-7 h-7 text-gray-400 group-hover:text-gray-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          )}
        </button>
      )}

      {/* ── Popup Card (bottom-right, NOT full-height sidebar) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Subtle overlay - click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[90]"
              onClick={close}
            />

            {/* Popup Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="fixed bottom-5 right-5 z-[95] w-[340px] max-w-[calc(100vw-40px)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
              style={{ maxHeight: "min(480px, calc(100vh - 100px))" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-gray-900">Inquiry List</h2>
                  {count > 0 && (
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-full text-white text-[10px] font-bold"
                      style={{ backgroundColor: "#c90000" }}
                    >
                      {count}
                    </span>
                  )}
                </div>
                <button
                  onClick={close}
                  className="p-1 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-400">Add parts to get a quote</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {items.map((item) => (
                      <motion.div
                        key={item.code}
                        initial={item.code === highlightCode ? { backgroundColor: "rgb(254 242 242)" } : {}}
                        animate={{ backgroundColor: "rgb(255 255 255)" }}
                        transition={{ duration: 1.2 }}
                        className="px-4 py-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/spare-parts/sandvik/${item.slug}`}
                              onClick={close}
                              className="font-bold text-xs text-gray-900 hover:text-gray-600 transition"
                            >
                              {item.codeFormatted}
                            </Link>
                            <p className="text-[10px] text-gray-400 truncate">{item.name}</p>
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => update(item.code, { quantity: Math.max(1, item.quantity - 1) })}
                              className="w-5 h-5 flex items-center justify-center rounded bg-gray-50 hover:bg-gray-100 text-gray-500 text-[10px] font-bold transition"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-[10px] font-semibold text-gray-700">{item.quantity}</span>
                            <button
                              onClick={() => update(item.code, { quantity: Math.min(9999, item.quantity + 1) })}
                              className="w-5 h-5 flex items-center justify-center rounded bg-gray-50 hover:bg-gray-100 text-gray-500 text-[10px] font-bold transition"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => remove(item.code)}
                            className="p-0.5 text-gray-300 hover:text-red-500 transition"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleSendWhatsApp}
                      className="flex items-center justify-center gap-1.5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition text-[11px]"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp
                    </button>
                    <button
                      onClick={handleSendEmail}
                      className="flex items-center justify-center gap-1.5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition text-[11px]"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Email
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={clear}
                      className="text-[10px] text-gray-400 hover:text-red-500 font-medium transition"
                    >
                      Clear all
                    </button>
                    <Link
                      href="/inquiry"
                      onClick={close}
                      className="text-[10px] text-gray-400 hover:text-gray-600 font-medium transition"
                    >
                      Full page &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
