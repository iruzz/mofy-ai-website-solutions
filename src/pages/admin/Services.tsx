import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Save, 
  X, 
  Trash2, 
  Edit3, 
  Loader2,
  Box,
  Home,
  Settings,
  Server,
  Code,
  Layers,
  Zap,
  Cpu,
  Shield,
  MousePointer,
  Palette,
  Briefcase,
  ArrowRight,
  FileText
} from "lucide-react";
import api from "@/lib/api";

// --- ICON MAPPING HELPER ---
const iconMap: { [key: string]: any } = {
  Home, Settings, Server, Code, Layers, Zap, Cpu, Shield, MousePointer, Palette, Briefcase
};

const getIcon = (iconName: string) => {
  const Component = iconMap[iconName] || Box;
  return <Component size={28} />;
};

export default function Services() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", deskripsi: "", icon: "Box" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // State untuk Panel Detail
  const [selectedService, setSelectedService] = useState<any>(null);

  const load = () => {
    setLoading(true);
    api.get("/admin/layanan")
      .then((res) => {
        setList(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.deskripsi) return;

    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/admin/layanan/${editingId}`, form);
      } else {
        await api.post("/admin/layanan", form);
      }
      
      setForm({ title: "", deskripsi: "", icon: "Box" });
      setEditingId(null);
      load();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const edit = (item: any) => {
    setForm(item);
    setEditingId(item.id);
    // Close detail panel if editing from inside panel or outside
    setSelectedService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const del = async (id: number) => {
    if (!confirm("Hapus layanan ini?")) return;
    try {
      await api.delete(`/admin/layanan/${id}`);
      if (selectedService?.id === id) setSelectedService(null); // Close panel if deleting current
      load();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  const resetForm = () => {
    setForm({ title: "", deskripsi: "", icon: "Box" });
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 relative">
      
      {/* DETAIL PANEL (Side Drawer) */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            
            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Panel Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    {getIcon(selectedService.icon)}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedService.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Deskripsi Lengkap</label>
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedService.deskripsi}
                </div>

                {/* Actions inside Panel */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Aksi</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => edit(selectedService)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 size={16} /> Edit Layanan
                    </button>
                    <button
                      onClick={() => del(selectedService.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Server className="text-blue-600" />
          Manajemen Layanan
        </h1>
        <p className="text-slate-500 mt-1">
          Kelola layanan yang Anda tawarkan. Klik tombol untuk melihat detail deskripsi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-4 lg:sticky lg:top-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Layanan" : "Tambah Layanan"}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-xs font-medium text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <X size={14} /> Batal
                </button>
              )}
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Layanan</label>
                <input
                  placeholder="Contoh: Web Development"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Icon (Lucide Name)</label>
                <div className="relative">
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full pl-4 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="Box">Box (Default)</option>
                    <option value="Home">Home</option>
                    <option value="Server">Server</option>
                    <option value="Code">Code</option>
                    <option value="Layers">Layers</option>
                    <option value="Zap">Zap</option>
                    <option value="Cpu">Cpu</option>
                    <option value="Shield">Shield</option>
                    <option value="MousePointer">MousePointer</option>
                    <option value="Palette">Palette</option>
                    <option value="Briefcase">Briefcase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi</label>
                <textarea
                  rows={4}
                  placeholder="Jelaskan detail layanan..."
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  required
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    {editingId ? <Edit3 size={18} /> : <Plus size={18} />}
                    {editingId ? "Update Layanan" : "Tambah Layanan"}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: LIST */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-40 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <Box size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Belum ada layanan yang ditambahkan.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {list.map((item, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    key={item.id}
                    className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-200 transition-all relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-sm ${editingId === item.id ? 'bg-blue-500' : 'bg-slate-800'}`}>
                        {getIcon(item.icon)}
                      </div>
                      
                      <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => edit(item)}
                          className="p-2 bg-slate-50 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => del(item.id)}
                          className="p-2 bg-slate-50 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    
                    {/* DESCRIPTION: CLIPPED */}
                    <p className="text-slate-500 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {item.deskripsi}
                    </p>

                    {/* SEE MORE BUTTON */}
                    <button 
                      onClick={() => setSelectedService(item)}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors group/btn"
                    >
                      Lihat selengkapnya <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

// kalo mau add icon. ko bisa add dulu icon lucide di baris 3, lalu masukin ke mapping variable "iconmap" di baris 28. lalu ko ke baris 160 bagian SELECT nya, dan masukin option nya