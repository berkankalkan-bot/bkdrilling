"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, ChevronDown } from "lucide-react";
import { undergroundParts, surfaceParts, allSandvikParts } from "@/lib/sandvik-parts";

type FilterType = 'all' | 'underground' | 'surface';

function SandvikSparePartsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Set initial filter from URL
  useEffect(() => {
    if (categoryParam === 'surface' || categoryParam === 'underground') {
      setFilter(categoryParam);
    }
  }, [categoryParam]);

  const filteredParts = allSandvikParts.filter(part => {
    const matchesFilter = filter === 'all' || part.category === filter;
    const matchesSearch = searchQuery === '' ||
      part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#E53935] to-[#B71C1C] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">SANDVIK</h1>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl text-white/90">
              Spare Parts Catalogue
            </p>
            <p className="text-sm text-white/70 mt-2">
              {allSandvikParts.length} Parts Available
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by part number or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E53935] transition"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  filter === 'all'
                    ? 'bg-[#E53935] text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                All ({allSandvikParts.length})
              </button>
              <button
                onClick={() => setFilter('underground')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  filter === 'underground'
                    ? 'bg-[#E53935] text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Underground ({undergroundParts.length})
              </button>
              <button
                onClick={() => setFilter('surface')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  filter === 'surface'
                    ? 'bg-[#E53935] text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Surface ({surfaceParts.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Parts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredParts.map((part) => (
            <Link key={part.id} href={`/spare-parts/sandvik/${part.slug}`}>
              <Card className="bg-gray-900 border-gray-800 hover:border-[#E53935] transition-all hover:-translate-y-1 group overflow-hidden h-full">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="aspect-square bg-white">
                    <img
                      src={part.image}
                      alt={part.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-3 bg-gray-900">
                    <p className="text-[#E53935] text-xs font-mono mb-1">{part.partNumber}</p>
                    <h3 className="text-white text-sm font-semibold line-clamp-2 group-hover:text-[#E53935] transition">
                      {part.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredParts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No parts found matching your search.</p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-xs">
            Sandvik and Tamrock are registered trademarks of their respective owners.
            BK Drilling is an independent supplier. Part numbers are for reference only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SandvikSparePartsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <SandvikSparePartsContent />
    </Suspense>
  );
}
