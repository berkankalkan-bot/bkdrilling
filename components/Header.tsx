"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import InstantSearch from "./InstantSearch";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSandvikDropdown, setShowSandvikDropdown] = useState(false);
  const [showEpirocDropdown, setShowEpirocDropdown] = useState(false);
  const [showHydraulicDropdown, setShowHydraulicDropdown] = useState(false);
  const [showDriftersDropdown, setShowDriftersDropdown] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Main Header - Logo + Navigation */}
      <div className="bg-black">
        <div className="container mx-auto px-2 md:px-4 py-2 md:py-3">
          <div className="flex flex-row items-center justify-center gap-0 md:gap-8">
            <Link href="/" className="flex items-center flex-shrink-0 self-center mt-5 md:mt-8">
              <Image
                src="/images/bk-drilling-logo.png"
                alt="BK DRILLING"
                width={650}
                height={195}
                className="h-28 md:h-40 w-auto"
                priority
              />
            </Link>

            <nav className="flex flex-nowrap items-center justify-start gap-1 md:gap-6 overflow-x-auto scrollbar-hide -ml-8 md:ml-0 self-center">
              <Link
                href="/spare-parts"
                className="text-[9px] md:text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase"
              >
                SPARE PARTS
              </Link>

              {/* HYDRAULIC DRIFTER SERIES Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowHydraulicDropdown(true)}
                onMouseLeave={() => setShowHydraulicDropdown(false)}
              >
                <button className="text-[9px] md:text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase flex items-center gap-1">
                  HYDRAULIC DRIFTER SERIES
                  <ChevronDown className="hidden md:inline" size={16} />
                </button>
                {showHydraulicDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded w-48 z-50">
                    <Link href="/hydraulic/motors" className="block px-4 py-3 text-sm text-black hover:bg-slate-50 border-b">
                      Hydraulic Motors
                    </Link>
                    <Link href="/hydraulic/pumps" className="block px-4 py-3 text-sm text-black hover:bg-slate-50 border-b">
                      Hydraulic Pumps
                    </Link>
                    <Link href="/hydraulic/valves" className="block px-4 py-3 text-sm text-black hover:bg-slate-50 border-b">
                      Valves & Cylinders
                    </Link>
                    <Link href="/drifters/cop" className="block px-4 py-3 text-sm text-black hover:bg-slate-50 border-b">
                      COP Series
                    </Link>
                    <Link href="/drifters/pistons" className="block px-4 py-3 text-sm text-black hover:bg-slate-50 border-b">
                      Pistons & Chucks
                    </Link>
                    <Link href="/drifters/rock-drills" className="block px-4 py-3 text-sm text-black hover:bg-slate-50">
                      Rock Drills
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="text-[9px] md:text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase"
              >
                ABOUT US
              </Link>
              <Link
                href="/contact"
                className="text-[9px] md:text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase"
              >
                CONTACT
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Search Bar - SPARE PARTS'ın Altında */}
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <InstantSearch />
          </div>
        </div>
      </div>
    </header>
  );
}
