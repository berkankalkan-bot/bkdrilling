"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Fuse from "fuse.js";
import { allProducts } from "@/lib/data";

export default function InstantSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fuse.js yapılandırması - AŞIRI HIZLI fuzzy search
  const fuse = useRef(
    new Fuse(allProducts, {
      keys: [
        { name: "name", weight: 2 },
        { name: "brand", weight: 1.5 },
        { name: "model", weight: 1.5 },
        { name: "partNumber", weight: 1 },
        { name: "category", weight: 0.5 },
      ],
      threshold: 0.3, // Yaklaşık eşleşme toleransı
      minMatchCharLength: 2,
      includeScore: true,
    })
  );

  // Arama fonksiyonu - HER TUŞTA ÇALIŞIR
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    
    // Fuzzy search - "mtakp" yazsa bile "matkap" bulur
    const searchResults = fuse.current.search(query);
    const formattedResults = searchResults.slice(0, 10).map((result) => result.item);
    
    setResults(formattedResults);
    setIsOpen(true);
    setIsSearching(false);
  }, [query]);

  // Dışarıya tıklandığında kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const highlightMatch = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark class='bg-yellow-200'>$1</mark>");
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl">
      <div className="relative flex items-center gap-3">
        <ArrowRight className="text-black font-bold animate-[moveRight_1s_ease-in-out_infinite]" size={38} strokeWidth={3} />
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={22} />
          <Input
            type="search"
            placeholder="Search Now... (Example: COP 1032, piston, drill)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-12 h-14 text-base font-bold border-4 border-black focus-visible:ring-2 focus-visible:ring-slate-400"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              <X size={22} />
            </button>
          )}
        </div>
        <ArrowLeft className="text-black font-bold animate-[moveLeft_1s_ease-in-out_infinite]" size={38} strokeWidth={3} />
      </div>

      <style jsx global>{`
        @keyframes moveRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(14px); }
        }
        @keyframes moveLeft {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-14px); }
        }
      `}</style>

      {/* Arama Sonuçları - Instant */}
      {isOpen && (
        <Card className="absolute z-50 w-full mt-2 max-h-96 overflow-auto shadow-2xl border-2">
          {isSearching ? (
            <div className="p-8 text-center text-slate-500">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-sm">Aranıyor...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Search className="mx-auto mb-3 text-slate-300" size={40} />
              <p className="font-medium">Sonuç bulunamadı</p>
              <p className="text-sm mt-1">
                &quot;{query}&quot; için ürün bulunamadı
              </p>
            </div>
          ) : (
            <div className="divide-y">
              <div className="px-4 py-2 bg-slate-50 border-b">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">{results.length}</span> sonuç bulundu
                </p>
              </div>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/urun/${product.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block hover:bg-blue-50 transition"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4
                          className="font-semibold text-slate-900 mb-1"
                          dangerouslySetInnerHTML={{ __html: highlightMatch(product.name) }}
                        />
                        <div className="flex flex-wrap gap-2 text-xs text-slate-600 mb-2">
                          <Badge variant="outline" className="font-normal">
                            {product.brand}
                          </Badge>
                          <Badge variant="outline" className="font-normal">
                            {product.model}
                          </Badge>
                          <span className="text-slate-400">• {product.partNumber}</span>
                        </div>
                        <p className="text-xs text-slate-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">
                          ₺{product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="p-3 text-center bg-slate-50">
                <Link
                  href={`/arama?q=${query}`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Tüm Sonuçları Gör ({results.length}+)
                </Link>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Loading indicator - alt kısımda */}
      {isSearching && query.length >= 2 && (
        <div className="absolute -bottom-8 left-0 text-xs text-slate-400 animate-pulse">
          Aranıyor...
        </div>
      )}
    </div>
  );
}
