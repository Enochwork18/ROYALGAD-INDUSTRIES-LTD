"use client";

import { Upload, Trash2, Image as ImageIcon, X } from "lucide-react";
import { useState, useEffect } from "react";

interface GalleryItem {
  id: string;
  url: string;
  caption: string | null;
  category: string;
  type: string;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ url: "", caption: "", category: "Products" });
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (!res.ok) throw new Error("Failed to fetch");
      setItems(await res.json());
    } catch {
      setError("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      alert("Failed to delete item");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Upload failed");
      setForm({ url: "", caption: "", category: "Products" });
      setShowUpload(false);
      await fetchItems();
    } catch {
      alert("Failed to upload item");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-500 dark:text-slate-400">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Gallery</h1>
        <button onClick={() => setShowUpload(!showUpload)} className="btn-primary text-sm !px-4 !py-2">
          <Upload className="h-4 w-4" /> Upload Media
        </button>
      </div>

      {showUpload && (
        <div className="card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-slate-100">Add Gallery Item</h3>
            <button onClick={() => setShowUpload(false)} className="p-1 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
          </div>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Image URL</label>
              <input type="url" required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Caption</label>
                <input type="text" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500">
                  <option value="Products">Products</option>
                  <option value="Factory">Factory</option>
                  <option value="Team">Team</option>
                  <option value="Events">Events</option>
                  <option value="Certificates">Certificates</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowUpload(false)} className="btn-outline text-sm !py-2.5">Cancel</button>
              <button type="submit" disabled={saving} className="btn-primary text-sm !py-2.5">{saving ? "Uploading..." : "Add to Gallery"}</button>
            </div>
          </form>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-slate-400 text-center py-12">No gallery items yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden aspect-square">
              {item.url ? (
                <img src={item.url} alt={item.caption || "Gallery image"} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300 dark:text-slate-600">
                  <ImageIcon className="h-12 w-12" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end p-3">
                <div className="flex items-center justify-between w-full">
                  <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{item.caption || "No caption"}</p>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 dark:bg-slate-800/90 rounded text-xs font-medium text-gray-700 dark:text-slate-300">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
