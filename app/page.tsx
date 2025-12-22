"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [activeSandvikSection, setActiveSandvikSection] = useState<string | null>(null);
  const [activeEpirocSection, setActiveEpirocSection] = useState<string | null>(null);

  return (
    <div className="w-full">

      {/* Select Your Brand - SANDVIK & EPIROC */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Select Your Drilling Machine Brand</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* SANDVIK Card with Split Hover */}
            <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow rounded-none border-0 p-0">
              <CardContent className="p-0 m-0">
                <div className="relative h-96 bg-gradient-to-br from-[#E53935] to-[#C62828] flex items-center justify-center overflow-hidden">
                  {/* Tam ortadan bölme çizgisi - en üstte */}
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white z-30 transform -translate-y-1/2 pointer-events-none"></div>
                  
                  {/* SANDVIK yazısı - Anında kaybolacak */}
                  <div className="text-white text-6xl font-bold z-10 absolute group-hover:opacity-0 transition-none pointer-events-none">
                    SANDVIK
                  </div>
                  
                  {/* Split Hover Effect - Çok hızlı kopma */}
                  <Link
                    href="/machines/sandvik/surface"
                    onTouchStart={() => setActiveSandvikSection(activeSandvikSection === 'surface' ? null : 'surface')}
                    className={`absolute top-0 left-0 w-full h-[calc(50%+2px)] ${activeSandvikSection === 'surface' ? 'bg-[#FF6B6B]/100' : 'bg-[#FF6B6B]/0'} md:bg-[#FF6B6B]/0 md:hover:bg-[#FF6B6B]/100 transition-all duration-100 flex items-center justify-center group z-40 md:hover:translate-y-[-10px]`}
                  >
                    <div className="flex flex-col items-center justify-start max-w-full px-2 h-full pt-2">
                      <img
                        src="/images/surface-drill.png"
                        alt="Surface Drill"
                        className={`w-auto md:w-[600px] max-h-[90%] object-contain drop-shadow-xl ${activeSandvikSection === 'surface' ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 z-50 -mb-6`}
                        style={{ background: 'none' }}
                      />
                      <span className={`text-white text-xl md:text-2xl font-bold tracking-wider ${activeSandvikSection === 'surface' ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 text-center z-50 drop-shadow-lg`}>
                        Surface Drilling
                      </span>
                    </div>
                  </Link>
                  
                  <Link
                    href="/machines/sandvik/underground"
                    onTouchStart={() => setActiveSandvikSection(activeSandvikSection === 'underground' ? null : 'underground')}
                    className={`absolute bottom-0 left-0 w-full h-[calc(50%+2px)] ${activeSandvikSection === 'underground' ? 'bg-[#8B0000]/100' : 'bg-[#8B0000]/0'} md:bg-[#8B0000]/0 md:hover:bg-[#8B0000]/100 transition-all duration-100 flex items-center justify-center group z-40 md:hover:translate-y-[10px]`}
                  >
                    <div className="flex flex-col items-center justify-start max-w-full px-2 h-full -mt-4">
                      <img
                        src="/images/underground-drill.png"
                        alt="Underground Drill"
                        className={`w-auto md:w-[720px] max-h-[98%] object-contain drop-shadow-xl ${activeSandvikSection === 'underground' ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 z-50 -mb-12`}
                        style={{ background: 'none' }}
                      />
                      <span className={`text-white text-xl md:text-2xl font-bold tracking-wider ${activeSandvikSection === 'underground' ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 text-center z-50 drop-shadow-lg`}>
                        Underground Drilling
                      </span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* EPIROC Card with Split Hover */}
            <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow rounded-none border-0 p-0">
              <CardContent className="p-0 m-0">
                <div className="relative h-96 bg-gradient-to-br from-[#EAB308] to-[#CA8A04] flex items-center justify-center overflow-hidden">
                  {/* Tam ortadan bölme çizgisi - en üstte */}
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white z-30 transform -translate-y-1/2 pointer-events-none"></div>
                  
                  {/* EPIROC yazısı - Anında kaybolacak */}
                  <div className="text-white text-6xl font-bold z-10 absolute group-hover:opacity-0 transition-none">
                    EPIROC
                  </div>
                  
                  {/* Split Hover Effect - Çok hızlı kopma */}
                  <Link
                    href="/machines/epiroc/surface"
                    onTouchStart={() => setActiveEpirocSection(activeEpirocSection === 'surface' ? null : 'surface')}
                    className={`absolute top-0 left-0 w-full h-[calc(50%+2px)] ${activeEpirocSection === 'surface' ? 'bg-[#FCD34D]/60' : 'bg-[#FCD34D]/0'} md:bg-[#FCD34D]/0 md:hover:bg-[#FCD34D]/60 transition-all duration-100 flex items-center justify-center group z-40 md:hover:translate-y-[-10px]`}
                  >
                    <div className="flex flex-col items-center justify-start max-w-full px-2 h-full pt-2">
                      <img
                        src="/images/epiroc-surface-drill.png"
                        alt="Surface Drill"
                        className={`w-auto md:w-[600px] max-h-[90%] object-contain drop-shadow-xl ${activeEpirocSection === 'surface' ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 z-50 -mb-6`}
                        style={{ background: 'none' }}
                      />
                      <span className={`text-white text-xl md:text-2xl font-bold tracking-wider ${activeEpirocSection === 'surface' ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 text-center z-50 drop-shadow-lg`}>
                        Surface Drilling
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/machines/epiroc/underground"
                    onTouchStart={() => setActiveEpirocSection(activeEpirocSection === 'underground' ? null : 'underground')}
                    className={`absolute bottom-0 left-0 w-full h-[calc(50%+2px)] ${activeEpirocSection === 'underground' ? 'bg-[#92400E]/100' : 'bg-[#92400E]/0'} md:bg-[#92400E]/0 md:hover:bg-[#92400E]/100 transition-all duration-100 flex items-center justify-center group z-40 md:hover:translate-y-[10px]`}
                  >
                    <div className="flex flex-col items-center justify-start max-w-full px-2 h-full -mt-4">
                      <img
                        src="/images/epiroc-underground-drill.png"
                        alt="Underground Drill"
                        className={`w-auto md:w-[720px] max-h-[98%] object-contain drop-shadow-xl ${activeEpirocSection === 'underground' ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 z-50 -mb-12`}
                        style={{ background: 'none' }}
                      />
                      <span className={`text-white text-xl md:text-2xl font-bold tracking-wider ${activeEpirocSection === 'underground' ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 text-center z-50 drop-shadow-lg`}>
                        Underground Drilling
                      </span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Section - 21:9 Format */}
      <section className="relative text-white overflow-hidden h-[500px] md:h-[600px] flex items-center justify-center bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full py-16 px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl text-center text-white">
            Best Drilling Solutions
          </h2>
          <p className="text-sm md:text-2xl text-white drop-shadow-xl text-center max-w-5xl px-6">
            Discover our range of high-quality drilling equipment and spare parts
          </p>
        </div>
      </section>

      {/* Quick Links - Simplified */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/hydraulic">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">💧</div>
                  <h3 className="font-bold text-xl mb-2">Hydraulic</h3>
                  <p className="text-sm text-slate-600">Motors, Pumps & Valves</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/drifters">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🔨</div>
                  <h3 className="font-bold text-xl mb-2">Drifters</h3>
                  <p className="text-sm text-slate-600">Rock Drill Components</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/spare-parts">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">⚙️</div>
                  <h3 className="font-bold text-xl mb-2">All Parts</h3>
                  <p className="text-sm text-slate-600">Complete Catalog</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
