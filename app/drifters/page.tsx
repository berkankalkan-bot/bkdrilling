import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allProducts } from "@/lib/data";
import { ArrowLeft, Filter, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Drifters ve Rock Drill Yedek Parçaları",
  description:
    "COP serileri, piston, chuck, silindir ve kaya delici (drifter/rock drill) yedek parçaları. Parça kodu ile hızlı tedarik.",
  alternates: {
    canonical: "/drifters",
  },
};

export default function DriftersPage() {
  // Rock Drills kategorisindeki ürünleri filtrele (Drifters olarak)
  const drifterProducts = allProducts.filter(p => 
    p.category.toLowerCase().includes("rock drill") || 
    p.category.toLowerCase().includes("drifter") ||
    p.name.toLowerCase().includes("cop") ||
    p.name.toLowerCase().includes("piston") ||
    p.name.toLowerCase().includes("chuck") ||
    p.name.toLowerCase().includes("drill")
  );

  // Markalar
  const brands = Array.from(new Set(drifterProducts.map(p => p.brand))).sort();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16 border-b-4 border-slate-700">
        <div className="container mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-5xl font-bold mb-4">DRIFTERS & ROCK DRILLS</h1>
          <p className="text-xl text-slate-300">
            COP series, pistons, chucks, cylinders and drilling components
          </p>
          <div className="flex gap-4 mt-6">
            <Badge variant="secondary" className="text-base py-2 px-4 bg-white text-black">
              {drifterProducts.length} Products
            </Badge>
            <Badge variant="secondary" className="text-base py-2 px-4 bg-white text-black">
              {brands.length} Brands
            </Badge>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-100 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-black font-semibold">
              <Filter size={20} />
              <span>Filter by Brand:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-2 bg-black text-white rounded font-semibold hover:bg-slate-800 transition">
                All
              </button>
              {brands.map(brand => (
                <button 
                  key={brand}
                  className="px-4 py-2 bg-white text-black border-2 border-slate-300 rounded font-semibold hover:border-black transition"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-4">
          {drifterProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow border-2 hover:border-black">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-slate-100 p-3 rounded">
                      <Package size={24} className="text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-black mb-2">
                        {product.name}
                      </h3>
                      <div className="flex gap-4 text-sm">
                        <Badge variant="outline" className="border-black">
                          {product.brand}
                        </Badge>
                        <span className="text-slate-600">{product.model}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-mono text-black font-semibold">
                          {product.partNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-500 mb-1">Price</p>
                      <p className="text-3xl font-bold text-black">
                        ${product.price}
                      </p>
                    </div>
                    <button className="bg-black hover:bg-slate-800 text-white px-6 py-3 rounded font-semibold transition">
                      Contact
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {drifterProducts.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-xl text-slate-500">
              No drifter products found in current inventory.
            </p>
            <p className="text-slate-400 mt-2">
              Please check back later or contact us for specific parts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
