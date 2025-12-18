import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">

      {/* Select Your Brand - SANDVIK & EPIROC */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Select Your Preferred Category</h2>
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
                    className="absolute top-0 left-0 w-full h-[calc(50%+2px)] bg-[#FF6B6B]/0 hover:bg-[#FF6B6B]/100 transition-all duration-100 flex items-center justify-center group z-40 hover:translate-y-[-10px]"
                  >
                    <span className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                      Surface Drilling
                    </span>
                  </Link>
                  
                  <Link
                    href="/machines/sandvik/underground"
                    className="absolute bottom-0 left-0 w-full h-[calc(50%+2px)] bg-[#8B0000]/0 hover:bg-[#8B0000]/100 transition-all duration-100 flex items-center justify-center group z-40 hover:translate-y-[10px]"
                  >
                    <div className="flex flex-col items-center justify-center max-w-full px-2">
                      <img
                        src="/images/underground-drill.png"
                        alt="Underground Drill"
                        className="w-auto md:w-[300px] max-h-[55%] md:max-h-[55%] object-contain drop-shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
                        style={{ background: 'none' }}
                      />
                      <span className="mt-2 text-white text-sm md:text-base font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center z-50">
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
                    className="absolute top-0 left-0 w-full h-[calc(50%+2px)] bg-[#FCD34D]/0 hover:bg-[#FCD34D]/100 transition-all duration-100 flex items-center justify-center group/surface group-hover:translate-y-[-10px]"
                  >
                    <span className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                      Surface Drilling
                    </span>
                  </Link>
                  
                  <Link 
                    href="/machines/epiroc/underground" 
                    className="absolute bottom-0 left-0 w-full h-[calc(50%+1px)] bg-[#92400E]/0 hover:bg-[#92400E]/100 transition-all duration-100 flex items-center justify-center group/underground group-hover:translate-y-[10px]"
                  >
                    <span className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                      Underground Drilling
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Section - Kartların Altında */}
      <section className="relative text-white overflow-hidden min-h-[400px] flex items-center justify-center">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{objectPosition: 'top'}}
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full min-h-[400px] py-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg text-center">
            Professional Drilling Solutions
          </h2>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md text-center max-w-2xl">
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
