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
    api
      .get("/admin/portofolio")
      .then((res) => {
        const list = res.data?.data ?? [];
        setItems(list.map(mapPortofolio));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-muted-foreground">Loading portofolio...</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portofolio</h1>

        <button
          onClick={() => navigate("/admin/portofolio/create")}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          + Tambah Portofolio
        </button>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <p className="text-muted-foreground">Belum ada portofolio</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <PortofolioCard
              key={item.id}
              data={item}
              onEdit={() => navigate(`/admin/portofolio/${item.id}/edit`)}
              onImages={() => navigate(`/admin/portofolio/${item.id}/images`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
