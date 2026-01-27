import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, Globe, Shield, Truck, MessageCircle } from "lucide-react";
import { getPartBySlug, getRelatedParts, allSandvikParts, SandvikPart } from "@/lib/sandvik-parts";
import { notFound } from "next/navigation";

// Generate all static paths at build time
export function generateStaticParams() {
  return allSandvikParts.map((part) => ({
    slug: part.slug,
  }));
}

// Generate SEO metadata for each part
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const part = getPartBySlug(slug);

  if (!part) {
    return {
      title: "Part Not Found | BK Drilling",
    };
  }

  const title = `${part.partNumber} ${part.name} | Sandvik Spare Parts | BK Drilling`;
  const description = `Buy ${part.partNumber} ${part.name} for Sandvik/Tamrock ${part.category} drilling machines. High-quality aftermarket spare part. Fast worldwide shipping. Contact us for best prices.`;

  return {
    title,
    description,
    keywords: [
      part.partNumber,
      part.partNumber.replace(/\s+/g, ''),
      part.name,
      'Sandvik spare parts',
      'Tamrock spare parts',
      `Sandvik ${part.name}`,
      `${part.category} drilling parts`,
      'rock drill parts',
      'mining equipment parts',
      'drilling machine spare parts',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      images: [part.image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://bkdrilling.com/spare-parts/sandvik/${part.slug}`,
    },
  };
}

