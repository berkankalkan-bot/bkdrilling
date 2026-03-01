export interface CompatibleMachine {
  model: string;
  modelSlug: string;
  machine: string;
}

export interface Part {
  code: string;           // "04691390"
  codeFormatted: string;  // "046 913 90"
  slug: string;           // "046-913-90-bushing"
  name: string;           // "BUSHING"
  brand: "Sandvik";
  model: string;          // "AXERA 8-290" (primary)
  modelSlug: string;      // "axera-8-290"
  machine: string;        // "107D11833 - Yurtdisi Katalog"
  group: string;          // "CONVERTER HOUSING ASSEMBLY"
  ref: string;            // "5"
  isDrifter: boolean;
  drifterModel?: string;
  compatibleMachines: CompatibleMachine[];
  hasCizim: boolean;
  hasPhoto: boolean;
  photoExt?: "jpg" | "png";
}

export interface InquiryItem {
  code: string;
  codeFormatted: string;
  name: string;
  model: string;
  slug: string;
  quantity: number;
  note: string;
  addedAt: number;
}

export function formatPartCode(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 8) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 10)}`;
  }
  return raw;
}

export function createSlug(codeFormatted: string, name: string): string {
  const codePart = codeFormatted.replace(/\s+/g, '-');
  const namePart = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return `${codePart}-${namePart}`.toLowerCase();
}

export function createModelSlug(model: string): string {
  return model
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getPartType(name: string): string {
  const n = name.toUpperCase();
  if (n.includes('BUSHING')) return 'bushing';
  if (n.includes('BEARING')) return 'bearing';
  if (n.includes('SEAL') || n.includes('SEALING')) return 'seal';
  if (n.includes('O-RING') || n.includes('O RING')) return 'oring';
  if (n.includes('PISTON')) return 'piston';
  if (n.includes('SHAFT')) return 'shaft';
  if (n.includes('SCREW') || n.includes('BOLT')) return 'fastener';
  if (n.includes('CYLINDER')) return 'cylinder';
  if (n.includes('PLATE')) return 'plate';
  if (n.includes('MOTOR')) return 'motor';
  if (n.includes('VALVE')) return 'valve';
  if (n.includes('PUMP')) return 'pump';
  if (n.includes('FILTER')) return 'filter';
  if (n.includes('HOSE')) return 'hose';
  if (n.includes('SPRING')) return 'spring';
  if (n.includes('GASKET')) return 'gasket';
  if (n.includes('PIN')) return 'pin';
  if (n.includes('NUT')) return 'fastener';
  if (n.includes('WASHER')) return 'fastener';
  if (n.includes('GEAR')) return 'gear';
  if (n.includes('CHUCK')) return 'chuck';
  return 'component';
}

export function getCizimPath(modelSlug: string, code: string): string {
  return `/images/catalog/${modelSlug}/${code}-cizim.png`;
}

export function getListePath(modelSlug: string, code: string): string {
  return `/images/catalog/${modelSlug}/${code}-liste.png`;
}

export function getPhotoPath(modelSlug: string, code: string, ext: "jpg" | "png" = "jpg"): string {
  return `/images/catalog/${modelSlug}/${code}-photo.${ext}`;
}
