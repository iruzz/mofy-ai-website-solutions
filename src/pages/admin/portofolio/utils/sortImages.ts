// src/pages/admin/portofolio/utils/sortImages.ts

export function sortImages<T extends { order: number }>(images: T[]) {
  return [...images].sort((a, b) => a.order - b.order);
}
