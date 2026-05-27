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
  FileText,
  Star,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAllProducts } from "@/hooks/useProducts";
import type { Product } from "@/hooks/useProducts";
import AdminAboutEditor from "@/components/admin/AdminAboutEditor";
import AdminHomeEditor from "@/components/admin/AdminHomeEditor";
import AdminBentoEditor from "@/components/admin/AdminBentoEditor";
import AdminAvailabilityEditor from "@/components/admin/AdminAvailabilityEditor";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

const STATUS_OPTIONS = ["Pending", "Packed", "Shipped", "Completed"];

function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: products, refetch } = useAllProducts();

  const [tab, setTab] = React.useState<"products" | "orders" | "homepage" | "about" | "bento" | "availability">(
    "products"
  );
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
    if (authLoading) return;
    if (!user || !isAdmin) {
      navigate({ to: "/admin/login", replace: true });
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

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--plum)] animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="bg-[var(--surface)] border-b border-[var(--border-color)] px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="font-[Bodoni_Moda] text-[1.2rem] font-bold text-[var(--plum)]">
          Only <span className="italic text-[var(--blush)]">Liyah</span>{" "}
          <span className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[var(--muted-text)] ml-2">
            Admin
          </span>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-[0.72rem] text-[var(--muted-text)] hover:text-[var(--plum)] transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Sign Out
        </button>
      </header>

      <div className="px-6 lg:px-12 py-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setTab("products")}
              className={`flex items-center gap-2 px-5 py-2.5 text-[0.78rem] tracking-[0.15em] uppercase border transition-all duration-300 ${
                tab === "products"
                  ? "bg-[var(--plum)] text-white border-[var(--plum)]"
                  : "bg-[var(--surface)] text-[var(--muted-text)] border-[var(--border-color)] hover:border-[var(--plum)]"
              }`}
            >
              <Package className="w-4 h-4" strokeWidth={1.5} />
              Products
            </button>
            <button
              onClick={() => setTab("orders")}
              className={`flex items-center gap-2 px-5 py-2.5 text-[0.78rem] tracking-[0.15em] uppercase border transition-all duration-300 ${
                tab === "orders"
                  ? "bg-[var(--plum)] text-white border-[var(--plum)]"
                  : "bg-[var(--surface)] text-[var(--muted-text)] border-[var(--border-color)] hover:border-[var(--plum)]"
              }`}
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
              Orders
            </button>
            <button
              onClick={() => setTab("availability")}
              className={`flex items-center gap-2 px-5 py-2.5 text-[0.78rem] tracking-[0.15em] uppercase border transition-all duration-300 ${
                tab === "availability"
                  ? "bg-[var(--plum)] text-white border-[var(--plum)]"
                  : "bg-[var(--surface)] text-[var(--muted-text)] border-[var(--border-color)] hover:border-[var(--plum)]"
              }`}
            >
              <Star className="w-4 h-4" strokeWidth={1.5} />
              Available Now
            </button>
            <button
              onClick={() => setTab("homepage")}
              className={`flex items-center gap-2 px-5 py-2.5 text-[0.78rem] tracking-[0.15em] uppercase border transition-all duration-300 ${
                tab === "homepage"
                  ? "bg-[var(--plum)] text-white border-[var(--plum)]"
                  : "bg-[var(--surface)] text-[var(--muted-text)] border-[var(--border-color)] hover:border-[var(--plum)]"
              }`}
            >
              <FileText className="w-4 h-4" strokeWidth={1.5} />
              Homepage
            </button>
            <button
              onClick={() => setTab("bento")}
              className={`flex items-center gap-2 px-5 py-2.5 text-[0.78rem] tracking-[0.15em] uppercase border transition-all duration-300 ${
                tab === "bento"
                  ? "bg-[var(--plum)] text-white border-[var(--plum)]"
                  : "bg-[var(--surface)] text-[var(--muted-text)] border-[var(--border-color)] hover:border-[var(--plum)]"
              }`}
            >
              <Image className="w-4 h-4" strokeWidth={1.5} />
              Bento Section
            </button>
            <button
              onClick={() => setTab("about")}
              className={`flex items-center gap-2 px-5 py-2.5 text-[0.78rem] tracking-[0.15em] uppercase border transition-all duration-300 ${
                tab === "about"
                  ? "bg-[var(--plum)] text-white border-[var(--plum)]"
                  : "bg-[var(--surface)] text-[var(--muted-text)] border-[var(--border-color)] hover:border-[var(--plum)]"
              }`}
            >
              <FileText className="w-4 h-4" strokeWidth={1.5} />
              About Page
            </button>
          </div>

          {/* Products Tab */}
          {tab === "products" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-[Bodoni_Moda] text-[1.5rem] font-bold text-[var(--text)]">
                  Lingerie Sets
                </h2>
                <button
                  onClick={() => {
                    setEditing(null);
                    resetForm();
                    setShowForm(true);
                  }}
                  className="flex items-center gap-2 bg-gradient-to-br from-[var(--plum)] to-[var(--accent-2)] text-white px-5 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_8px_20px_rgba(var(--plum-rgb),0.3)]"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                  Add New Set
                </button>
              </div>

              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[var(--surface)] border border-[var(--border-color)] p-6 mb-8 overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-[Bodoni_Moda] text-[1.2rem] font-bold text-[var(--text)]">
                        {editing ? "Edit Set" : "Add New Set"}
                      </h3>
                      <button
                        onClick={() => setShowForm(false)}
                        className="p-1 text-[var(--dim)] hover:text-[var(--blush)]"
                      >
                        <X className="w-5 h-5" strokeWidth={1.5} />
                      </button>
                    </div>
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">Name *</label>
                        <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-color)] text-[0.9rem] focus:outline-none focus:border-[var(--plum)]" />
                      </div>
                      <div>
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">SKU *</label>
                        <input required value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))} className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-color)] text-[0.9rem] focus:outline-none focus:border-[var(--plum)]" />
                      </div>
                      <div>
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">Price (ZAR) *</label>
                        <input required type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-color)] text-[0.9rem] focus:outline-none focus:border-[var(--plum)]" />
                      </div>
                      <div>
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">Category</label>
                        <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-color)] text-[0.9rem] focus:outline-none focus:border-[var(--plum)]" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">Description</label>
                        <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-color)] text-[0.9rem] resize-none focus:outline-none focus:border-[var(--plum)]" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">Images</label>
                        <div className="flex gap-2 flex-wrap mb-3">
                          {form.images.map((img, i) => (
                            <div key={i} className="relative w-20 h-20">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--blush)] text-white rounded-full flex items-center justify-center text-[0.6rem]"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <label className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] text-[0.78rem] text-[var(--muted-text)] cursor-pointer hover:border-[var(--plum)] transition-colors">
                          <Image className="w-4 h-4" strokeWidth={1.5} />
                          {uploading ? "Uploading..." : "Upload Images"}
                          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                      <div className="flex gap-4 md:col-span-2">
                        <label className="flex items-center gap-2 text-[0.85rem] text-[var(--muted-text)] cursor-pointer">
                          <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="accent-[var(--plum)]" />
                          Featured
                        </label>
                        <label className="flex items-center gap-2 text-[0.85rem] text-[var(--muted-text)] cursor-pointer">
                          <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="accent-[var(--plum)]" />
                          Active
                        </label>
                      </div>
                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          className="bg-gradient-to-br from-[var(--plum)] to-[var(--accent-2)] text-white px-8 py-3 text-[0.78rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_8px_20px_rgba(var(--plum-rgb),0.3)]"
                        >
                          {editing ? "Update Set" : "Publish Set"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-[var(--surface)] border border-[var(--border-color)] overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Image</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Name / SKU</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Price</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Category</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Status</th>
                      <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((p) => (
                      <tr key={p.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg)]">
                        <td className="p-4">
                          <img src={p.images?.[0] ?? "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=80&h=80&fit=crop"} alt="" className="w-12 h-12 object-cover" />
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-[0.9rem] text-[var(--text)]">{p.name}</div>
                          <div className="text-[0.72rem] text-[var(--dim)]">{p.sku}</div>
                        </td>
                        <td className="p-4 font-[DM_Mono] text-[0.85rem] text-[var(--plum)]">R{p.price.toLocaleString()}</td>
                        <td className="p-4 text-[0.82rem] text-[var(--muted-text)] capitalize">{p.category}</td>
                        <td className="p-4">
                          <span className={`text-[0.6rem] tracking-[0.15em] uppercase px-2 py-1 ${p.active ? "bg-[var(--plum-dim)] text-[var(--plum)]" : "bg-[var(--border-color)] text-[var(--muted-text)]"}`}>
                            {p.active ? "Active" : "Inactive"}
                          </span>
                          {p.featured && (
                            <span className="ml-1 text-[0.6rem] tracking-[0.15em] uppercase px-2 py-1 bg-[var(--blush-dim)] text-[var(--blush)]">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(p)} className="p-2 text-[var(--muted-text)] hover:text-[var(--plum)] transition-colors">
                              <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="p-2 text-[var(--muted-text)] hover:text-[var(--blush)] transition-colors">
                              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!products?.length && (
                  <div className="text-center py-12 text-[var(--muted-text)] text-[0.85rem]">
                    No products yet. Click "Add Product" to get started.
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "availability" && <AdminAvailabilityEditor />}
          {tab === "homepage" && <AdminHomeEditor />}
          {tab === "bento" && <AdminBentoEditor />}
          {tab === "about" && <AdminAboutEditor />}

          {/* Orders Tab */}
          {tab === "orders" && (
            <>
              <h2 className="font-[Bodoni_Moda] text-[1.5rem] font-bold text-[var(--text)] mb-6">Orders</h2>
              {ordersLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-[var(--plum)] animate-spin" strokeWidth={1.5} />
                </div>
              ) : (
                <div className="bg-[var(--surface)] border border-[var(--border-color)] overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[var(--border-color)]">
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Date</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Customer</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Phone</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Total</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Items</th>
                        <th className="p-4 text-[0.6rem] tracking-[0.2em] uppercase text-[var(--muted-text)] font-normal">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg)]">
                          <td className="p-4 text-[0.82rem] text-[var(--muted-text)]">
                            {new Date(o.created_at).toLocaleDateString("en-ZA")}
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-[0.85rem] text-[var(--text)]">{o.customer_name}</div>
                            <div className="text-[0.72rem] text-[var(--dim)] truncate max-w-[200px]">{o.shipping_address}</div>
                          </td>
                          <td className="p-4 text-[0.82rem] text-[var(--muted-text)]">{o.customer_phone}</td>
                          <td className="p-4 font-[DM_Mono] text-[0.85rem] text-[var(--plum)] font-medium">
                            R{o.total_price.toLocaleString()}
                          </td>
                          <td className="p-4 text-[0.78rem] text-[var(--muted-text)]">
                            {(o.order_items as any[])?.length ?? 0} items
                          </td>
                          <td className="p-4">
                            <select
                              value={o.order_status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className="text-[0.72rem] tracking-[0.1em] uppercase px-2 py-1 bg-[var(--bg)] border border-[var(--border-color)] text-[var(--plum)] focus:outline-none focus:border-[var(--plum)]"
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
                    <div className="text-center py-12 text-[var(--muted-text)] text-[0.85rem]">
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
