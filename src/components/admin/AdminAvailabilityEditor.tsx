import React from "react";
import { Image, Loader2, Plus, Save, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AvailabilityItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  visible: boolean;
  order: number;
}

const DEFAULT_ITEMS: AvailabilityItem[] = [
  {
    id: "1",
    title: "New Arrivals",
    description: "Fresh items just added to the collection",
    image_url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop",
    visible: true,
    order: 1,
  },
];

async function uploadImage(file: File, folder: string) {
  const fileName = `${folder}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, { upsert: true });
  if (error || !data) return null;
  const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
  return urlData.publicUrl;
}

export default function AdminAvailabilityEditor() {
  const [items, setItems] = React.useState<AvailabilityItem[]>(DEFAULT_ITEMS);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("availability_items")
        .select("*")
        .order("order", { ascending: true });
      
      if (!error && data && data.length > 0) {
        setItems(data);
      }
    } catch (err) {
      console.error("Error loading availability items:", err);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const url = await uploadImage(file, "availability");
    if (url) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, image_url: url } : item
        )
      );
    }
    setUploading(false);
  };

  const addItem = () => {
    const newItem: AvailabilityItem = {
      id: Date.now().toString(),
      title: "New Item",
      description: "",
      image_url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop",
      visible: true,
      order: items.length + 1,
    };
    setItems([...items, newItem]);
    setEditingId(newItem.id);
  };

  const removeItem = (id: string) => {
    if (confirm("Are you sure you want to remove this item?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, updates: Partial<AvailabilityItem>) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const toggleVisibility = (id: string) => {
    updateItem(id, { visible: !items.find((i) => i.id === id)?.visible });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Delete existing items
      await supabase.from("availability_items").delete().gt("id", "0");

      // Insert new items
      for (const item of items) {
        const { id, ...data } = item;
        await supabase.from("availability_items").insert({
          id: parseInt(id) || undefined,
          ...data,
        });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Error saving availability items:", err);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-[var(--plum)] animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-[Bodoni_Moda] text-[1.5rem] font-bold text-[var(--text)]">What's Available Now</h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 bg-[var(--plum)] text-white px-5 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-lg"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Item
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-br from-[var(--plum)] to-[#a87cad] text-white px-6 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase disabled:opacity-60 transition-all duration-300 hover:shadow-lg"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" strokeWidth={1.5} />
            )}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border-color)] p-6 space-y-6">
        <p className="text-[0.82rem] text-[var(--muted-text)]">
          Manage the items that appear in the "What's Available Now" section on your homepage.
        </p>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--muted-text)] text-[0.85rem] mb-4">No items yet</p>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 bg-[var(--plum)] text-white px-5 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-lg mx-auto"
            >
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Add First Item
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-[var(--border-color)] rounded-lg p-5 bg-[var(--bg)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Section */}
                  <div>
                    <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-3">
                      Image
                    </label>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full aspect-[4/3] object-cover rounded-lg mb-3"
                    />
                    <label className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] text-[0.78rem] text-[var(--muted-text)] cursor-pointer hover:border-[var(--plum)] transition-colors rounded">
                      <Image className="w-4 h-4" />
                      {uploading ? "Uploading..." : "Upload Image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, item.id)}
                      />
                    </label>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={item.title}
                        onChange={(e) => updateItem(item.id, { title: e.target.value })}
                        className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text)] text-[0.85rem] focus:border-[var(--plum)] focus:outline-none transition-colors rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">
                        Description
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text)] text-[0.85rem] focus:border-[var(--plum)] focus:outline-none transition-colors rounded resize-none"
                      />
                    </div>

                    <div className="flex gap-3 items-center pt-4 border-t border-[var(--border-color)]">
                      <button
                        type="button"
                        onClick={() => toggleVisibility(item.id)}
                        className={`flex items-center gap-2 px-3 py-2 text-[0.72rem] tracking-[0.1em] uppercase border rounded transition-colors ${
                          item.visible
                            ? "bg-[var(--plum-dim)] text-[var(--plum)] border-[var(--plum)]"
                            : "bg-[var(--border-color)] text-[var(--muted-text)] border-[var(--border-color)]"
                        }`}
                      >
                        {item.visible ? (
                          <>
                            <Eye className="w-4 h-4" strokeWidth={1.5} />
                            Visible
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                            Hidden
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 px-3 py-2 text-[0.72rem] tracking-[0.1em] uppercase border border-[var(--border-color)] text-[var(--blush)] hover:bg-[var(--blush-dim)] transition-colors rounded"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border-color)] p-6 rounded-lg">
        <h3 className="font-[Bodoni_Moda] text-[1.1rem] font-bold text-[var(--text)] mb-3">
          How to Use
        </h3>
        <ul className="space-y-2 text-[0.85rem] text-[var(--muted-text)]">
          <li>• <strong>Add Item:</strong> Click "Add Item" to create a new availability item</li>
          <li>• <strong>Upload Image:</strong> Click "Upload Image" to add or change the item's photo</li>
          <li>• <strong>Edit Details:</strong> Update the title and description directly</li>
          <li>• <strong>Visibility:</strong> Toggle the eye icon to show or hide the item</li>
          <li>• <strong>Remove:</strong> Click "Remove" to delete an item</li>
          <li>• <strong>Save:</strong> Click "Save Changes" when done to update the live site</li>
        </ul>
      </div>
    </form>
  );
}
