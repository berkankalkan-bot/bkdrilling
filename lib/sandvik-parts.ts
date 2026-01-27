// SANDVIK Spare Parts Data - 50 parts total

export interface SandvikPart {
  id: string;
  partNumber: string;
  name: string;
  slug: string;
  image: string;
  category: 'underground' | 'surface';
  brand: 'SANDVIK';
  compatibility: string[];
}

// Underground parts (first 25)
const undergroundFiles = [
  "0111 1377 00 SPLIT PIN.jpg",
  "0113 3238 00 BOLT.jpg",
  "0147 1322 03 SCREW HEX HEAD.jpg",
  "0147 1359 03 SCREW HEX HEAD.jpg",
  "0147 1362 03 SCREW HEX HEAD.jpg",
  "0291 1128 18 LOCK NUT.jpg",
  "0335 1152 00 CIRCLIP.jpg",
  "0335 2130 00 CIRCLIP.jpg",
  "0500 4500 17 PLAIN BEARING.jpg",
  "0500 4500 23 FLANGE BEARING.jpg",
  "0501 0013 00 SPHERICAL BEARING.jpg",
  "0502 1226 01 BALL BEARING.jpg",
  "0509 0221 00 ROLLER BEARING .jpg",
  "0516 1504 01 NEEDLE BEARING.jpg",
  "0544 2162 00 GREASE NIPPLE.jpg",
  "0663 2135 00 O RING.jpg",
  "085 370 18 CAP.jpg",
  "085 548 68 SHAFT.jpg",
  "086 158 78 BUSHING.jpg",
  "090 475 68 WHEEL IDLER.jpg",
  "150 214 28 CHUCK.jpg",
  "150 276 38 BUSHING.jpg",
  "150 520 08 BUSHING.jpg",
  "150 613 08 THRUST.jpg",
  "150 689 38 PLATE.jpg",
];

// Surface parts (next 25)
const surfaceFiles = [
  "3115 2118 00 GUIDE.jpg",
  "3115 2119 00 GUIDE.jpg",
  "3115 2120 00 FLUSHING HEAD.jpg",
  "3115 2124 00 GUIDE.jpg",
  "3115 2129 00 PISTON.jpg",
  "3115 2196 81 TEST VALVE.jpg",
  "3115 2330 00 CUP SEAL.jpg",
  "3115 2340 80 GEAR HOUSING.jpg",
  "3115 2382 00 DAMPING PISTON.jpg",
  "3115 2472 00 DIAPHRAGM.jpg",
  "3115 2615 91 RETURN ACCUMULATOR.jpg",
  "3115 2617 20 PLUG.jpg",
  "3115 2652 00 SIDE BOLT.jpg",
  "3115 2742 00 GUIDE SLEEVE.jpg",
  "3115 2968 01 ROTATION CHUCK BUSHING.jpg",
  "3115 3251 00 GUIDE.jpg",
  "3115 3474 00 LINER.jpg",
  "3115 3511 81 ACCUMULATOR.jpg",
  "3115 3613 00 STUD.jpg",
  "3115 5036 80 COVER COMPLETE.jpg",
  "3115 5042 00 FRONT PART.jpg",
  "3115 5043 00 CONNECT PLATE.jpg",
  "3115 5044 00 FLUSHING HEAD.jpg",
  "3115 5045 01 GUIDE.jpg",
  "3115 5050 01 GUIDE.jpg",
];

function parseFileName(filename: string, category: 'underground' | 'surface'): SandvikPart | null {
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png)$/i, '');
  const match = nameWithoutExt.match(/^([\d\w]+\s[\d\w]+\s[\d\w]+)\s*(.*)$/);

  let partNumber: string;
  let name: string;

  if (match) {
    partNumber = match[1].trim();
    name = match[2].trim() || 'SPARE PART';
  } else {
    partNumber = nameWithoutExt.split(' ').slice(0, 3).join(' ');
    name = nameWithoutExt.split(' ').slice(3).join(' ') || 'SPARE PART';
  }

  name = name.replace(/_\d+$/, '').replace(/_$/, '').trim();
  if (!name) name = 'SPARE PART';

  const slug = partNumber.replace(/\s+/g, '-').toLowerCase();

  return {
    id: slug,
    partNumber: partNumber,
    name: name.toUpperCase(),
    slug: slug,
    image: `/images/spare-parts/sandvik/${category}/${filename}`,
    category: category,
    brand: 'SANDVIK',
    compatibility: ['Sandvik', 'Tamrock'],
  };
}

export const undergroundParts: SandvikPart[] = undergroundFiles
  .map(f => parseFileName(f, 'underground'))
  .filter((p): p is SandvikPart => p !== null);

export const surfaceParts: SandvikPart[] = surfaceFiles
  .map(f => parseFileName(f, 'surface'))
  .filter((p): p is SandvikPart => p !== null);

export const allSandvikParts: SandvikPart[] = [...undergroundParts, ...surfaceParts];

export function getPartBySlug(slug: string): SandvikPart | undefined {
  return allSandvikParts.find(p => p.slug === slug);
}

export function getRelatedParts(part: SandvikPart, limit: number = 6): SandvikPart[] {
  const otherParts = allSandvikParts.filter(p => p.id !== part.id);
  return otherParts.sort(() => Math.random() - 0.5).slice(0, limit);
}
