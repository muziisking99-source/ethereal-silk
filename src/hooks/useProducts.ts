import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  price: number;
  category: string;
  images: string[];
  featured: boolean;
  active: boolean;
  created_at: string;
};

export function useProducts(category?: string, search?: string) {
  return useQuery({
    queryKey: ["products", category, search],
    queryFn: async () => {
      let q = supabase.from("products").select("*").eq("active", true);
      if (category) {
        q = q.eq("category", category);
      }
      if (search) {
        q = q.ilike("name", `%${search}%`);
      }
      const { data, error } = await q.order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Product[];
    },
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return (data ?? []) as Product[];
    },
  });
}

export function useNewArrivals() {
  return useQuery({
    queryKey: ["products", "new"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return (data ?? []) as Product[];
    },
  });
}

export function useAllProducts() {
  return useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Product[];
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Product;
    },
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category")
        .eq("active", true);
      if (error) throw error;
      const cats = [...new Set(data?.map((d) => d.category).filter(Boolean))];
      return cats as string[];
    },
  });
}
