export interface GalleryDetail {
  slug: string;
  title: string;
  productType: string;
  description: string;
  images: { image: string; label: string }[];
  notes: string[];
}

export const GALLERY_DATA: Record<string, GalleryDetail> = {};

export function getGalleryItemBySlug(slug: string): GalleryDetail | undefined {
  return GALLERY_DATA[slug];
}
