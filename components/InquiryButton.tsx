"use client";

import { useState } from "react";
import { useInquiry } from "@/lib/inquiry-store";

interface InquiryButtonProps {
  code: string;
  codeFormatted: string;
  name: string;
  model: string;
  slug: string;
  size?: "sm" | "md" | "lg";
}

export default function InquiryButton({ code, codeFormatted, name, model, slug, size = "md" }: InquiryButtonProps) {
  const { add, remove, isAdded } = useInquiry();
  const added = isAdded(code);
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) {
      remove(code);
    } else {
      add({ code, codeFormatted, name, model, slug });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 800);
    }
  };

  if (size === "sm") {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center justify-center gap-1.5 py-2 px-2 font-bold rounded-lg transition-all duration-200 text-[11px] text-white ${
          added
            ? "bg-green-600 hover:bg-red-700"
            : "hover:opacity-90"
        } ${justAdded ? "scale-105 ring-4 ring-green-400/40" : ""}`}
        style={!added ? { backgroundColor: "#c90000" } : undefined}
        title={added ? "Remove from inquiry list" : "Add to inquiry list"}
      >
        {added ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            Added
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add to Inquiry
          </>
        )}
      </button>
    );
  }

  if (size === "lg") {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center justify-center gap-2.5 w-full py-3.5 px-6 font-bold rounded-lg transition-all duration-200 text-base text-white ${
          added
            ? "bg-green-600 hover:bg-red-700"
            : "hover:opacity-90"
        } ${justAdded ? "scale-[1.02] ring-4 ring-green-400/40" : ""}`}
        style={!added ? { backgroundColor: "#c90000" } : undefined}
      >
        {added ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            Added to Inquiry - Click to Remove
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add to Inquiry List
          </>
        )}
      </button>
    );
  }

  // Default: md
  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 font-semibold rounded-lg transition-all duration-200 text-sm text-white ${
        added
          ? "bg-green-600 hover:bg-red-700"
          : "hover:opacity-90"
      } ${justAdded ? "scale-105 ring-4 ring-green-400/40" : ""}`}
      style={!added ? { backgroundColor: "#c90000" } : undefined}
    >
      {added ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          Added
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add to Inquiry
        </>
      )}
    </button>
  );
}
