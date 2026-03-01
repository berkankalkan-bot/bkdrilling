import { type Part } from './parts-types';

// Demo data - 10 parts with real photos + CIZIM PNGs (2 drifter + 8 non-drifter)
const demoParts: Part[] = [
  // ── DRIFTER PARTS ──
  {
    code: "15421618",
    codeFormatted: "154 216 18",
    slug: "154-216-18-rotation-shaft",
    name: "ROTATION SHAFT",
    brand: "Sandvik",
    model: "AXERA D07 RP-112",
    modelSlug: "hlx5",
    machine: "104D6050",
    group: "HYDRAULIC ROCK DRILL",
    ref: "13",
    isDrifter: true,
    drifterModel: "HLX5",
    compatibleMachines: [{ model: "AXERA D07 RP-112", modelSlug: "hlx5", machine: "104D6050" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "jpg",
  },
  {
    code: "55050593",
    codeFormatted: "550 505 93",
    slug: "550-505-93-rotation-bushing",
    name: "ROTATION BUSHING",
    brand: "Sandvik",
    model: "AXERA T11 DATA-315 C",
    modelSlug: "hfx5t",
    machine: "105D7414",
    group: "HYDRAULIC ROCK DRILL",
    ref: "10",
    isDrifter: true,
    drifterModel: "HFX5T",
    compatibleMachines: [{ model: "AXERA T11 DATA-315 C", modelSlug: "hfx5t", machine: "105D7414" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "png",
  },
  // ── NON-DRIFTER PARTS ──
  {
    code: "04110188",
    codeFormatted: "041 101 88",
    slug: "041-101-88-guide-strip",
    name: "GUIDE STRIP",
    brand: "Sandvik",
    model: "DS410",
    modelSlug: "ds410",
    machine: "108B15790",
    group: "BOLTING BOOM HEAD",
    ref: "29",
    isDrifter: false,
    compatibleMachines: [{ model: "DS410", modelSlug: "ds410", machine: "108B15790" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "png",
  },
  {
    code: "13603088",
    codeFormatted: "136 030 88",
    slug: "136-030-88-poppet",
    name: "POPPET",
    brand: "Sandvik",
    model: "CHA560",
    modelSlug: "cha560",
    machine: "103T5940",
    group: "HOSE REEL",
    ref: "2",
    isDrifter: false,
    compatibleMachines: [{ model: "CHA560", modelSlug: "cha560", machine: "103T5940" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "jpg",
  },
  {
    code: "15262598",
    codeFormatted: "152 625 98",
    slug: "152-625-98-shank-bushing",
    name: "SHANK BUSHING",
    brand: "Sandvik",
    model: "DP1100",
    modelSlug: "dp1100",
    machine: "108T12874",
    group: "FLUSHING DEVICE ASSY",
    ref: "4",
    isDrifter: false,
    compatibleMachines: [{ model: "DP1100", modelSlug: "dp1100", machine: "108T12874" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "png",
  },
  {
    code: "23210338",
    codeFormatted: "232 103 38",
    slug: "232-103-38-bearing-bushing",
    name: "BEARING BUSHING",
    brand: "Sandvik",
    model: "AXERA T12 DATA-315 C",
    modelSlug: "axera-t12-data-315-c",
    machine: "105D8492",
    group: "BOOM SUPPORT",
    ref: "8",
    isDrifter: false,
    compatibleMachines: [{ model: "AXERA T12 DATA-315 C", modelSlug: "axera-t12-data-315-c", machine: "105D8492" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "png",
  },
  {
    code: "32300428",
    codeFormatted: "323 004 28",
    slug: "323-004-28-piston-rod-d50",
    name: "PISTON ROD D50",
    brand: "Sandvik",
    model: "AXERA 7-240",
    modelSlug: "axera-7-240",
    machine: "105D7476",
    group: "HYDRAULIC CYLINDER",
    ref: "2",
    isDrifter: false,
    compatibleMachines: [{ model: "AXERA 7-240", modelSlug: "axera-7-240", machine: "105D7476" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "png",
  },
  {
    code: "32305628",
    codeFormatted: "323 056 28",
    slug: "323-056-28-shaft",
    name: "SHAFT",
    brand: "Sandvik",
    model: "AXERA 8-290",
    modelSlug: "axera-8-290",
    machine: "107D11833",
    group: "BOOM HEAD, RIGHT",
    ref: "4",
    isDrifter: false,
    compatibleMachines: [{ model: "AXERA 8-290", modelSlug: "axera-8-290", machine: "107D11833" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "png",
  },
  {
    code: "55003641",
    codeFormatted: "550 036 41",
    slug: "550-036-41-laser-equipment",
    name: "LASER EQUIPMENT",
    brand: "Sandvik",
    model: "AXERA T08 S-290C",
    modelSlug: "axera-t08-s-290c",
    machine: "103D6176",
    group: "ASSEMBLY",
    ref: "1",
    isDrifter: false,
    compatibleMachines: [{ model: "AXERA T08 S-290C", modelSlug: "axera-t08-s-290c", machine: "103D6176" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "png",
  },
  {
    code: "55018354",
    codeFormatted: "550 183 54",
    slug: "550-183-54-hose-support",
    name: "HOSE SUPPORT",
    brand: "Sandvik",
    model: "DX500",
    modelSlug: "dx500",
    machine: "212T23161",
    group: "FEED ASSEMBLY",
    ref: "47",
    isDrifter: false,
    compatibleMachines: [{ model: "DX500", modelSlug: "dx500", machine: "212T23161" }],
    hasCizim: true,
    hasPhoto: true,
    photoExt: "png",
  },
];

let allParts: Part[] = demoParts;

export function getAllParts(): Part[] {
  return allParts;
}

export function getPartBySlug(slug: string): Part | undefined {
  return allParts.find(p => p.slug === slug);
}

export function getPartsByModel(modelSlug: string): Part[] {
  return allParts.filter(p =>
    p.modelSlug === modelSlug ||
    p.compatibleMachines.some(m => m.modelSlug === modelSlug)
  );
}

export function getRelatedParts(part: Part, limit: number = 6): Part[] {
  const sameGroup = allParts.filter(p => p.slug !== part.slug && p.group === part.group);
  const sameModel = allParts.filter(p => p.slug !== part.slug && p.modelSlug === part.modelSlug && p.group !== part.group);
  const others = allParts.filter(p => p.slug !== part.slug && p.modelSlug !== part.modelSlug);
  return [...sameGroup, ...sameModel, ...others].slice(0, limit);
}

export function getAllModels(): { model: string; modelSlug: string; partCount: number }[] {
  const modelMap = new Map<string, { model: string; modelSlug: string; count: number }>();
  for (const part of allParts) {
    const existing = modelMap.get(part.modelSlug);
    if (existing) {
      existing.count++;
    } else {
      modelMap.set(part.modelSlug, { model: part.model, modelSlug: part.modelSlug, count: 1 });
    }
  }
  return Array.from(modelMap.values())
    .map(m => ({ model: m.model, modelSlug: m.modelSlug, partCount: m.count }))
    .sort((a, b) => b.partCount - a.partCount);
}

export function searchParts(query: string): Part[] {
  const q = query.toLowerCase().replace(/\s+/g, '');
  return allParts.filter(p => {
    const code = p.code.toLowerCase();
    const formatted = p.codeFormatted.toLowerCase().replace(/\s+/g, '');
    const name = p.name.toLowerCase();
    const model = p.model.toLowerCase();
    return code.includes(q) || formatted.includes(q) || name.includes(q) || model.includes(q);
  });
}
