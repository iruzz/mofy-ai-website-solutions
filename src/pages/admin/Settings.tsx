// pages/admin/Settings.tsx

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Settings() {
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/admin/profile").then((res) => {
      setForm(res.data.data[0]);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/admin/profile/${form.id}`, form);
      alert("Settings berhasil disimpan");
    } catch {
      alert("Gagal menyimpan settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div>
      <h1>Company Settings</h1>

      <input name="site_title" value={form.site_title} onChange={handleChange} />
      <input name="address" value={form.address} onChange={handleChange} />
      <input name="email_contact" value={form.email_contact} onChange={handleChange} />
      <input name="instagram" value={form.instagram} onChange={handleChange} />
      <input name="li" value={form.li} onChange={handleChange} />
      <input name="facebook" value={form.facebook} onChange={handleChange} />

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
