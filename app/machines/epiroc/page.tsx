import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allProducts } from "@/lib/data";
import { ArrowLeft, Package } from "lucide-react";

export default function EpirocPage() {
  // Epiroc ürünlerini filtrele (şu an data'da yok, örnek göstermek için Atlas Copco gösterelim)
  const epirocProducts = allProducts.filter(p => p.brand === "Atlas Copco" || p.brand === "Epiroc");
  
  // Modelleri grupla
  const models = Array.from(new Set(epirocProducts.map(p => p.model))).sort();
  
  // Her model için ürün sayısını hesapla
  const modelStats = models.map(model => ({
    model,
    count: epirocProducts.filter(p => p.model === model).length,
    products: epirocProducts.filter(p => p.model === model)
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-5xl font-bold mb-4">EPIROC</h1>
          <p className="text-xl text-white/90">
            Professional drilling solutions and spare parts
          </p>
          <div className="flex gap-4 mt-6">
            <Badge variant="secondary" className="text-base py-2 px-4 bg-white text-red-700">
              {epirocProducts.length} Products
            </Badge>
            <Badge variant="secondary" className="text-base py-2 px-4 bg-white text-red-700">
              {models.length} Models
            </Badge>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-black">Available Models</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modelStats.map(({ model, count, products }) => (
            <Card key={model} className="hover:shadow-lg transition-shadow border-2 hover:border-red-500">
              <CardHeader className="bg-gradient-to-br from-slate-50 to-slate-100">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl font-bold">{model}</span>
                  <Badge variant="outline" className="ml-2 border-red-500 text-red-700">
                    {count} parts
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {products.slice(0, 3).map(product => (
                    <div key={product.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                      <Package size={18} className="text-red-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-black truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500 font-mono">
                          {product.partNumber}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-black whitespace-nowrap">
                        ${product.price}
                      </span>
                    </div>
                  ))}
                  
                  {count > 3 && (
                    <p className="text-xs text-slate-500 text-center pt-2">
                      +{count - 3} more parts
                    </p>
                  )}
                </div>

                <Link 
                  href={`/machines/epiroc/${model.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-4 w-full block text-center bg-black hover:bg-slate-800 text-white py-2 px-4 rounded transition font-semibold"
                >
                  View All Parts
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Products List */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-black">All Epiroc Products</h2>
          
          <div className="grid gap-4">
            {epirocProducts.map(product => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-black mb-1">
                        {product.name}
                      </h3>
                      <div className="flex gap-3 text-sm text-slate-600">
                        <span className="font-mono font-semibold text-red-700">
                          {product.partNumber}
                        </span>
                        <span>•</span>
                        <span>{product.model}</span>
                        <span>•</span>
                        <span>{product.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-black">
                        ${product.price}
                      </span>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition">
                        Contact
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Message */}
        <div className="mt-12 bg-slate-100 p-6 rounded-lg">
          <p className="text-slate-700 text-center">
            <strong>Note:</strong> Epiroc parts use 12-digit part numbers. 
            Sandvik parts use 8-digit codes starting with BG prefix.
          </p>
        </div>
      </div>
    </div>
  );
}
