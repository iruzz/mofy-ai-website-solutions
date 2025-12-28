import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Save, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Building2 
} from "lucide-react";
import api from "@/lib/api";

export default function Settings() {
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Notification State
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/profile");
      // Assuming your API returns an array as per your original code: res.data.data[0]
      setForm(res.data.data[0]);
    } catch (err) {
      console.error("Failed to load settings", err);
      setNotification({ type: 'error', message: "Gagal memuat pengaturan." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form || !form.id) return;
    
    setSaving(true);
    setNotification(null);

    try {
      await api.put(`/admin/profile/${form.id}`, form);
      setNotification({ type: 'success', message: "Settings berhasil disimpan!" });
      
      // Auto hide success message
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error(err);
      setNotification({ type: 'error', message: "Gagal menyimpan settings." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        {/* Skeleton Loader */}
        <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse"></div>
        <div className="h-40 w-full bg-white rounded-xl border border-slate-100 animate-pulse"></div>
        <div className="h-40 w-full bg-white rounded-xl border border-slate-100 animate-pulse"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 md:p-8 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="text-blue-600" />
            Company Settings
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your company's profile and social media presence.
          </p>
        </div>

        {/* Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border ${
                notification.type === 'success' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span className="text-sm font-medium">{notification.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
        
        {/* General Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">General Information</h2>
          </div>
          <div className="p-6 grid gap-6 md:grid-cols-2">
            
            {/* Site Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Site Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Globe size={18} />
                </div>
                <input
                  name="site_title"
                  value={form.site_title || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="MOFY AI Solutions"
                />
              </div>
            </div>

            {/* Contact Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Contact Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  name="email_contact"
                  type="email"
                  value={form.email_contact || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="hello@company.com"
                />
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Company Address</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none text-slate-400">
                  <MapPin size={18} />
                </div>
                <textarea
                  name="address"
                  rows={3}
                  value={form.address || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                  placeholder="123 Business Street, Jakarta, Indonesia"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">Social Media</h2>
          </div>
          <div className="p-6 grid gap-6 md:grid-cols-3">
            
            {/* Instagram */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Instagram</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Instagram size={18} />
                </div>
                <input
                  name="instagram"
                  value={form.instagram || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="@mofy.ai"
                />
              </div>
            </div>

            {/* LinkedIn (Assuming 'li' stands for LinkedIn) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">LinkedIn</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Linkedin size={18} />
                </div>
                <input
                  name="li"
                  value={form.li || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="linkedin.com/company/mofy"
                />
              </div>
            </div>

            {/* Facebook */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Facebook</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Facebook size={18} />
                </div>
                <input
                  name="facebook"
                  value={form.facebook || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="facebook.com/mofy.ai"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
           {/* You can add a Cancel/Reset button here if needed */}
           <button
            type="button"
            onClick={fetchSettings}
            disabled={saving}
            className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Reset
          </button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-slate-800 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </motion.button>
        </div>

      </form>
    </motion.div>
  );
}