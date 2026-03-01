import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllModels, getPartsByModel } from '@/lib/parts-data';
import { getPhotoPath } from '@/lib/parts-types';

type Props = {
  params: Promise<{ model: string }>;
};

export async function generateStaticParams() {
  const models = getAllModels();
  return models.map((m) => ({ model: m.modelSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { model } = await params;
  const models = getAllModels();
  const modelInfo = models.find(m => m.modelSlug === model);
  if (!modelInfo) return { title: 'Model Not Found' };

  return {
    title: `Sandvik ${modelInfo.model} Spare Parts`,
    description: `Complete spare parts catalog for Sandvik ${modelInfo.model}. ${modelInfo.partCount} OEM compatible aftermarket parts available. Fast worldwide shipping from BK Drilling.`,
    alternates: { canonical: `/spare-parts/sandvik/model/${model}` },
  };
}

export default async function ModelPage({ params }: Props) {
  const { model } = await params;
  const models = getAllModels();
  const modelInfo = models.find(m => m.modelSlug === model);
  if (!modelInfo) notFound();

  const parts = getPartsByModel(model);

  // Group parts by assembly group
  const groups = new Map<string, typeof parts>();
  for (const part of parts) {
    const group = part.group || 'Other';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(part);
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Spare Parts', item: '/spare-parts/sandvik' },
      { '@type': 'ListItem', position: 3, name: modelInfo.model },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-black text-white py-10">
          <div className="container mx-auto px-4">
            <p className="text-sm text-gray-400 mb-1">Sandvik / Tamrock</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {modelInfo.model} Spare Parts
            </h1>
            <p className="text-gray-300">
              {parts.length} parts available across {groups.size} assembly groups
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-black transition">Home</Link></li>
              <li>/</li>
              <li><Link href="/spare-parts/sandvik" className="hover:text-black transition">Sandvik Parts</Link></li>
              <li>/</li>
              <li className="text-black font-medium">{modelInfo.model}</li>
            </ol>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          {/* Parts by group */}
          {Array.from(groups.entries()).map(([groupName, groupParts]) => (
            <div key={groupName} className="mb-10">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-black rounded-full"></span>
                {groupName}
                <span className="text-sm font-normal text-gray-400">({groupParts.length} parts)</span>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {groupParts.map((part) => (
                  <Link
                    key={part.slug}
                    href={`/spare-parts/sandvik/${part.slug}`}
                    className="bg-white rounded-xl border shadow-sm hover:shadow-md hover:border-blue-200 transition group overflow-hidden"
                  >
                    {part.hasPhoto ? (
                      <div className="relative w-full bg-gray-50" style={{ aspectRatio: '4/3' }}>
                        <Image
                          src={getPhotoPath(part.modelSlug, part.code, part.photoExt || "jpg")}
                          alt={`${part.codeFormatted} ${part.name}`}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full bg-gray-50 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                        <Image src="/images/bk-drilling-logo.png" alt="BK Drilling" width={100} height={30} className="opacity-30" />
                      </div>
                    )}
                    <div className="p-3">
                      <p className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition">{part.codeFormatted}</p>
                      <p className="text-xs text-gray-600 truncate mt-0.5">{part.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
