export interface PortofolioImage {
  id: number;
  image: string;
  order: number;
}

export interface Portofolio {
  id: number;
  title: string;
  client: string;
  deskripsi: string;
  tanggal: string;
  images: PortofolioImage[];
  cover?: string; // ✅ derived field
}

export function mapPortofolio(raw: any): Portofolio {
  const images = Array.isArray(raw.images) ? raw.images : [];

  // sort by order ASC
  const sortedImages = [...images].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return {
    id: raw.id,
    title: raw.title,
    client: raw.client,
    deskripsi: raw.deskripsi,
    tanggal: raw.tanggal_projek,
    images: sortedImages,
    cover: sortedImages[0]
      ? `http://localhost:8000/storage/${sortedImages[0].image}`
      : undefined,
  };
}
