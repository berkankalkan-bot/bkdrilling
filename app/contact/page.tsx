"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get in touch with our expert team for all your drilling equipment needs
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {/* Address */}
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">Address</h3>
              <p className="text-sm text-gray-400">
                Feyzullah Mahallesi<br />
                Bağdat Caddesi No:286-290A<br />
                Daire:3 Mesa Cadde Projesi<br />
                Maltepe / İstanbul
              </p>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">Phone</h3>
              <a
                href="tel:+905396359822"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                +90 539 635 98 22
              </a>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">Email</h3>
              <a
                href="mailto:berkan@bktrading.com.tr"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                berkan@bktrading.com.tr
              </a>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">Working Hours</h3>
              <p className="text-sm text-gray-400">
                Monday - Friday<br />
                09:00 - 18:30
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Media & WhatsApp */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Connect With Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/905396359822"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#25D366] hover:bg-[#128C7E] rounded-xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25D366]/20"
            >
              <svg className="w-10 h-10 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-white font-bold">WhatsApp</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/bkdrilling"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 rounded-xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/20"
            >
              <svg className="w-10 h-10 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-white font-bold">Instagram</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/bkdrilling"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0A66C2] hover:bg-[#004182] rounded-xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <svg className="w-10 h-10 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-white font-bold">LinkedIn</span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/bkdrilling"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#1877F2] hover:bg-[#0d65d9] rounded-xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/20"
            >
              <svg className="w-10 h-10 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-white font-bold">Facebook</span>
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Our Location
                </h3>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.5!2d29.1315!3d40.9285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac79e1e9a7b8d%3A0x0!2sMaltepe%2C%20Istanbul!5e0!3m2!1sen!2str!4v1234567890"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BK Drilling Location"
                className="grayscale"
              />
            </CardContent>
          </Card>
        </div>

        {/* Company Info */}
        <div className="text-center max-w-3xl mx-auto pb-8">
          <h2 className="text-3xl font-bold text-white mb-4">BK Drilling</h2>
          <div className="w-16 h-1 bg-gray-700 mx-auto mb-6"></div>
          <p className="text-gray-400 leading-relaxed">
            We are your trusted partner for high-quality drilling equipment and spare parts.
            Specializing in SANDVIK and EPIROC machinery, we provide comprehensive solutions
            for both surface and underground drilling operations.
          </p>
        </div>
      </div>
    </div>
  );
}
