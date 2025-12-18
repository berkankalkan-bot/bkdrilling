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
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/bk-drilling-logo.png"
                alt="BK DRILLING"
                width={600}
                height={180}
                className="h-44 w-auto"
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {/* SANDVIK Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowSandvikDropdown(true)}
                onMouseLeave={() => setShowSandvikDropdown(false)}
              >
                <Link
                  href="/machines/sandvik"
                  className="text-sm font-bold text-white hover:text-orange-400 transition whitespace-nowrap uppercase"
                >
                  SANDVIK
                </Link>
                {showSandvikDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded w-48 z-50">
                    <Link 
                      href="/machines/sandvik/surface" 
                      className="block px-4 py-3 text-sm text-black hover:bg-orange-50 border-b"
                    >
                      Surface Drilling
                    </Link>
                    <Link 
                      href="/machines/sandvik/underground" 
                      className="block px-4 py-3 text-sm text-black hover:bg-orange-50"
                    >
                      Underground Drilling
                    </Link>
                  </div>
                )}
              </div>

              {/* EPIROC Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowEpirocDropdown(true)}
                onMouseLeave={() => setShowEpirocDropdown(false)}
              >
                <Link
                  href="/machines/epiroc"
                  className="text-sm font-bold text-white hover:text-yellow-400 transition whitespace-nowrap uppercase"
                >
                  EPIROC
                </Link>
                {showEpirocDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded w-48 z-50">
                    <Link 
                      href="/machines/epiroc/surface" 
                      className="block px-4 py-3 text-sm text-black hover:bg-yellow-50 border-b"
                    >
                      Surface Drilling
                    </Link>
                    <Link 
                      href="/machines/epiroc/underground" 
                      className="block px-4 py-3 text-sm text-black hover:bg-yellow-50"
                    >
                      Underground Drilling
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                href="/spare-parts" 
                className="text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase"
              >
                SPARE PARTS
              </Link>
              
              {/* HYDRAULIC SERIES Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowHydraulicDropdown(true)}
                onMouseLeave={() => setShowHydraulicDropdown(false)}
              >
                <button className="text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase flex items-center gap-1">
                  HYDRAULIC SERIES
                  <ChevronDown size={16} />
                </button>
                {showHydraulicDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded w-48 z-50">
                    <Link href="/hydraulic/motors" className="block px-4 py-3 text-sm text-black hover:bg-slate-50 border-b">
                      Hydraulic Motors
                    </Link>
                    <Link href="/hydraulic/pumps" className="block px-4 py-3 text-sm text-black hover:bg-slate-50 border-b">
                      Hydraulic Pumps
                    </Link>
                    <Link href="/hydraulic/valves" className="block px-4 py-3 text-sm text-black hover:bg-slate-50">
                      Valves & Cylinders
                    </Link>
                  </div>
                )}
              </div>

              {/* DRIFTERS SERIES Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowDriftersDropdown(true)}
                onMouseLeave={() => setShowDriftersDropdown(false)}
              >
                <button className="text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase flex items-center gap-1">
                  DRIFTERS SERIES
                  <ChevronDown size={16} />
                </button>
                {showDriftersDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded w-48 z-50">
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
                className="text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase"
              >
                ABOUT US
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold text-white hover:text-gray-300 transition whitespace-nowrap uppercase"
              >
                CONTACT
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <Menu size={24} />
            </Button>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              <Link href="/machines" className="text-sm font-medium hover:text-gray-600">
                MACHINES
              </Link>
              <Link href="/spare-parts" className="text-sm font-bold hover:text-gray-600">
                SPARE PARTS
              </Link>
              <Link href="/hydraulic" className="text-sm font-medium hover:text-gray-600">
                HYDRAULIC
              </Link>
              <Link href="/drifters" className="text-sm font-medium hover:text-gray-600">
                DRIFTERS
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-gray-600">
                ABOUT US
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-gray-600">
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
