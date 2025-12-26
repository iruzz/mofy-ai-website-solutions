/**
 * Fungsi helper untuk menangani error dari API
 * Digunakan di seluruh aplikasi untuk konsistensi error handling
 */

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export function handleApiError(error: any): ApiError {
  // Jika error dari axios/API response
  if (error.response) {
    return {
      message: error.response.data?.message || `Error: ${error.response.status}`,
      status: error.response.status,
      details: error.response.data,
    };
  }

  // Jika error network
  if (error.message === "Network Error") {
    return {
      message: "Gagal terhubung ke server. Cek koneksi internet Anda.",
    };
  }

  // Error lainnya
  return {
    message: error.message || "Terjadi kesalahan yang tidak diketahui",
  };
}

/**
 * Format error message untuk ditampilkan ke user
 */
export function getErrorMessage(error: any): string {
  const apiError = handleApiError(error);
  return apiError.message;
}

/**
 * Log error untuk debugging
 */
export function logError(context: string, error: any) {
  console.error(`[${context}]`, error);
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Status:", error.response.status);
  }
}
