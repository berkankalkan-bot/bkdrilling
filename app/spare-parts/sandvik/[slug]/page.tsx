import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllParts, getPartBySlug, getRelatedParts } from '@/lib/parts-data';
import { getCizimPath, getPhotoPath } from '@/lib/parts-types';
import { generateSEOContent, generateMetaTitle, generateMetaDescription } from '@/lib/seo-templates';
import PartDrawing from './PartDrawing';
import PartActions from './PartActions';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllParts().map((part) => ({ slug: part.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const part = getPartBySlug(slug);
  if (!part) return { title: 'Part Not Found' };

  const title = generateMetaTitle(part);
  const description = generateMetaDescription(part);
  const cizimUrl = part.hasCizim ? getCizimPath(part.modelSlug, part.code) : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: cizimUrl ? [{ url: cizimUrl, width: 1200, height: 800, alt: `${part.codeFormatted} ${part.name} technical drawing` }] : [],
    },
    alternates: { canonical: `/spare-parts/sandvik/${slug}` },
  };
}

export default async function PartDetailPage({ params }: Props) {
  const { slug } = await params;
  const part = getPartBySlug(slug);
  if (!part) notFound();

  const seo = generateSEOContent(part);
  const related = getRelatedParts(part, 6);
  const cizimSrc = part.hasCizim ? getCizimPath(part.modelSlug, part.code) : undefined;
  const photoSrc = part.hasPhoto ? getPhotoPath(part.modelSlug, part.code, part.photoExt || "jpg") : undefined;

  // JSON-LD
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${part.codeFormatted} ${part.name}`,
      description: seo.description,
      sku: part.code,
      mpn: part.codeFormatted,
      brand: { '@type': 'Brand', name: 'Sandvik' },
      ...(cizimSrc && { image: cizimSrc }),
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'USD',
        price: '0',
        seller: { '@type': 'Organization', name: 'BK Drilling' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
        { '@type': 'ListItem', position: 2, name: 'Sandvik Parts', item: '/spare-parts/sandvik' },
        { '@type': 'ListItem', position: 3, name: part.model, item: `/spare-parts/sandvik/model/${part.modelSlug}` },
        { '@type': 'ListItem', position: 4, name: `${part.codeFormatted} ${part.name}` },
      ],
    },
    ...(seo.faq.length > 0 ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: seo.faq.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    }] : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <nav className="bg-white border-b">
          <div className="container mx-auto px-4 py-2.5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
              <li><Link href="/" className="hover:text-black transition">Home</Link></li>
              <li className="text-gray-300">/</li>
              <li><Link href="/spare-parts/sandvik" className="hover:text-black transition">Sandvik Parts</Link></li>
              <li className="text-gray-300">/</li>
              <li><Link href={`/spare-parts/sandvik/model/${part.modelSlug}`} className="hover:text-black transition">{part.model}</Link></li>
              <li className="text-gray-300">/</li>
              <li className="text-black font-medium truncate max-w-[180px]">{part.codeFormatted}</li>
            </ol>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-6">
          {/* ── HERO: Images (left) + Info (right), bottom aligned at Type row ── */}
          <div className="grid lg:grid-cols-[3fr_2fr] gap-6 items-stretch">

            {/* ── LEFT: Photo + CIZIM side by side ── */}
            <div className="grid grid-cols-[3fr_2fr] gap-2 h-full">
              {/* Part Photo - bigger */}
              {photoSrc ? (
                <div className="relative bg-white rounded-xl border shadow-sm overflow-hidden">
                  <div className="relative w-full h-full min-h-[240px]">
                    <Image
                      src={photoSrc}
                      alt={`${part.codeFormatted} ${part.name} - Sandvik Spare Part`}
                      fill
                      className="object-contain p-1.5"
                      sizes="(max-width: 768px) 50vw, 30vw"
                      priority
                    />
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-900/70 rounded">
                    <span className="text-[9px] font-semibold text-white uppercase tracking-wider">Part Photo</span>
                  </div>
                </div>
              ) : (
                <div className="relative bg-white rounded-xl border shadow-sm overflow-hidden">
                  <div className="relative w-full h-full min-h-[240px] flex items-center justify-center bg-gray-50">
                    <Image src="/images/bk-drilling-logo.png" alt="BK Drilling" width={140} height={42} className="opacity-15" />
                    <p className="absolute bottom-3 text-gray-300 text-[10px]">Photo not available</p>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-900/70 rounded">
                    <span className="text-[9px] font-semibold text-white uppercase tracking-wider">Part Photo</span>
                  </div>
                </div>
              )}

              {/* Technical Drawing - smaller, click to zoom */}
              {cizimSrc ? (
                <PartDrawing
                  src={cizimSrc}
                  alt={`${part.codeFormatted} ${part.name} - Technical Drawing`}
                  photoSrc={photoSrc}
                  photoAlt={`${part.codeFormatted} ${part.name} - Sandvik Spare Part`}
                />
              ) : (
                <div className="relative bg-white rounded-xl border shadow-sm overflow-hidden">
                  <div className="relative w-full h-full min-h-[240px] flex items-center justify-center bg-gray-50">
                    <Image src="/images/bk-drilling-logo.png" alt="BK Drilling" width={100} height={30} className="opacity-15" />
                    <p className="absolute bottom-3 text-gray-300 text-[10px]">Drawing N/A</p>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-900/70 rounded">
                    <span className="text-[9px] font-semibold text-white uppercase tracking-wider">Drawing</span>
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT: Header + Info Table (through Type) ── */}
            <div className="flex flex-col justify-between">
              {/* Part Header */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Sandvik / Tamrock</p>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {part.codeFormatted} {part.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {part.model} {part.isDrifter ? 'Rock Drill' : 'Drill Rig'}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Available - Request Quote
                </span>
              </div>

              {/* Compact Info Table */}
              <div className="border rounded-lg overflow-hidden text-sm mt-3">
                <table className="w-full">
                  <tbody className="divide-y">
                    <tr className="bg-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-500 w-36">Part Number</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{part.codeFormatted}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-gray-500">Description</td>
                      <td className="px-3 py-2 text-gray-900">{part.name}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-500">Brand</td>
                      <td className="px-3 py-2 text-gray-900">Sandvik (Tamrock)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-gray-500">Assembly</td>
                      <td className="px-3 py-2 text-gray-900">{part.group}</td>
                    </tr>
                    {part.ref && (
                      <tr className="bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-500">Catalog Ref.</td>
                        <td className="px-3 py-2 text-gray-900">Item #{part.ref}</td>
                      </tr>
                    )}
                    <tr className={part.ref ? '' : 'bg-gray-50'}>
                      <td className="px-3 py-2 font-medium text-gray-500">Type</td>
                      <td className="px-3 py-2 text-gray-900">{part.isDrifter ? 'Rock Drill / Drifter' : 'Drill Rig'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Below hero: Machines + CTA + Search ── */}
          <div className="grid lg:grid-cols-[3fr_2fr] gap-6 mt-4">
            {/* Compatible Machines */}
            {part.compatibleMachines.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Compatible Machines</p>
                <div className="flex flex-wrap gap-1.5">
                  {part.compatibleMachines.map((m, idx) => (
                    <Link
                      key={idx}
                      href={`/spare-parts/sandvik/model/${m.modelSlug}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium text-gray-700 transition"
                    >
                      {m.model}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA + Search */}
            <div className="space-y-3">
              <PartActions
                code={part.code}
                codeFormatted={part.codeFormatted}
                name={part.name}
                model={part.model}
                slug={part.slug}
              />
              <Link
                href="/spare-parts/sandvik"
                className="flex items-center gap-1.5 px-2.5 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg transition group"
              >
                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs text-gray-500 group-hover:text-gray-700 transition">Search Sandvik parts catalog...</span>
              </Link>
            </div>
          </div>

          {/* ── SEO Content ── */}
          <div className="mt-10 bg-white rounded-2xl shadow-sm border p-6 md:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              About Sandvik {part.codeFormatted} {part.name}
            </h2>
            <div className="prose prose-sm prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{seo.description}</p>
              <p className="text-gray-600 leading-relaxed mt-3">
                This is an OEM-compatible aftermarket replacement part for the Sandvik {part.model} ({part.machine.split(' - ')[0]}).
                Also compatible with Tamrock branded equipment of the same model series.
                BK Drilling supplies this part with fast worldwide shipping and competitive pricing.
              </p>
            </div>
          </div>

          {/* ── FAQ ── */}
          {seo.faq.length > 0 && (
            <div className="mt-5 bg-white rounded-2xl shadow-sm border p-6 md:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {seo.faq.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.question}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Related Parts ── */}
          {related.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Related Sandvik Spare Parts</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/spare-parts/sandvik/${rp.slug}`}
                    className="bg-white rounded-xl shadow-sm border p-3 hover:shadow-md hover:border-gray-300 transition group"
                  >
                    {rp.hasPhoto && (
                      <div className="relative w-full h-24 mb-2 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={getPhotoPath(rp.modelSlug, rp.code, rp.photoExt || "jpg")}
                          alt={`${rp.codeFormatted} ${rp.name}`}
                          fill
                          className="object-contain p-1.5"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      </div>
                    )}
                    <p className="font-bold text-xs text-gray-900 group-hover:text-blue-600 transition">{rp.codeFormatted}</p>
                    <p className="text-xs text-gray-500 truncate">{rp.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{rp.model}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
