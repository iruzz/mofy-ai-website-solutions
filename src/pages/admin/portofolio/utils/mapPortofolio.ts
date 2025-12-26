export interface PortofolioImage {
  id: number;
  image: string;
  order: number;
}

export interface Portofolio {
  id: number;
  title: string;
  deskripsi: string;
  paket: "umkm" | "profesional" | "premium" | string;
  fitur_website: string[];
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
    deskripsi: raw.deskripsi,
    paket: raw.paket,
    fitur_website: Array.isArray(raw.fitur_website) 
      ? raw.fitur_website 
      : (typeof raw.fitur_website === 'string' ? JSON.parse(raw.fitur_website) : []),
    tanggal: raw.tanggal_projek,
    images: sortedImages,
    cover: sortedImages[0]
      ? `http://localhost:8000/storage/${sortedImages[0].image}`
      : undefined,
  };
}
