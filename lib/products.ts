import type { Dictionary } from '@/lib/i18n/dictionaries/en';

/*
 * Product structure and verification status live here; every human-readable
 * string lives in the dictionaries (productsData), so each language can be
 * reviewed without touching this file.
 */

export type StatusKey = 'verified' | 'onRequest' | 'pending' | 'unpublished';

export const statusOrder: StatusKey[] = ['verified', 'onRequest', 'pending', 'unpublished'];

export type CategoryKey = 'essentialOils' | 'botanicals';

export type VerifiedProductDetails = Partial<{
  regionalOrigin: string;
  format: string;
  grade: string;
  keyQualityParameters: string;
  packaging: string;
  minimumOrderQuantity: string;
  indicativeCapacity: string;
  leadTime: string;
  incoterms: string;
  portOfLoading: string;
  storageRequirements: string;
  shelfLife: string;
  certifications: string;
  sampleAvailability: string;
  lastUpdated: string;
}>;

type ProductRecord = {
  slug: keyof Dictionary['productsData'];
  /** English name — also the value the inquiry form submits. */
  name: string;
  category: CategoryKey;
  image: string;
  imageWidth: number;
  imageHeight: number;
  informationStatus: StatusKey[];
  documentationStatus: StatusKey[];
  verifiedDetails?: VerifiedProductDetails;
};

export const productRecords: ProductRecord[] = [
  {
    slug: 'indonesian-patchouli-oil',
    name: 'Indonesian Patchouli Oil',
    category: 'essentialOils',
    image: '/images/patchouli.jpg',
    imageWidth: 1600,
    imageHeight: 1067,
    informationStatus: ['pending', 'onRequest', 'onRequest'],
    documentationStatus: ['pending'],
  },
  {
    slug: 'indonesian-kratom',
    name: 'Indonesian Kratom',
    category: 'botanicals',
    image: '/images/kratom.jpg',
    imageWidth: 1536,
    imageHeight: 1024,
    informationStatus: ['pending', 'onRequest', 'onRequest'],
    documentationStatus: ['pending'],
  },
];

export type ProductInformation = { label: string; note: string; status: StatusKey };

export type Product = ProductRecord & {
  displayName: string;
  shortName: string;
  categoryLabel: string;
  origin: string;
  description: string;
  imageAlt: string;
  imageCredit: string;
  verificationSummary: string;
  information: ProductInformation[];
  documentation: ProductInformation[];
};

function localize(record: ProductRecord, dict: Dictionary): Product {
  const copy = dict.productsData[record.slug];
  return {
    ...record,
    displayName: copy.name,
    shortName: copy.shortName,
    categoryLabel: dict.categories[record.category],
    origin: copy.origin,
    description: copy.description,
    imageAlt: copy.imageAlt,
    imageCredit: copy.imageCredit,
    verificationSummary: copy.verificationSummary,
    information: copy.information.map((item, index) => ({
      ...item,
      status: record.informationStatus[index] ?? 'unpublished',
    })),
    documentation: copy.documentation.map((item, index) => ({
      ...item,
      status: record.documentationStatus[index] ?? 'unpublished',
    })),
  };
}

export function getProducts(dict: Dictionary): Product[] {
  return productRecords.map((record) => localize(record, dict));
}

export function getProduct(slug: string, dict: Dictionary): Product | undefined {
  const record = productRecords.find((product) => product.slug === slug);
  return record ? localize(record, dict) : undefined;
}

export const productSlugs = productRecords.map((product) => product.slug);
