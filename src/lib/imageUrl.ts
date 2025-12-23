// src/utils/imageUrl.ts
const BASE_URL = "http://127.0.0.1:8000";

export function imageUrl(path?: string) {
  if (!path) return "";

  // 🔒 kalau sudah full URL, jangan diproses lagi
  if (path.startsWith("http")) {
    return path;
  }

  return `${BASE_URL}/storage/${path}`;
}
