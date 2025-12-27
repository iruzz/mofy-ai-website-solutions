// src/pages/admin/portofolio/utils/buildFormData.ts

type PortofolioData = {
  title: string;
  deskripsi: string;
  paket: string;
  fitur_website: string[];
  tanggal_projek: string;
  harga_project?: string; // ← Add optional price
  images: File[];
};

export function buildFormData(data: PortofolioData): FormData {
  const fd = new FormData();

  // Basic fields
  fd.append("title", data.title);
  fd.append("deskripsi", data.deskripsi);
  fd.append("paket", data.paket);
  fd.append("tanggal_projek", data.tanggal_projek);

  // Optional price
  if (data.harga_project && data.harga_project.trim() !== '') {
    console.log("Adding harga_project to FormData:", data.harga_project);
    fd.append("harga_project", data.harga_project);
  } else {
    console.log("Harga_project not added (empty or undefined):", data.harga_project);
  }

  // Fitur website as array - backend expects array
  // Send each item separately with bracket notation
  data.fitur_website.forEach((fitur) => {
    fd.append("fitur_website[]", fitur);
  });

  // Images - backend expects 'images[]' for array
  data.images.forEach((file) => {
    fd.append("images[]", file, file.name);
  });

  return fd;
}