// JSON-LD Structured Data for Google
function ProductJsonLd({ part }: { part: SandvikPart }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${part.partNumber} ${part.name}`,
    "description": `Sandvik/Tamrock ${part.name} spare part for ${part.category} drilling machines. Part number: ${part.partNumber}`,
    "sku": part.partNumber.replace(/\s+/g, ''),
    "mpn": part.partNumber,
    "brand": {
      "@type": "Brand",
      "name": "Sandvik"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "BK Drilling"
    },
    "image": `https://bkdrilling.com${part.image}`,
    "category": `${part.category} Drilling Spare Parts`,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "priceValidUntil": "2026-12-31",
      "seller": {
        "@type": "Organization",
        "name": "BK Drilling"
      },
      "itemCondition": "https://schema.org/NewCondition"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Compatible Brand",
        "value": "Sandvik, Tamrock"
      },
      {
        "@type": "PropertyValue",
        "name": "Category",
        "value": part.category
      },
      {
        "@type": "PropertyValue",
        "name": "Origin",
        "value": "Turkey"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Breadcrumb JSON-LD
function BreadcrumbJsonLd({ part }: { part: SandvikPart }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://bkdrilling.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Spare Parts",
        "item": "https://bkdrilling.com/spare-parts"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Sandvik",
        "item": "https://bkdrilling.com/spare-parts/sandvik"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${part.partNumber} ${part.name}`,
        "item": `https://bkdrilling.com/spare-parts/sandvik/${part.slug}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function PartDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const part = getPartBySlug(slug);

  if (!part) {
    notFound();
  }

  const relatedParts = getRelatedParts(part, 6);

  // Get prev/next parts
  const currentIndex = allSandvikParts.findIndex(p => p.slug === slug);
  const prevPart = currentIndex > 0 ? allSandvikParts[currentIndex - 1] : null;
  const nextPart = currentIndex < allSandvikParts.length - 1 ? allSandvikParts[currentIndex + 1] : null;

  return (
    <>
      {/* SEO Structured Data */}
      <ProductJsonLd part={part} />
      <BreadcrumbJsonLd part={part} />

      <div className="min-h-screen bg-black">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" className="text-gray-500 hover:text-white transition" itemProp="item">
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <span className="text-gray-700">/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/spare-parts" className="text-gray-500 hover:text-white transition" itemProp="item">
                  <span itemProp="name">Spare Parts</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <span className="text-gray-700">/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/spare-parts/sandvik" className="text-gray-500 hover:text-white transition" itemProp="item">
                  <span itemProp="name">Sandvik</span>
                </Link>
                <meta itemProp="position" content="3" />
              </li>
              <span className="text-gray-700">/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-[#E53935]" itemProp="name">{part.partNumber}</span>
                <meta itemProp="position" content="4" />
              </li>
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <article className="container mx-auto px-4 py-12" itemScope itemType="https://schema.org/Product">
          <meta itemProp="sku" content={part.partNumber.replace(/\s+/g, '')} />
          <meta itemProp="mpn" content={part.partNumber} />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Image */}
            <div>
              <div className="bg-white rounded-2xl p-8">
                <img
                  src={part.image}
                  alt={`${part.partNumber} ${part.name} - Sandvik Spare Part`}
                  className="w-full h-auto max-h-[500px] object-contain"
                  itemProp="image"
                />
              </div>

              {/* Prev/Next Navigation */}
              <div className="flex justify-between mt-6">
                {prevPart ? (
                  <Link
                    href={`/spare-parts/sandvik/${prevPart.slug}`}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition group"
                    title={`Previous: ${prevPart.partNumber} ${prevPart.name}`}
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">{prevPart.partNumber}</span>
                  </Link>
                ) : <div />}
                {nextPart ? (
                  <Link
                    href={`/spare-parts/sandvik/${nextPart.slug}`}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition group"
                    title={`Next: ${nextPart.partNumber} ${nextPart.name}`}
                  >
                    <span className="text-sm">{nextPart.partNumber}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : <div />}
              </div>
            </div>

            {/* Right: Details */}
            <div>
              {/* Part Number */}
              <div className="inline-block bg-[#E53935] text-white px-4 py-2 rounded-lg font-mono text-lg mb-4">
                {part.partNumber}
              </div>

              {/* Part Name */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" itemProp="name">
                {part.name}
              </h1>

              {/* Brand Badge */}
              <div className="flex items-center gap-3 mb-8" itemProp="brand" itemScope itemType="https://schema.org/Brand">
                <span className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold" itemProp="name">
                  SANDVIK
                </span>
                <span className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg text-sm">
                  Compatible with Tamrock
                </span>
              </div>

              {/* Description for SEO */}
              <p className="text-gray-400 mb-8" itemProp="description">
                High-quality aftermarket {part.name.toLowerCase()} spare part for Sandvik and Tamrock {part.category} drilling machines.
                Part number {part.partNumber}. Manufactured to OEM specifications for reliable performance and durability.
              </p>

              {/* Specs Table */}
              <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
                <h2 className="text-white font-semibold mb-4 text-lg">Specifications</h2>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <dt className="text-gray-500">Part Number</dt>
                    <dd className="text-white font-mono">{part.partNumber}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <dt className="text-gray-500">Part Name</dt>
                    <dd className="text-white">{part.name}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <dt className="text-gray-500">Brand Compatibility</dt>
                    <dd className="text-white">Sandvik / Tamrock</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <dt className="text-gray-500">Application</dt>
                    <dd className="text-white capitalize">{part.category} Drilling</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <dt className="text-gray-500">Product Type</dt>
                    <dd className="text-[#E53935]">Aftermarket (OEM Quality)</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Country of Origin</dt>
                    <dd className="text-white">Turkey</dd>
                  </div>
                </dl>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Quality Guaranteed</p>
                    <p className="text-gray-500 text-xs">OEM Specifications</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Fast Shipping</p>
                    <p className="text-gray-500 text-xs">Worldwide Delivery</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Global Export</p>
                    <p className="text-gray-500 text-xs">Ship to Any Country</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center gap-3" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="availability" content="https://schema.org/InStock" />
                  <meta itemProp="priceCurrency" content="USD" />
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm" itemProp="availability">In Stock</p>
                    <p className="text-gray-500 text-xs">Ready to Ship</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={`https://wa.me/905396359822?text=Hi, I'm interested in part ${part.partNumber} - ${part.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-6 h-6" />
                Request Quote via WhatsApp
              </a>
            </div>
          </div>

          {/* Related Parts */}
          {relatedParts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold text-white mb-8">Related Sandvik Parts</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {relatedParts.map((relatedPart) => (
                  <Link key={relatedPart.id} href={`/spare-parts/sandvik/${relatedPart.slug}`}>
                    <Card className="bg-gray-900 border-gray-800 hover:border-[#E53935] transition-all hover:-translate-y-1 group overflow-hidden">
                      <CardContent className="p-0">
                        <div className="aspect-square relative bg-white">
                          <img
                            src={relatedPart.image}
                            alt={`${relatedPart.partNumber} ${relatedPart.name}`}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-[#E53935] text-xs font-mono mb-1">{relatedPart.partNumber}</p>
                          <h3 className="text-white text-xs font-semibold line-clamp-2 group-hover:text-[#E53935] transition">
                            {relatedPart.name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Disclaimer */}
        <footer className="border-t border-gray-800 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 text-xs">
              Sandvik and Tamrock are registered trademarks of their respective owners.
              BK Drilling is an independent supplier. Part numbers are for reference and compatibility purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
