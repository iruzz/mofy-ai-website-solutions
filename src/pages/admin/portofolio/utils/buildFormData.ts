// src/pages/admin/portofolio/utils/buildFormData.ts

type BuildFormDataPayload = { // bnetuk json, check network for debug
  title: string;
  client: string;
  deskripsi: string;
  tanggal_projek: string;
  images: File[];
};

export function buildFormData(payload: BuildFormDataPayload) {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("client", payload.client);
  formData.append("deskripsi", payload.deskripsi);
  formData.append("tanggal_projek", payload.tanggal_projek);

  payload.images.forEach((file) => {
    formData.append("images[]", file);
  });

  return formData;
}
