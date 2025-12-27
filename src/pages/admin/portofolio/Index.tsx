// pages/admin/portofolio/Index.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import PortofolioCard from "./components/PortofolioCard";
import { mapPortofolio, Portofolio } from "./utils/mapPortofolio";

export default function PortofolioIndex() {
  const [items, setItems] = useState<Portofolio[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = () => {
    setLoading(true);
    api
      .get("/admin/portofolio")
      .then((res) => {
        const list = res.data?.data ?? [];
        setItems(list.map(mapPortofolio));
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Yakin ingin menghapus portfolio "${title}"?\n\nSemua gambar juga akan dihapus!`)) {
      return;
    }

    try {
      await api.delete(`/admin/portofolio/${id}`);
      
      // Remove from state
      setItems((prev) => prev.filter((item) => item.id !== id));
      
      alert("Portfolio berhasil dihapus!");
    } catch (error: any) {
      console.error("Error deleting portfolio:", error);
      alert(error.response?.data?.message || "Gagal menghapus portfolio");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto" />
          <p className="text-slate-600 text-sm">Memuat portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section - Sticky with blur effect */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Portfolio Manager
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Kelola dan atur semua project portfolio Anda
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/portofolio/create")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Portfolio
            </button>
          </div>

          {/* Stats Bar */}
          {items.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-sm text-slate-700">
                  {items.length} Portfolio
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-slate-700">
                  {items.reduce((acc, item) => acc + (item.images?.length || 0), 0)} Gambar
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {items.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Belum Ada Portfolio
            </h3>
            <p className="text-slate-500 text-center max-w-md mb-6 text-sm">
              Mulai showcase karya terbaik Anda dengan membuat portfolio pertama
            </p>

            <button
              onClick={() => navigate("/admin/portofolio/create")}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Buat Portfolio Pertama
            </button>
          </div>
        ) : (
          // Portfolio Grid
          <div className="space-y-5">
            {/* Section Header */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-slate-800 rounded-full" />
              <h2 className="text-lg font-semibold text-slate-800">
                Semua Portfolio
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <PortofolioCard
                  key={item.id}
                  data={item}
                  onEdit={() => navigate(`/admin/portofolio/${item.id}/edit`)}
                  onImages={() => navigate(`/admin/portofolio/${item.id}/images`)}
                  onDelete={() => handleDelete(item.id, item.title)}
                />
              ))}
            </div>

            {/* Add More Button at Bottom */}
            <div className="flex justify-center pt-6">
              <button
                onClick={() => navigate("/admin/portofolio/create")}
                className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Portfolio Lagi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => navigate("/admin/portofolio/create")}
        className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        aria-label="Tambah Portfolio"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}