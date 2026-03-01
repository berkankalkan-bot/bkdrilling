"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface PartDrawingProps {
  src: string;
  alt: string;
  photoSrc?: string;
  photoAlt?: string;
}

const SCALES = [1, 1.5, 2];

export default function PartDrawing({ src, alt }: PartDrawingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [level, setLevel] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isCtrl, setIsCtrl] = useState(false);

  const scale = SCALES[level];
  const savedScroll = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const lastPt = useRef({ x: 0, y: 0 });

  const open = useCallback(() => {
    savedScroll.current = window.scrollY;
    setLevel(0);
    setPos({ x: 0, y: 0 });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setLevel(0);
    setPos({ x: 0, y: 0 });
    setIsCtrl(false);
    requestAnimationFrame(() => window.scrollTo(0, savedScroll.current));
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // ESC closes
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, close]);

  // Block wheel scroll
  useEffect(() => {
    if (!isOpen) return;
    const block = (e: WheelEvent) => e.preventDefault();
    window.addEventListener("wheel", block, { passive: false });
    return () => window.removeEventListener("wheel", block);
  }, [isOpen]);

  // Track Ctrl via mousemove (reliable)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setIsCtrl(e.ctrlKey || e.metaKey);
    // Drag to pan
    if (!isDragging.current) return;
    const dx = e.clientX - lastPt.current.x;
    const dy = e.clientY - lastPt.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasDragged.current = true;
    lastPt.current = { x: e.clientX, y: e.clientY };
    setPos(p => ({ x: p.x + dx, y: p.y + dy }));
  }, []);

  // Drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (level === 0) return;
    e.preventDefault();
    isDragging.current = true;
    hasDragged.current = false;
    lastPt.current = { x: e.clientX, y: e.clientY };
  }, [level]);

  // Drag end
  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Click drawing → cycle: 1x → 1.8x → 1x / Ctrl+click → zoom out
  const handleDrawingClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDragged.current) return; // was dragging, not a click

    const zoomOut = e.ctrlKey || e.metaKey;

    setLevel(prev => {
      if (zoomOut) {
        // Ctrl+click → zoom out
        if (prev === 0) return prev;
        setPos({ x: 0, y: 0 });
        return prev - 1;
      }
      // Normal click → cycle: 0 → 1 → 0
      const next = (prev + 1) % SCALES.length;
      if (next === 0) setPos({ x: 0, y: 0 }); // reset position
      return next;
    });
  }, []);

  // Overlay click → close
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  }, [close]);

  // Cursor logic for drawing
  const getDrawingCursor = () => {
    if (isDragging.current) return "grabbing";
    if (isCtrl && level > 0) return "zoom-out";
    if (level > 0) return "grab";
    return "zoom-in";
  };

  return (
    <>
      {/* Thumbnail */}
      <div
        className="relative bg-white rounded-xl border shadow-sm overflow-hidden cursor-pointer group h-full"
        onClick={open}
      >
        <div className="relative w-full h-full min-h-[140px]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain scale-y-[1.15] group-hover:scale-y-[1.17] transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-900/70 rounded">
          <span className="text-[9px] font-semibold text-white uppercase tracking-wider">Technical Drawing</span>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 bg-black/50 rounded text-white text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          Click to enlarge
        </div>
      </div>

      {/* Zoom modal — right side, left transparent for photo */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] select-none"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.25) 37%, rgba(0,0,0,0.5) 43%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.92) 68%, rgba(0,0,0,0.95) 100%)",
            cursor: "default",
          }}
          onClick={handleOverlayClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* X button */}
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Zoom badge */}
          <div className="absolute top-4 right-20 z-20 px-3 py-1.5 rounded-full bg-white/10 text-white/60 text-xs font-medium">
            {level === 0 ? "1x" : level === 1 ? "1.5x" : "2x"}
          </div>

          {/* Bottom hint */}
          <div className="absolute bottom-4 right-4 z-20 text-white/30 text-[11px] text-right max-w-[50vw]">
            {level === 0
              ? "Click drawing to zoom in · ESC to close"
              : level < SCALES.length - 1
                ? "Drag to pan · Click to zoom more · Ctrl+Click to zoom out · ESC to close"
                : "Drag to pan · Click to reset · Ctrl+Click to zoom out · ESC to close"
            }
          </div>

          {/* Drawing — right side, responsive width */}
          <div
            className="absolute inset-y-0 right-0 flex items-center justify-center"
            style={{ width: "clamp(320px, 58vw, 1100px)", padding: "clamp(16px, 3vw, 48px)" }}
            onClick={handleOverlayClick}
          >
            <div
              className="overflow-hidden"
              style={{ maxWidth: "100%", maxHeight: "90vh" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                draggable={false}
                onClick={handleDrawingClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                className="pointer-events-auto"
                style={{
                  maxWidth: "100%",
                  maxHeight: "88vh",
                  objectFit: "contain",
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  transformOrigin: "center center",
                  transition: isDragging.current ? "none" : "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  cursor: getDrawingCursor(),
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
