"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { undergroundParts, surfaceParts, allSandvikParts } from "@/lib/sandvik-parts";

type CategoryFilter = 'all' | 'underground' | 'surface';
type BrandFilter = 'all' | 'sandvik' | 'epiroc';

function AllSparePartsContent() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [brandFilter, setBrandFilter] = useState<BrandFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // For now, all parts are Sandvik (Epiroc coming soon)
  const allParts = allSandvikParts.map(part => ({ ...part, brand: 'sandvik' as const }));

  const filteredParts = allParts.filter(part => {
    const matchesBrand = brandFilter === 'all' || part.brand === brandFilter;
    const matchesCategory = categoryFilter === 'all' || part.category === categoryFilter;
    const matchesSearch = searchQuery === '' ||
      part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesCategory && matchesSearch;
  });

  const sandvikCount = allSandvikParts.length;
  const epirocCount = 0; // Coming soon

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-800 to-black text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">ALL SPARE PARTS</h1>
            <div className="w-24 h-1 bg-[#E53935] mx-auto mb-6"></div>
            <p className="text-xl text-white/90">
              Complete Parts Catalogue
            </p>
            <p className="text-sm text-white/70 mt-2">
              {allParts.length} Parts Available
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Search & Brand Filters Row */}
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

              {/* Brand Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setBrandFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                    brandFilter === 'all'
                      ? 'bg-[#E53935] text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  All Brands ({sandvikCount + epirocCount})
                </button>
                <button
                  onClick={() => setBrandFilter('sandvik')}
                  className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                    brandFilter === 'sandvik'
                      ? 'bg-[#E53935] text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Sandvik ({sandvikCount})
                </button>
                <button
                  disabled
                  className="px-4 py-2 rounded-lg font-semibold text-sm bg-gray-800 text-gray-600 cursor-not-allowed"
                  title="Coming Soon"
                >
                  Epiroc (Soon)
                </button>
              </div>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex gap-2 justify-center md:justify-start">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  categoryFilter === 'all'
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                All ({allParts.length})
              </button>
              <button
                onClick={() => setCategoryFilter('underground')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  categoryFilter === 'underground'
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Underground ({undergroundParts.length})
              </button>
              <button
                onClick={() => setCategoryFilter('surface')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  categoryFilter === 'surface'
                    ? 'bg-white text-black'
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
                  {/* Brand Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-1 bg-[#E53935] text-white text-[10px] font-bold rounded uppercase">
                      {part.brand}
                    </span>
                  </div>
                  {/* Image */}
                  <div className="aspect-square bg-white relative">
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
            Sandvik, Epiroc, Atlas Copco and Tamrock are registered trademarks of their respective owners.
            BK Drilling is an independent supplier. Part numbers are for reference only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AllSparePartsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <AllSparePartsContent />
    </Suspense>
  );
}
