import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Package,
  ShoppingCart,
  Image,
  Loader2,
  X,
  Eye,
  EyeOff,
  Check,
  Search,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAllProducts } from "@/hooks/useProducts";
import type { Product } from "@/hooks/useProducts";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

const STATUS_OPTIONS = ["Pending", "Packed", "Shipped", "Completed"];

function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: products, refetch } = useAllProducts();

  const [tab, setTab] = React.useState<"products" | "orders">("products");
  const [showForm, setShowForm] = React.useState(false);
  const [editing, setEditing] = React.useState<Product | null>(null);
  const [orders, setOrders] = React.useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    category: "lingerie",
    featured: false,
    active: true,
    images: [] as string[],
  });

  React.useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate({ to: "/admin/login" });
    }
  }, [authLoading, user, isAdmin, navigate]);

  React.useEffect(() => {
    if (tab === "orders") loadOrders();
  }, [tab]);

  async function loadOrders() {
    setOrdersLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setOrders(data ?? []);
    setOrdersLoading(false);
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const newImages: string[] = [];
    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, { upsert: true });
      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
        newImages.push(urlData.publicUrl);
      }
    }
    setForm((f) => ({ ...f, images: [...f.images, ...newImages] }));
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      sku: form.sku,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      images: form.images,
      featured: form.featured,
      active: form.active,
    };

    if (editing) {
      await supabase.from("products").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("products").insert(payload);
    }
    setShowForm(false);
    setEditing(null);
    resetForm();
    refetch();
  };

  const resetForm = () => {
    setForm({
      name: "",
      sku: "",
      description: "",
      price: "",
      category: "lingerie",
      featured: false,
      active: true,
      images: [],
    });
  };

  const startEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      sku: product.sku,
      description: product.description ?? "",
      price: product.price.toString(),
      category: product.category,
      featured: product.featured,
      active: product.active,
      images: product.images ?? [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    refetch();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ order_status: status }).eq("id", id);
    loadOrders();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#faf7f4] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#6b3a5e] animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#faf7f4]">
      {/* Header */}
      <header className="bg-white border-b border-[rgba(180,140,160,0.18)] px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="font-[Bodoni_Moda] text-[1.2rem] font-bold text-[#6b3a5e]">
          Only <span className="italic text-[#e8849a]">Liyah</span>{" "}
          <span className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#8a6e7a] ml-2">
            Admin
          </span>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-[0.72rem] text-[#8a6e7a] hover:text-[#6b3a5e] transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Sign Out
        </button>
      </header>

      <div className="px-6 lg:px-12 py-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setTab("products")}
              className={`flex items-center gap-2 px-5 py-2.5 text-[0.78rem] tracking-[0.15em] uppercase border transition-all duration-300 ${
                tab === "products"
                  ? "bg-[#6b3a5e] text-white border-[#6b3a5e]"
                  : "bg-white text-[#8a6e7a] border-[rgba(180,140,160,0.18)] hover:border-[#6b3a5e]"
              }`}
            >
              <Package className="w-4 h-4" strokeWidth={1.5} />
              Products
            </button>
            <button
              onClick={() => setTab("orders")}
              className={`flex items-center gap-2 px-5 py-2.5 text-[0.78rem] tracking-[0.15em] uppercase border transition-all duration-300 ${
                tab === "orders"
                  ? "bg-[#6b3a5e] text-white border-[#6b3a5e]"
                  : "bg-white text-[#8a6e7a] border-[rgba(180,140,160,0.18)] hover:border-[#6b3a5e]"
              }`}
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
              Orders
            </button>
          </div>

          {/* Products Tab */}
          {tab === "products" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-[Bodoni_Moda] text-[1.5rem] font-bold">
                  Products
                </h2>
                <button
                  onClick={() => {
                    setEditing(null);
                    resetForm();
                    setShowForm(true);
                  }}
                  className="flex items-center gap-2 bg-gradient-to-br from-[#6b3a5e] to-[#a87cad] text-white px-5 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(107,58,94,0.25)]"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                  Add Product
                </button>
              </div>

              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white border border-[rgba(180,140,160,0.18)] p-6 mb-8 overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-[Bodoni_Moda] text-[1.2rem] font-bold">
                        {editing ? "Edit Product" : "Add Product"}
                      </h3>
                      <button
                        onClick={() => setShowForm(false)}
                        className="p-1 text-[#c4aab4] hover:text-[#e8849a]"
                      >
                        <X className="w-5 h-5" strokeWidth={1.5} />
                      </button>
                    </div>
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">Name *</label>
                        <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 bg-[#faf7f4] border border-[rgba(180,140,160,0.18)] text-[0.9rem] focus:border-[#6b3a5e] focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">SKU *</label>
                        <input required value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))} className="w-full px-4 py-3 bg-[#faf7f4] border border-[rgba(180,140,160,0.18)] text-[0.9rem] focus:border-[#6b3a5e] focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">Price (ZAR) *</label>
                        <input required type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="w-full px-4 py-3 bg-[#faf7f4] border border-[rgba(180,140,160,0.18)] text-[0.9rem] focus:border-[#6b3a5e] focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">Category</label>
                        <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-4 py-3 bg-[#faf7f4] border border-[rgba(180,140,160,0.18)] text-[0.9rem] focus:border-[#6b3a5e] focus:outline-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">Description</label>
                        <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full px-4 py-3 bg-[#faf7f4] border border-[rgba(180,140,160,0.18)] text-[0.9rem] focus:border-[#6b3a5e] focus:outline-none resize-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">Images</label>
                        <div className="flex gap-2 flex-wrap mb-3">
                          {form.images.map((img, i) => (
                            <div key={i} className="relative w-20 h-20">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-[#e8849a] text-white rounded-full flex items-center justify-center text-[0.6rem]"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <label className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(180,140,160,0.35)] text-[0.78rem] text-[#8a6e7a] cursor-pointer hover:border-[#6b3a5e] transition-colors">
                          <Image className="w-4 h-4" strokeWidth={1.5} />
                          {uploading ? "Uploading..." : "Upload Images"}
                          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                      <div className="flex gap-4 md:col-span-2">
                        <label className="flex items-center gap-2 text-[0.85rem] text-[#8a6e7a] cursor-pointer">
                          <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="accent-[#6b3a5e]" />
                          Featured
                        </label>
                        <label className="flex items-center gap-2 text-[0.85rem] text-[#8a6e7a] cursor-pointer">
                          <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="accent-[#6b3a5e]" />
                          Active
                        </label>
                      </div>
                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          className="bg-gradient-to-br from-[#6b3a5e] to-[#a87cad] text-white px-8 py-3 text-[0.78rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(107,58,94,0.25)]"
                        >
                          {editing ? "Update Product" : "Create Product"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-white border border-[rgba(180,140,160,0.18)] overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[rgba(180,140,160,0.18)]">
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Image</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Name / SKU</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Price</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Category</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Status</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((p) => (
                      <tr key={p.id} className="border-b border-[rgba(180,140,160,0.1)] hover:bg-[#faf7f4]">
                        <td className="p-4">
                          <img src={p.images?.[0] ?? "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=80&h=80&fit=crop"} alt="" className="w-12 h-12 object-cover saturate-[0.75]" />
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-[0.9rem] text-[#1e1218]">{p.name}</div>
                          <div className="text-[0.72rem] text-[#c4aab4]">{p.sku}</div>
                        </td>
                        <td className="p-4 font-[DM_Mono] text-[0.85rem] text-[#6b3a5e]">R{p.price.toLocaleString()}</td>
                        <td className="p-4 text-[0.82rem] text-[#8a6e7a] capitalize">{p.category}</td>
                        <td className="p-4">
                          <span className={`text-[0.6rem] tracking-[0.15em] uppercase px-2 py-1 ${p.active ? "bg-[rgba(107,58,94,0.08)] text-[#6b3a5e]" : "bg-[rgba(180,140,160,0.12)] text-[#8a6e7a]"}`}>
                            {p.active ? "Active" : "Inactive"}
                          </span>
                          {p.featured && (
                            <span className="ml-1 text-[0.6rem] tracking-[0.15em] uppercase px-2 py-1 bg-[rgba(232,132,154,0.12)] text-[#e8849a]">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(p)} className="p-2 text-[#8a6e7a] hover:text-[#6b3a5e] transition-colors">
                              <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="p-2 text-[#8a6e7a] hover:text-[#e8849a] transition-colors">
                              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!products?.length && (
                  <div className="text-center py-12 text-[#8a6e7a] text-[0.85rem]">
                    No products yet. Click "Add Product" to get started.
                  </div>
                )}
              </div>
            </>
          )}

          {/* Orders Tab */}
          {tab === "orders" && (
            <>
              <h2 className="font-[Bodoni_Moda] text-[1.5rem] font-bold mb-6">Orders</h2>
              {ordersLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-[#6b3a5e] animate-spin" strokeWidth={1.5} />
                </div>
              ) : (
                <div className="bg-white border border-[rgba(180,140,160,0.18)] overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[rgba(180,140,160,0.18)]">
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Date</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Customer</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Phone</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Total</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Items</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#8a6e7a] font-normal">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-[rgba(180,140,160,0.1)] hover:bg-[#faf7f4]">
                          <td className="p-4 text-[0.82rem] text-[#8a6e7a]">
                            {new Date(o.created_at).toLocaleDateString("en-ZA")}
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-[0.85rem] text-[#1e1218]">{o.customer_name}</div>
                            <div className="text-[0.72rem] text-[#c4aab4] truncate max-w-[200px]">{o.shipping_address}</div>
                          </td>
                          <td className="p-4 text-[0.82rem] text-[#8a6e7a]">{o.customer_phone}</td>
                          <td className="p-4 font-[DM_Mono] text-[0.85rem] text-[#6b3a5e] font-medium">
                            R{o.total_price.toLocaleString()}
                          </td>
                          <td className="p-4 text-[0.78rem] text-[#8a6e7a]">
                            {(o.order_items as any[])?.length ?? 0} items
                          </td>
                          <td className="p-4">
                            <select
                              value={o.order_status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className="text-[0.72rem] tracking-[0.1em] uppercase px-2 py-1 bg-[#faf7f4] border border-[rgba(180,140,160,0.18)] text-[#6b3a5e] focus:outline-none focus:border-[#6b3a5e]"
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!orders.length && (
                    <div className="text-center py-12 text-[#8a6e7a] text-[0.85rem]">
                      No orders yet.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
