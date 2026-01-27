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
  const [showSparePartsDropdown, setShowSparePartsDropdown] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm relative z-50">
      {/* Main Header - Logo + Navigation */}
      <div className="bg-black overflow-visible">
        <div className="container mx-auto px-2 md:px-4 py-2 md:py-3 overflow-visible">
          <div className="flex flex-row items-center justify-center gap-0 md:gap-8 overflow-visible">
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

            <nav className="flex flex-nowrap items-center justify-start gap-1 md:gap-6 -ml-8 md:ml-0 self-center">
              {/* SPARE PARTS Dropdown - SANDVIK/EPIROC Style */}
              <div
                className="relative"
                onMouseEnter={() => setShowSparePartsDropdown(true)}
                onMouseLeave={() => setShowSparePartsDropdown(false)}
              >
                <button className="text-[9px] md:text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase flex items-center gap-1">
                  SPARE PARTS
                  <ChevronDown className="hidden md:inline" size={16} />
                </button>
                {showSparePartsDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-48 z-50">
                    <div className="bg-black/95 shadow-lg rounded border border-gray-700">
                      <Link href="/spare-parts/sandvik" className="block px-4 py-3 text-sm text-white hover:bg-gray-800 border-b border-gray-700">
                        SANDVIK
                      </Link>
                      <Link href="/spare-parts/epiroc" className="block px-4 py-3 text-sm text-white hover:bg-gray-800 border-b border-gray-700">
                        EPIROC
                      </Link>
                      <Link href="/spare-parts" className="block px-4 py-3 text-sm text-white hover:bg-gray-800">
                        All Spare Parts
                      </Link>
                    </div>
                  </div>
                )}
              </div>

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
                  <div className="absolute top-full left-0 pt-2 w-48 z-50">
                    <div className="bg-black/95 shadow-lg rounded border border-gray-700">
                      <Link href="/hydraulic/motors" className="block px-4 py-3 text-sm text-white hover:bg-gray-800 border-b border-gray-700">
                        Hydraulic Motors
                      </Link>
                      <Link href="/hydraulic/pumps" className="block px-4 py-3 text-sm text-white hover:bg-gray-800 border-b border-gray-700">
                        Hydraulic Pumps
                      </Link>
                      <Link href="/hydraulic/valves" className="block px-4 py-3 text-sm text-white hover:bg-gray-800 border-b border-gray-700">
                        Valves & Cylinders
                      </Link>
                      <Link href="/drifters/cop" className="block px-4 py-3 text-sm text-white hover:bg-gray-800 border-b border-gray-700">
                        COP Series
                      </Link>
                      <Link href="/drifters/pistons" className="block px-4 py-3 text-sm text-white hover:bg-gray-800 border-b border-gray-700">
                        Pistons & Chucks
                      </Link>
                      <Link href="/drifters/rock-drills" className="block px-4 py-3 text-sm text-white hover:bg-gray-800">
                        Rock Drills
                      </Link>
                    </div>
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
