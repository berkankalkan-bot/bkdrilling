import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllParts, getAllModels } from '@/lib/parts-data';
import { getCizimPath } from '@/lib/parts-types';
import PartsListClient from './PartsListClient';

export const metadata: Metadata = {
  title: 'Sandvik Spare Parts Catalog',
  description: 'Complete Sandvik and Tamrock spare parts catalog. OEM compatible aftermarket parts for underground and surface drilling machines. Search by part number or model.',
  alternates: { canonical: '/spare-parts/sandvik' },
};

export default function SandvikPartsPage() {
  const parts = getAllParts();
  const models = getAllModels();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Sandvik Spare Parts</h1>
          <p className="text-gray-300 text-lg">
            {parts.length.toLocaleString()} parts across {models.length} machine models
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-black transition">Home</Link></li>
            <li>/</li>
            <li className="text-black font-medium">Sandvik Parts</li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <PartsListClient parts={parts} models={models} />
      </div>
    </div>
  );
}
