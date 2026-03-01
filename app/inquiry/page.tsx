"use client";

import Link from "next/link";
import { useInquiry, generateWhatsAppMessage, generateEmailBody } from "@/lib/inquiry-store";

export default function InquiryPage() {
  const { items, update, remove, clear, count } = useInquiry();

  const handleSendWhatsApp = () => {
    const msg = generateWhatsAppMessage(items);
    window.open(`https://wa.me/905396359822?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSendEmail = () => {
    const body = generateEmailBody(items);
    const subject = encodeURIComponent(`Quote Request - ${items.length} Sandvik Parts`);
    window.location.href = `mailto:berkan@bktrading.com.tr?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">Inquiry List</h1>
          <p className="text-gray-300">
            {count > 0 ? `${count} part${count > 1 ? 's' : ''} in your inquiry list` : 'Your inquiry list is empty'}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-black transition">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-black font-medium">Inquiry List</li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-xl border shadow-sm">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your inquiry list is empty</h2>
            <p className="text-gray-500 mb-6">Browse our catalog and add parts you need a quote for.</p>
            <Link
              href="/spare-parts/sandvik"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Browse Sandvik Parts
            </Link>
          </div>
        ) : (
          <>
            {/* Parts Table */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-6">
              <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Parts in Your Inquiry</h2>
                <button
                  onClick={clear}
                  className="text-sm text-red-600 hover:text-red-700 font-medium transition"
                >
                  Clear All
                </button>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.code} className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      {/* Part Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/spare-parts/sandvik/${item.slug}`}
                          className="font-bold text-gray-900 hover:text-blue-600 transition"
                        >
                          {item.codeFormatted} - {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-0.5">{item.model}</p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-500 font-medium">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          max="9999"
                          value={item.quantity}
                          onChange={(e) => update(item.code, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                          className="w-16 h-8 text-center border rounded text-sm font-medium focus:border-black focus:outline-none"
                        />
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => remove(item.code)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition"
                        title="Remove from inquiry"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Note */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Add a note (optional)..."
                        value={item.note}
                        onChange={(e) => update(item.code, { note: e.target.value })}
                        className="w-full h-8 px-3 text-sm border rounded focus:border-black focus:outline-none placeholder-gray-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Send Actions */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Send Your Inquiry</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <button
                  onClick={handleSendWhatsApp}
                  className="flex items-center justify-center gap-2 py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition text-base"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Send via WhatsApp
                </button>
                <button
                  onClick={handleSendEmail}
                  className="flex items-center justify-center gap-2 py-4 px-6 bg-black hover:bg-gray-800 text-white font-bold rounded-lg transition text-base"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Send via Email
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">
                We typically respond within 1-2 business days
              </p>
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-6">
              <Link
                href="/spare-parts/sandvik"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Continue browsing parts &rarr;
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
