import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Services() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", deskripsi: "", icon: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = () => {
    api.get("/admin/layanan").then((res) => {
      setList(res.data.data);
    });
  };

  useEffect(load, []);

  const submit = async () => {
    if (editingId) {
      await api.put(`/admin/layanan/${editingId}`, form);
    } else {
      await api.post("/admin/layanan", form);
    }

    setForm({ title: "", deskripsi: "", icon: "" });
    setEditingId(null);
    load();
  };

  const edit = (item: any) => {
    setForm(item);
    setEditingId(item.id);
  };

  const del = async (id: number) => {
    if (!confirm("Hapus layanan ini?")) return;
    await api.delete(`/admin/layanan/${id}`);
    load();
  };

  return (
    <div>
      <h1>Layanan</h1>

      <input
        placeholder="Judul"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Deskripsi"
        value={form.deskripsi}
        onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
      />
      <input
        placeholder="Icon (opsional)"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
      />

      <button onClick={submit}>
        {editingId ? "Update" : "Tambah"}
      </button>

      <hr />

      {list.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.deskripsi}</p>

          <button onClick={() => edit(item)}>Edit</button>
          <button onClick={() => del(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
