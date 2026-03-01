"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Part, getPhotoPath } from "@/lib/parts-types";
import InquiryButton from "@/components/InquiryButton";

interface Props {
  parts: Part[];
  models: { model: string; modelSlug: string; partCount: number }[];
}

export default function PartsListClient({ parts, models }: Props) {
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 24;

  const filtered = useMemo(() => {
    let result = parts;
    if (selectedModel) {
      result = result.filter((p) => p.modelSlug === selectedModel);
    }
    if (search.length >= 2) {
      const q = search.toLowerCase().replace(/\s+/g, "");
      result = result.filter((p) => {
        const code = p.code.toLowerCase();
        const formatted = p.codeFormatted.toLowerCase().replace(/\s+/g, "");
        const name = p.name.toLowerCase();
        return code.includes(q) || formatted.includes(q) || name.includes(q);
      });
    }
    return result;
  }, [parts, search, selectedModel]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Search by part number or name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none text-base font-medium"
          />
        </div>
        <select
          value={selectedModel}
          onChange={(e) => { setSelectedModel(e.target.value); setCurrentPage(1); }}
          className="h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none text-base bg-white min-w-[200px]"
        >
          <option value="">All Models ({parts.length})</option>
          {models.map((m) => (
            <option key={m.modelSlug} value={m.modelSlug}>
              {m.model} ({m.partCount})
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {paginated.length} of {filtered.length} parts
        {search && ` matching "${search}"`}
        {selectedModel && ` in ${models.find(m => m.modelSlug === selectedModel)?.model}`}
      </p>

      {/* Parts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginated.map((part) => (
          <Link
            key={part.slug}
            href={`/spare-parts/sandvik/${part.slug}`}
            className="bg-white rounded-xl border shadow-sm hover:shadow-md hover:border-blue-200 transition group overflow-hidden"
          >
            {part.hasPhoto ? (
              <div className="relative w-full bg-gray-50" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={getPhotoPath(part.modelSlug, part.code, part.photoExt || "jpg")}
                  alt={`${part.codeFormatted} ${part.name}`}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ) : (
              <div className="relative w-full bg-gray-50 flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/bk-drilling-logo.png"
                  alt="BK Drilling"
                  width={120}
                  height={36}
                  className="opacity-30"
                />
              </div>
            )}
            <div className="p-3">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <p className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition">
                    {part.codeFormatted}
                  </p>
                  <p className="text-xs text-gray-600 truncate mt-0.5">{part.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{part.model}</p>
                </div>
                <InquiryButton
                  code={part.code}
                  codeFormatted={part.codeFormatted}
                  name={part.name}
                  model={part.model}
                  slug={part.slug}
                  size="sm"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {paginated.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No parts found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border bg-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border bg-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
