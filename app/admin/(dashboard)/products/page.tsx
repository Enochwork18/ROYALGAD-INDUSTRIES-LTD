"use client";

import { Plus, Edit, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ProductSize {
  id: string;
  size: string;
  price: number;
  stock: number;
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  howToUse: string;
  ingredients: string;
  nafdacNumber: string;
  inStock: boolean;
  featured: boolean;
  sizes: ProductSize[];
  images: ProductImage[];
  createdAt: string;
}

const emptyForm = {
  name: "", category: "", description: "", howToUse: "", ingredients: "", nafdacNumber: "", inStock: true,
};

const emptySize = { size: "", price: 0, stock: 0 };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [sizes, setSizes] = useState<{ size: string; price: number; stock: number }[]>([{ ...emptySize }]);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to fetch");
      setProducts(await res.json());
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setSizes([{ ...emptySize }]);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name, category: p.category, description: p.description,
      howToUse: p.howToUse, ingredients: p.ingredients, nafdacNumber: p.nafdacNumber, inStock: p.inStock,
    });
    setSizes(p.sizes.length > 0 ? p.sizes.map(s => ({ size: s.size, price: s.price, stock: s.stock })) : [{ ...emptySize }]);
    setShowModal(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete product");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(
        editingId ? `/api/admin/products/${editingId}` : "/api/admin/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            sizes: sizes.filter(s => s.size.trim() !== ""),
          }),
        }
      );
      if (!res.ok) throw new Error("Save failed");
      setShowModal(false);
      await fetchProducts();
    } catch {
      alert("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-500 dark:text-slate-400">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Products</h1>
        <button onClick={openAdd} className="btn-primary text-sm !px-4 !py-2">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Product Name</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Category</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">NAFDAC</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Status</th>
                <th className="text-right p-4 font-medium text-gray-600 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-medium text-gray-900 dark:text-slate-100">{product.name}</td>
                  <td className="p-4 text-gray-600 dark:text-slate-400">{product.category}</td>
                  <td className="p-4 text-gray-600 dark:text-slate-400">{product.nafdacNumber}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.inStock ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(product)} className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id, product.name)} className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-slate-100">{editingId ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500">
                  <option value="">Select category</option>
                  <option value="Germicide">Germicide</option>
                  <option value="Antiseptic">Antiseptic</option>
                  <option value="Hand Care">Hand Care</option>
                  <option value="Disinfectant">Disinfectant</option>
                  <option value="Toilet Care">Toilet Care</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
                <textarea rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">How to Use</label>
                <textarea rows={2} required value={form.howToUse} onChange={(e) => setForm({ ...form, howToUse: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Ingredients</label>
                <textarea rows={2} required value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">NAFDAC Number</label>
                <input type="text" required value={form.nafdacNumber} onChange={(e) => setForm({ ...form, nafdacNumber: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Sizes & Pricing</label>
                {sizes.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" placeholder="Size (e.g. 500ml)" value={s.size} onChange={(e) => { const ns = [...sizes]; ns[i] = { ...ns[i], size: e.target.value }; setSizes(ns); }} className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
                    <input type="number" placeholder="Price" value={s.price || ""} onChange={(e) => { const ns = [...sizes]; ns[i] = { ...ns[i], price: Number(e.target.value) }; setSizes(ns); }} className="w-28 px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
                    <input type="number" placeholder="Stock" value={s.stock || ""} onChange={(e) => { const ns = [...sizes]; ns[i] = { ...ns[i], stock: Number(e.target.value) }; setSizes(ns); }} className="w-24 px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-500" />
                    {sizes.length > 1 && (
                      <button type="button" onClick={() => setSizes(sizes.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => setSizes([...sizes, { ...emptySize }])} className="text-sm text-brand-green-600 hover:text-brand-green-700 font-medium">+ Add Size</button>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-brand-green-500 focus:ring-brand-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">In Stock</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 text-sm !py-2.5">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 text-sm !py-2.5">{saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
