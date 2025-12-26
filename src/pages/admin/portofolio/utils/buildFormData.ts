// src/pages/admin/portofolio/utils/buildFormData.ts

type BuildFormDataPayload = {
  title: string;
  deskripsi: string;
  paket: "umkm" | "profesional" | "premium" | string;
  fitur_website: string[];
  tanggal_projek: string;
  images: File[];
};

export function buildFormData(payload: BuildFormDataPayload) {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("deskripsi", payload.deskripsi);
  formData.append("paket", payload.paket);
  
  // Append fitur as JSON string to ensure backend receives the complete array
  formData.append("fitur_website", JSON.stringify(payload.fitur_website));
  
  // Format tanggal ke yyyy-MM-dd (backend expects this format)
  const dateFormatted = payload.tanggal_projek?.split('T')[0] || payload.tanggal_projek;
  formData.append("tanggal_projek", dateFormatted);

  payload.images.forEach((file) => {
    formData.append("images[]", file);
  });

  return formData;
}
