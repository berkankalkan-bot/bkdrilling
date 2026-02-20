"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState, useCallback } from "react";

export default function Home() {
  const [activeSandvikSection, setActiveSandvikSection] = useState<string | null>(null);
  const [activeEpirocSection, setActiveEpirocSection] = useState<string | null>(null);

  // Section hover states for machine rotation
  const [sandvikSurfaceHover, setSandvikSurfaceHover] = useState(false);
  const [sandvikUndergroundHover, setSandvikUndergroundHover] = useState(false);
  const [epirocSurfaceHover, setEpirocSurfaceHover] = useState(false);
  const [epirocUndergroundHover, setEpirocUndergroundHover] = useState(false);

  // 3D Tilt depth effect — mouse position tracking
  const [sandvikTilt, setSandvikTilt] = useState({ x: 0, y: 0 });
  const [epirocTilt, setEpirocTilt] = useState({ x: 0, y: 0 });

  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>, setter: (v: { x: number; y: number }) => void) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setter({ x: x * 6, y: y * -5 }); // max ±3deg X, ±2.5deg Y
  }, []);

  const resetTilt = useCallback((setter: (v: { x: number; y: number }) => void) => {
    setter({ x: 0, y: 0 });
  }, []);

  return (
    <div className="w-full">

      {/* Select Your Brand - SANDVIK & EPIROC */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Select Your Drilling Machine Brand</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* ═══════ SANDVIK ═══════ */}
            <div
              className="group/card cursor-pointer"
              style={{ perspective: '800px' }}
              onMouseMove={(e) => handleTilt(e, setSandvikTilt)}
              onMouseLeave={() => resetTilt(setSandvikTilt)}
            >
              <div className="relative h-[440px] bg-gradient-to-br from-[#E53935] to-[#C62828] rounded-2xl overflow-hidden
                ring-1 ring-white/10 hover:ring-white/20"
                style={{
                  transform: `rotateY(${sandvikTilt.x}deg) rotateX(${sandvikTilt.y}deg)`,
                  boxShadow: sandvikTilt.x === 0 && sandvikTilt.y === 0
                    ? '0 10px 30px -5px rgba(0,0,0,0.2)'
                    : `${sandvikTilt.x * -2}px ${sandvikTilt.y * -2 + 20}px 50px -5px rgba(229,57,53,0.45), ${sandvikTilt.x * -1}px ${sandvikTilt.y * -1 + 10}px 25px -3px rgba(0,0,0,0.3)`,
                  transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                }}>

                {/* Glass inner highlight — top edge shimmer */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-50 pointer-events-none" />

                {/* Divider line — fades on card hover */}
                <div className="absolute top-1/2 left-[10%] w-[80%] h-[2px] z-30 -translate-y-1/2 pointer-events-none
                  transition-opacity duration-100 group-hover/card:opacity-0
                  bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                {/* SANDVIK text — premium glow + shimmer, fades on card hover */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none
                  transition-all duration-100 group-hover/card:opacity-0 group-hover/card:scale-90">
                  {/* Radial glow behind text */}
                  <div className="absolute top-1/2 left-1/2 w-[60%] h-[60%] rounded-full animate-brand-glow-bg pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(229,57,53,0.3) 40%, transparent 70%)' }} />
                  <span className="relative brand-shimmer-text text-6xl md:text-7xl font-bold animate-brand-text">SANDVIK</span>
                </div>

                {/* ── TOP HALF — Surface ── */}
                <Link
                  href="/spare-parts/sandvik?category=surface"
                  className="absolute top-0 left-0 w-full h-[calc(50%-1px)] z-40
                    transition-transform duration-150 ease-out group-hover/card:-translate-y-[10px]"
                  onMouseEnter={() => setSandvikSurfaceHover(true)}
                  onMouseLeave={() => setSandvikSurfaceHover(false)}
                  onTouchStart={() => setActiveSandvikSection(activeSandvikSection === 'surface' ? null : 'surface')}
                >
                  {/* Color overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-[#FF6B6B] to-[#E53935] transition-opacity duration-150
                    ${activeSandvikSection === 'surface' ? 'opacity-100' : 'opacity-0'}
                    md:opacity-0 md:group-hover/card:opacity-100`} />

                  {/* Section glow on hover */}
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-100 z-10
                    ${sandvikSurfaceHover ? 'opacity-100' : 'opacity-0'}`}
                    style={{ boxShadow: 'inset 0 0 60px rgba(255,255,255,0.2), inset 0 0 120px rgba(255,107,107,0.15)' }} />

                  {/* Machine image container with glow & shine */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4">
                    {/* Radial glow behind machine */}
                    <div className={`absolute bottom-[10%] left-1/2 w-[70%] h-[70%] rounded-full pointer-events-none z-0
                      transition-opacity duration-150
                      ${sandvikSurfaceHover ? 'opacity-100 animate-machine-glow' : 'opacity-0'}`}
                      style={{ background: 'radial-gradient(circle, rgba(255,107,107,0.5) 0%, rgba(229,57,53,0.2) 50%, transparent 70%)' }} />

                    {/* Machine wrapper — aspect-ratio matches image for precise effect positioning */}
                    <div
                      className={`relative z-10 h-[80%]
                        transition-all duration-200
                        drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                        ${activeSandvikSection === 'surface' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                        md:opacity-0 md:scale-90
                        md:group-hover/card:opacity-100 md:group-hover/card:scale-100
                        ${sandvikSurfaceHover ? 'drop-shadow-[0_10px_40px_rgba(255,107,107,0.5)]' : ''}`}
                      style={{ aspectRatio: '3/2' }}
                    >
                      <img src="/images/surface-drill.png" alt="Surface Drill"
                        className="absolute inset-0 w-full h-full" style={{ background: 'none' }} />
                      {/* Drill contact — cartoon dust puffs + rock fragments */}
                      <div className={`absolute z-20 pointer-events-none
                        transition-opacity duration-200 ${sandvikSurfaceHover ? 'opacity-100' : 'opacity-0'}`}
                        style={{ top: '81%', left: '31%' }}>
                        {/* Cartoon dust puffs */}
                        <div className="absolute rounded-full animate-puff-up-1" style={{ width: 22, height: 22, background: 'radial-gradient(circle, rgba(210,200,185,0.95) 30%, rgba(180,170,150,0.6) 70%, transparent 100%)', top: 0, left: -6 }} />
                        <div className="absolute rounded-full animate-puff-up-2" style={{ width: 16, height: 16, background: 'radial-gradient(circle, rgba(220,210,195,0.9) 30%, rgba(190,180,160,0.55) 70%, transparent 100%)', top: 2, left: 8 }} />
                        <div className="absolute rounded-full animate-puff-up-3" style={{ width: 12, height: 12, background: 'radial-gradient(circle, rgba(200,190,175,0.85) 30%, rgba(170,160,140,0.5) 70%, transparent 100%)', top: -2, left: 2 }} />
                        {/* Rock fragments */}
                        <div className="absolute w-[5px] h-[3px] rounded-[1px]" style={{ background: '#4A4438', animation: 'rock-up-1 0.6s ease-out infinite', top: '2px', left: '4px' }} />
                        <div className="absolute w-[4px] h-[2.5px] rounded-[1px]" style={{ background: '#5C5549', animation: 'rock-up-3 0.55s ease-out infinite 0.05s', top: '0', left: '-2px' }} />
                        <div className="absolute w-[3px] h-[2px] rounded-[1px]" style={{ background: '#7A6E5E', animation: 'rock-up-2 0.55s ease-out infinite 0.08s', top: '1px', left: '0' }} />
                        <div className="absolute w-[2.5px] h-[1.5px] rounded-[0.5px]" style={{ background: '#4A4438', animation: 'rock-up-5 0.65s ease-out infinite 0.2s', top: '0', left: '8px' }} />
                        <div className="absolute w-[2px] h-[1.5px] rounded-[0.5px]" style={{ background: '#6B6050', animation: 'rock-up-4 0.7s ease-out infinite 0.12s', top: '3px', left: '1px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#8B7F6F', animation: 'rock-up-6 0.6s ease-out infinite 0.25s', top: '-1px', left: '6px' }} />
                        <div className="absolute w-[3.5px] h-[2px] rounded-[1px]" style={{ background: '#5C5549', animation: 'rock-up-4 0.58s ease-out infinite 0.15s', top: '1px', left: '10px' }} />
                        <div className="absolute w-[1px] h-[1px] rounded-full" style={{ background: '#635B4D', animation: 'rock-up-2 0.5s ease-out infinite 0.18s', top: '2px', left: '7px' }} />
                        <div className="absolute w-[1.5px] h-[1.5px] rounded-full" style={{ background: '#7A6E5E', animation: 'rock-up-1 0.65s ease-out infinite 0.32s', top: '3px', left: '-1px' }} />
                      </div>
                    </div>

                    {/* Shine sweep across machine */}
                    <div className={`absolute inset-0 z-20 pointer-events-none overflow-hidden
                      ${sandvikSurfaceHover ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="animate-shine-sweep absolute top-0 h-full w-[30%] -skew-x-12
                        bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>

                  {/* Label */}
                  <div className={`absolute bottom-2 left-0 w-full text-center z-10
                    transition-all duration-150
                    ${activeSandvikSection === 'surface' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    md:opacity-0 md:translate-y-2
                    md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0`}>
                    <span className="text-white text-lg md:text-xl font-bold tracking-wider
                      drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      Surface Drilling
                    </span>
                  </div>

                  {/* Edge glow — light through the crack */}
                  <div className="absolute bottom-0 left-[5%] w-[90%] h-[2px] z-20 pointer-events-none
                    bg-gradient-to-r from-transparent via-white/60 to-transparent
                    opacity-0 group-hover/card:opacity-100 transition-opacity duration-200
                    shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                </Link>

                {/* ── BOTTOM HALF — Underground ── */}
                <Link
                  href="/spare-parts/sandvik?category=underground"
                  className="absolute bottom-0 left-0 w-full h-[calc(50%-1px)] z-40
                    transition-transform duration-150 ease-out group-hover/card:translate-y-[10px]"
                  onMouseEnter={() => setSandvikUndergroundHover(true)}
                  onMouseLeave={() => setSandvikUndergroundHover(false)}
                  onTouchStart={() => setActiveSandvikSection(activeSandvikSection === 'underground' ? null : 'underground')}
                >
                  {/* Color overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#8B0000] to-[#C62828] transition-opacity duration-150
                    ${activeSandvikSection === 'underground' ? 'opacity-100' : 'opacity-0'}
                    md:opacity-0 md:group-hover/card:opacity-100`} />

                  {/* Section glow on hover */}
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-100 z-10
                    ${sandvikUndergroundHover ? 'opacity-100' : 'opacity-0'}`}
                    style={{ boxShadow: 'inset 0 0 60px rgba(255,255,255,0.2), inset 0 0 120px rgba(139,0,0,0.2)' }} />

                  {/* Machine image container with glow & shine */}
                  <div className="absolute inset-0 flex items-start justify-center pt-1">
                    {/* Radial glow behind machine */}
                    <div className={`absolute top-[10%] left-1/2 w-[70%] h-[70%] rounded-full pointer-events-none z-0
                      transition-opacity duration-150
                      ${sandvikUndergroundHover ? 'opacity-100 animate-machine-glow' : 'opacity-0'}`}
                      style={{ background: 'radial-gradient(circle, rgba(255,80,80,0.4) 0%, rgba(139,0,0,0.2) 50%, transparent 70%)' }} />

                    {/* Machine wrapper — aspect-ratio matches image for precise effect positioning */}
                    <div
                      className={`relative z-10 h-[80%]
                        transition-all duration-200
                        drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                        ${activeSandvikSection === 'underground' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                        md:opacity-0 md:scale-90
                        md:group-hover/card:opacity-100 md:group-hover/card:scale-100
                        ${sandvikUndergroundHover ? 'drop-shadow-[0_10px_40px_rgba(255,80,80,0.5)]' : ''}`}
                      style={{ aspectRatio: '3/2' }}
                    >
                      <img src="/images/underground-drill.png" alt="Underground Drill"
                        className="absolute inset-0 w-full h-full" style={{ background: 'none' }} />
                      {/* Boom Arm 1 (top) — cartoon dust puffs + rock fragments */}
                      <div className={`absolute z-20 pointer-events-none
                        transition-opacity duration-200 ${sandvikUndergroundHover ? 'opacity-100' : 'opacity-0'}`}
                        style={{ top: '25%', left: '10%' }}>
                        {/* Cartoon dust puffs */}
                        <div className="absolute rounded-full animate-puff-right-1" style={{ width: 20, height: 20, background: 'radial-gradient(circle, rgba(210,200,185,0.95) 30%, rgba(180,170,150,0.6) 70%, transparent 100%)', top: -5, left: 0 }} />
                        <div className="absolute rounded-full animate-puff-right-2" style={{ width: 14, height: 14, background: 'radial-gradient(circle, rgba(220,210,195,0.9) 30%, rgba(190,180,160,0.55) 70%, transparent 100%)', top: 4, left: 2 }} />
                        <div className="absolute rounded-full animate-puff-right-3" style={{ width: 10, height: 10, background: 'radial-gradient(circle, rgba(200,190,175,0.85) 30%, rgba(170,160,140,0.5) 70%, transparent 100%)', top: -1, left: -2 }} />
                        {/* Rock fragments — küçük ama çok */}
                        <div className="absolute w-[2px] h-[1.5px] rounded-[0.5px]" style={{ background: '#5C5549', animation: 'rock-right-1 0.5s ease-out infinite', top: '1px', left: '3px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#7A6E5E', animation: 'rock-right-2 0.45s ease-out infinite 0.06s', top: '3px', left: '1px' }} />
                        <div className="absolute w-[1.5px] h-[1.5px] rounded-[0.5px]" style={{ background: '#4A4438', animation: 'rock-right-3 0.55s ease-out infinite 0.12s', top: '-1px', left: '5px' }} />
                        <div className="absolute w-[1px] h-[1px] rounded-full" style={{ background: '#6B6050', animation: 'rock-right-4 0.5s ease-out infinite 0.08s', top: '4px', left: '2px' }} />
                        <div className="absolute w-[2px] h-[1px] rounded-[0.5px]" style={{ background: '#8B7F6F', animation: 'rock-right-5 0.55s ease-out infinite 0.2s', top: '0', left: '0' }} />
                        <div className="absolute w-[1px] h-[1px] rounded-full" style={{ background: '#635B4D', animation: 'rock-right-6 0.4s ease-out infinite 0.15s', top: '5px', left: '4px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#5C5549', animation: 'rock-right-1 0.48s ease-out infinite 0.25s', top: '2px', left: '6px' }} />
                        <div className="absolute w-[1px] h-[1.5px] rounded-full" style={{ background: '#4A4438', animation: 'rock-right-4 0.52s ease-out infinite 0.18s', top: '-1px', left: '2px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#7A6E5E', animation: 'rock-right-2 0.5s ease-out infinite 0.3s', top: '4px', left: '5px' }} />
                      </div>
                      {/* Boom Arm 2 (bottom) — cartoon dust puffs + rock fragments */}
                      <div className={`absolute z-20 pointer-events-none
                        transition-opacity duration-200 ${sandvikUndergroundHover ? 'opacity-100' : 'opacity-0'}`}
                        style={{ top: '33%', left: '5%' }}>
                        {/* Cartoon dust puffs */}
                        <div className="absolute rounded-full animate-puff-right-1" style={{ width: 18, height: 18, background: 'radial-gradient(circle, rgba(210,200,185,0.95) 30%, rgba(180,170,150,0.6) 70%, transparent 100%)', top: -4, left: 0 }} />
                        <div className="absolute rounded-full animate-puff-right-2" style={{ width: 13, height: 13, background: 'radial-gradient(circle, rgba(220,210,195,0.9) 30%, rgba(190,180,160,0.55) 70%, transparent 100%)', top: 3, left: 2 }} />
                        <div className="absolute rounded-full animate-puff-right-3" style={{ width: 9, height: 9, background: 'radial-gradient(circle, rgba(200,190,175,0.85) 30%, rgba(170,160,140,0.5) 70%, transparent 100%)', top: -1, left: -2 }} />
                        {/* Rock fragments — küçük ama çok (Boom 1 ile aynı) */}
                        <div className="absolute w-[2px] h-[1.5px] rounded-[0.5px]" style={{ background: '#5C5549', animation: 'rock-right-1 0.5s ease-out infinite 0.1s', top: '1px', left: '3px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#7A6E5E', animation: 'rock-right-2 0.45s ease-out infinite 0.16s', top: '3px', left: '1px' }} />
                        <div className="absolute w-[1.5px] h-[1.5px] rounded-[0.5px]" style={{ background: '#4A4438', animation: 'rock-right-3 0.55s ease-out infinite 0.22s', top: '-1px', left: '5px' }} />
                        <div className="absolute w-[1px] h-[1px] rounded-full" style={{ background: '#6B6050', animation: 'rock-right-4 0.5s ease-out infinite 0.08s', top: '4px', left: '2px' }} />
                        <div className="absolute w-[2px] h-[1px] rounded-[0.5px]" style={{ background: '#8B7F6F', animation: 'rock-right-5 0.55s ease-out infinite 0.3s', top: '0', left: '0' }} />
                        <div className="absolute w-[1px] h-[1px] rounded-full" style={{ background: '#635B4D', animation: 'rock-right-6 0.4s ease-out infinite 0.25s', top: '5px', left: '4px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#5C5549', animation: 'rock-right-1 0.48s ease-out infinite 0.35s', top: '2px', left: '6px' }} />
                        <div className="absolute w-[1px] h-[1.5px] rounded-full" style={{ background: '#4A4438', animation: 'rock-right-4 0.52s ease-out infinite 0.18s', top: '-1px', left: '2px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#7A6E5E', animation: 'rock-right-2 0.5s ease-out infinite 0.4s', top: '4px', left: '5px' }} />
                      </div>
                    </div>

                    {/* Shine sweep across machine */}
                    <div className={`absolute inset-0 z-20 pointer-events-none overflow-hidden
                      ${sandvikUndergroundHover ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="animate-shine-sweep absolute top-0 h-full w-[30%] -skew-x-12
                        bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>

                  {/* Label */}
                  <div className={`absolute bottom-10 left-0 w-full text-center z-10
                    transition-all duration-150
                    ${activeSandvikSection === 'underground' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    md:opacity-0 md:translate-y-2
                    md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0`}>
                    <span className="text-white text-lg md:text-xl font-bold tracking-wider
                      drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      Underground Drilling
                    </span>
                  </div>

                  {/* Edge glow — light through the crack */}
                  <div className="absolute top-0 left-[5%] w-[90%] h-[2px] z-20 pointer-events-none
                    bg-gradient-to-r from-transparent via-white/60 to-transparent
                    opacity-0 group-hover/card:opacity-100 transition-opacity duration-200
                    shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                </Link>

                {/* Glass inner highlight — bottom edge */}
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-50 pointer-events-none" />
              </div>
            </div>

            {/* ═══════ EPIROC ═══════ */}
            <div
              className="group/card cursor-pointer"
              style={{ perspective: '800px' }}
              onMouseMove={(e) => handleTilt(e, setEpirocTilt)}
              onMouseLeave={() => resetTilt(setEpirocTilt)}
            >
              <div className="relative h-[440px] bg-gradient-to-br from-[#EAB308] to-[#CA8A04] rounded-2xl overflow-hidden
                ring-1 ring-white/10 hover:ring-white/20"
                style={{
                  transform: `rotateY(${epirocTilt.x}deg) rotateX(${epirocTilt.y}deg)`,
                  boxShadow: epirocTilt.x === 0 && epirocTilt.y === 0
                    ? '0 10px 30px -5px rgba(0,0,0,0.2)'
                    : `${epirocTilt.x * -2}px ${epirocTilt.y * -2 + 20}px 50px -5px rgba(234,179,8,0.45), ${epirocTilt.x * -1}px ${epirocTilt.y * -1 + 10}px 25px -3px rgba(0,0,0,0.3)`,
                  transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                }}>

                {/* Glass inner highlight — top edge shimmer */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-50 pointer-events-none" />

                {/* Divider line */}
                <div className="absolute top-1/2 left-[10%] w-[80%] h-[2px] z-30 -translate-y-1/2 pointer-events-none
                  transition-opacity duration-100 group-hover/card:opacity-0
                  bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                {/* EPIROC text — premium glow + shimmer, fades on card hover */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none
                  transition-all duration-100 group-hover/card:opacity-0 group-hover/card:scale-90">
                  {/* Radial glow behind text */}
                  <div className="absolute top-1/2 left-1/2 w-[60%] h-[60%] rounded-full animate-brand-glow-bg pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(234,179,8,0.3) 40%, transparent 70%)' }} />
                  <span className="relative brand-shimmer-text text-6xl md:text-7xl font-bold animate-brand-text">EPIROC</span>
                </div>

                {/* ── TOP HALF — Surface ── */}
                <Link
                  href="/machines/epiroc/surface"
                  className="absolute top-0 left-0 w-full h-[calc(50%-1px)] z-40
                    transition-transform duration-150 ease-out group-hover/card:-translate-y-[10px]"
                  onMouseEnter={() => setEpirocSurfaceHover(true)}
                  onMouseLeave={() => setEpirocSurfaceHover(false)}
                  onTouchStart={() => setActiveEpirocSection(activeEpirocSection === 'surface' ? null : 'surface')}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b from-[#FCD34D]/60 to-[#EAB308]/40 transition-opacity duration-150
                    ${activeEpirocSection === 'surface' ? 'opacity-100' : 'opacity-0'}
                    md:opacity-0 md:group-hover/card:opacity-100`} />

                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-100 z-10
                    ${epirocSurfaceHover ? 'opacity-100' : 'opacity-0'}`}
                    style={{ boxShadow: 'inset 0 0 60px rgba(255,255,255,0.18), inset 0 0 120px rgba(252,211,77,0.15)' }} />

                  {/* Machine image container with glow & shine */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4">
                    {/* Radial glow behind machine */}
                    <div className={`absolute bottom-[10%] left-1/2 w-[70%] h-[70%] rounded-full pointer-events-none z-0
                      transition-opacity duration-150
                      ${epirocSurfaceHover ? 'opacity-100 animate-machine-glow' : 'opacity-0'}`}
                      style={{ background: 'radial-gradient(circle, rgba(252,211,77,0.5) 0%, rgba(234,179,8,0.2) 50%, transparent 70%)' }} />

                    {/* Machine wrapper — aspect-ratio matches image for precise effect positioning */}
                    <div
                      className={`relative z-10 h-[80%]
                        transition-all duration-200
                        drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                        ${activeEpirocSection === 'surface' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                        md:opacity-0 md:scale-90
                        md:group-hover/card:opacity-100 md:group-hover/card:scale-100
                        ${epirocSurfaceHover ? 'drop-shadow-[0_10px_40px_rgba(252,211,77,0.5)]' : ''}`}
                      style={{ aspectRatio: '3/2' }}
                    >
                      <img src="/images/epiroc-surface-drill.png" alt="Surface Drill"
                        className="absolute inset-0 w-full h-full" style={{ background: 'none' }} />
                      {/* Drill contact — cartoon dust puffs + rock fragments */}
                      <div className={`absolute z-20 pointer-events-none
                        transition-opacity duration-200 ${epirocSurfaceHover ? 'opacity-100' : 'opacity-0'}`}
                        style={{ top: '85%', left: '32%' }}>
                        {/* Cartoon dust puffs */}
                        <div className="absolute rounded-full animate-puff-up-1" style={{ width: 22, height: 22, background: 'radial-gradient(circle, rgba(210,200,185,0.95) 30%, rgba(180,170,150,0.6) 70%, transparent 100%)', top: 0, left: -6 }} />
                        <div className="absolute rounded-full animate-puff-up-2" style={{ width: 16, height: 16, background: 'radial-gradient(circle, rgba(220,210,195,0.9) 30%, rgba(190,180,160,0.55) 70%, transparent 100%)', top: 2, left: 8 }} />
                        <div className="absolute rounded-full animate-puff-up-3" style={{ width: 12, height: 12, background: 'radial-gradient(circle, rgba(200,190,175,0.85) 30%, rgba(170,160,140,0.5) 70%, transparent 100%)', top: -2, left: 2 }} />
                        {/* Rock fragments */}
                        <div className="absolute w-[5px] h-[3px] rounded-[1px]" style={{ background: '#4A4438', animation: 'rock-up-1 0.6s ease-out infinite', top: '2px', left: '4px' }} />
                        <div className="absolute w-[4px] h-[2.5px] rounded-[1px]" style={{ background: '#5C5549', animation: 'rock-up-3 0.55s ease-out infinite 0.05s', top: '0', left: '-2px' }} />
                        <div className="absolute w-[3px] h-[2px] rounded-[1px]" style={{ background: '#7A6E5E', animation: 'rock-up-2 0.55s ease-out infinite 0.08s', top: '1px', left: '0' }} />
                        <div className="absolute w-[2.5px] h-[1.5px] rounded-[0.5px]" style={{ background: '#4A4438', animation: 'rock-up-5 0.65s ease-out infinite 0.2s', top: '0', left: '8px' }} />
                        <div className="absolute w-[2px] h-[1.5px] rounded-[0.5px]" style={{ background: '#6B6050', animation: 'rock-up-4 0.7s ease-out infinite 0.12s', top: '3px', left: '1px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#8B7F6F', animation: 'rock-up-6 0.6s ease-out infinite 0.25s', top: '-1px', left: '6px' }} />
                        <div className="absolute w-[3.5px] h-[2px] rounded-[1px]" style={{ background: '#5C5549', animation: 'rock-up-4 0.58s ease-out infinite 0.15s', top: '1px', left: '10px' }} />
                        <div className="absolute w-[1px] h-[1px] rounded-full" style={{ background: '#635B4D', animation: 'rock-up-2 0.5s ease-out infinite 0.18s', top: '2px', left: '7px' }} />
                        <div className="absolute w-[1.5px] h-[1.5px] rounded-full" style={{ background: '#7A6E5E', animation: 'rock-up-1 0.65s ease-out infinite 0.32s', top: '3px', left: '-1px' }} />
                      </div>
                    </div>

                    {/* Shine sweep across machine */}
                    <div className={`absolute inset-0 z-20 pointer-events-none overflow-hidden
                      ${epirocSurfaceHover ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="animate-shine-sweep absolute top-0 h-full w-[30%] -skew-x-12
                        bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>

                  <div className={`absolute bottom-2 left-0 w-full text-center z-10
                    transition-all duration-150
                    ${activeEpirocSection === 'surface' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    md:opacity-0 md:translate-y-2
                    md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0`}>
                    <span className="text-white text-lg md:text-xl font-bold tracking-wider
                      drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      Surface Drilling
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-[5%] w-[90%] h-[2px] z-20 pointer-events-none
                    bg-gradient-to-r from-transparent via-white/60 to-transparent
                    opacity-0 group-hover/card:opacity-100 transition-opacity duration-200
                    shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                </Link>

                {/* ── BOTTOM HALF — Underground ── */}
                <Link
                  href="/machines/epiroc/underground"
                  className="absolute bottom-0 left-0 w-full h-[calc(50%-1px)] z-40
                    transition-transform duration-150 ease-out group-hover/card:translate-y-[10px]"
                  onMouseEnter={() => setEpirocUndergroundHover(true)}
                  onMouseLeave={() => setEpirocUndergroundHover(false)}
                  onTouchStart={() => setActiveEpirocSection(activeEpirocSection === 'underground' ? null : 'underground')}
                >
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#92400E] to-[#CA8A04] transition-opacity duration-150
                    ${activeEpirocSection === 'underground' ? 'opacity-100' : 'opacity-0'}
                    md:opacity-0 md:group-hover/card:opacity-100`} />

                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-100 z-10
                    ${epirocUndergroundHover ? 'opacity-100' : 'opacity-0'}`}
                    style={{ boxShadow: 'inset 0 0 60px rgba(255,255,255,0.18), inset 0 0 120px rgba(146,64,14,0.2)' }} />

                  {/* Machine image container with glow & shine */}
                  <div className="absolute inset-0 flex items-start justify-center pt-1">
                    {/* Radial glow behind machine */}
                    <div className={`absolute top-[10%] left-1/2 w-[70%] h-[70%] rounded-full pointer-events-none z-0
                      transition-opacity duration-150
                      ${epirocUndergroundHover ? 'opacity-100 animate-machine-glow' : 'opacity-0'}`}
                      style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.4) 0%, rgba(146,64,14,0.2) 50%, transparent 70%)' }} />

                    {/* Machine wrapper — aspect-ratio matches image for precise effect positioning */}
                    <div
                      className={`relative z-10 h-[80%]
                        transition-all duration-200
                        drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                        ${activeEpirocSection === 'underground' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                        md:opacity-0 md:scale-90
                        md:group-hover/card:opacity-100 md:group-hover/card:scale-100
                        ${epirocUndergroundHover ? 'drop-shadow-[0_10px_40px_rgba(234,179,8,0.5)]' : ''}`}
                      style={{ aspectRatio: '3/2' }}
                    >
                      <img src="/images/epiroc-underground-drill.png" alt="Underground Drill"
                        className="absolute inset-0 w-full h-full" style={{ background: 'none' }} />
                      {/* Single Boom Arm — cartoon dust puffs + rock fragments */}
                      <div className={`absolute z-20 pointer-events-none
                        transition-opacity duration-200 ${epirocUndergroundHover ? 'opacity-100' : 'opacity-0'}`}
                        style={{ top: '28%', left: '2%' }}>
                        {/* Cartoon dust puffs */}
                        <div className="absolute rounded-full animate-puff-right-1" style={{ width: 20, height: 20, background: 'radial-gradient(circle, rgba(210,200,185,0.95) 30%, rgba(180,170,150,0.6) 70%, transparent 100%)', top: -5, left: 0 }} />
                        <div className="absolute rounded-full animate-puff-right-2" style={{ width: 14, height: 14, background: 'radial-gradient(circle, rgba(220,210,195,0.9) 30%, rgba(190,180,160,0.55) 70%, transparent 100%)', top: 4, left: 2 }} />
                        <div className="absolute rounded-full animate-puff-right-3" style={{ width: 10, height: 10, background: 'radial-gradient(circle, rgba(200,190,175,0.85) 30%, rgba(170,160,140,0.5) 70%, transparent 100%)', top: -1, left: -2 }} />
                        {/* Rock fragments — küçük ama çok */}
                        <div className="absolute w-[2px] h-[1.5px] rounded-[0.5px]" style={{ background: '#5C5549', animation: 'rock-right-1 0.5s ease-out infinite', top: '1px', left: '3px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#7A6E5E', animation: 'rock-right-2 0.45s ease-out infinite 0.06s', top: '3px', left: '1px' }} />
                        <div className="absolute w-[1.5px] h-[1.5px] rounded-[0.5px]" style={{ background: '#4A4438', animation: 'rock-right-3 0.55s ease-out infinite 0.12s', top: '-1px', left: '5px' }} />
                        <div className="absolute w-[1px] h-[1px] rounded-full" style={{ background: '#6B6050', animation: 'rock-right-4 0.5s ease-out infinite 0.08s', top: '4px', left: '2px' }} />
                        <div className="absolute w-[2px] h-[1px] rounded-[0.5px]" style={{ background: '#8B7F6F', animation: 'rock-right-5 0.55s ease-out infinite 0.2s', top: '0', left: '0' }} />
                        <div className="absolute w-[1px] h-[1px] rounded-full" style={{ background: '#635B4D', animation: 'rock-right-6 0.4s ease-out infinite 0.15s', top: '5px', left: '4px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#5C5549', animation: 'rock-right-1 0.48s ease-out infinite 0.25s', top: '2px', left: '6px' }} />
                        <div className="absolute w-[1px] h-[1.5px] rounded-full" style={{ background: '#4A4438', animation: 'rock-right-4 0.52s ease-out infinite 0.18s', top: '-1px', left: '2px' }} />
                        <div className="absolute w-[1.5px] h-[1px] rounded-[0.5px]" style={{ background: '#7A6E5E', animation: 'rock-right-2 0.5s ease-out infinite 0.3s', top: '4px', left: '5px' }} />
                      </div>
                    </div>

                    {/* Shine sweep across machine */}
                    <div className={`absolute inset-0 z-20 pointer-events-none overflow-hidden
                      ${epirocUndergroundHover ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="animate-shine-sweep absolute top-0 h-full w-[30%] -skew-x-12
                        bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>

                  <div className={`absolute bottom-10 left-0 w-full text-center z-10
                    transition-all duration-150
                    ${activeEpirocSection === 'underground' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    md:opacity-0 md:translate-y-2
                    md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0`}>
                    <span className="text-white text-lg md:text-xl font-bold tracking-wider
                      drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      Underground Drilling
                    </span>
                  </div>

                  <div className="absolute top-0 left-[5%] w-[90%] h-[2px] z-20 pointer-events-none
                    bg-gradient-to-r from-transparent via-white/60 to-transparent
                    opacity-0 group-hover/card:opacity-100 transition-opacity duration-200
                    shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                </Link>

                {/* Glass inner highlight — bottom edge */}
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-50 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Links - Simplified */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/second-hand-parts">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🔄</div>
                  <h3 className="font-bold text-xl mb-2">Second Hand Parts</h3>
                  <p className="text-sm text-slate-600">Quality Used Equipment</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/compressors">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🌀</div>
                  <h3 className="font-bold text-xl mb-2">Compressors</h3>
                  <p className="text-sm text-slate-600">Air Compressor Systems</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/catalogue">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">📖</div>
                  <h3 className="font-bold text-xl mb-2">All Parts Catalogue</h3>
                  <p className="text-sm text-slate-600">Complete Product List</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Trademark Disclaimer */}
      <section className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-gray-700"></div>
              <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">Disclaimer</span>
              <div className="h-[1px] w-12 bg-gray-700"></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sandvik, Epiroc, Atlas Copco and Tamrock are registered trademarks of their respective owners.
              BK Drilling is an independent supplier and is not affiliated with, endorsed by, or authorized by
              any of these manufacturers. All brand names, part numbers, and product references are used solely
              for identification and compatibility purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
