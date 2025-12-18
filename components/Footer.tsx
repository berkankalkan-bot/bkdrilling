import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20 border-t-4 border-slate-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">BK DRILLING</h3>
            <p className="text-slate-400 text-sm mb-4">
              Professional drilling equipment and spare parts supplier. 
              Fast delivery, quality products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/machines" className="text-slate-400 hover:text-white transition">
                  Machines
                </Link>
              </li>
              <li>
                <Link href="/spare-parts" className="text-slate-400 hover:text-white transition">
                  Spare Parts
                </Link>
              </li>
              <li>
                <Link href="/hydraulic" className="text-slate-400 hover:text-white transition">
                  Hydraulic
                </Link>
              </li>
              <li>
                <Link href="/drifters" className="text-slate-400 hover:text-white transition">
                  Drifters
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Ankara, Turkey</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+905001234567" className="hover:text-white transition">
                  +90 500 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:info@bkdrilling.com" className="hover:text-white transition">
                  info@bkdrilling.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2025 BK Drilling. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
