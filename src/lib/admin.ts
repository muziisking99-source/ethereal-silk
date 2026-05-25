import { supabase } from "@/integrations/supabase/client";

/** Returns true if the user has the admin role in user_roles. */
export async function checkIsAdmin(userId: string): Promise<boolean> {
  const { data: rpcData, error: rpcError } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });

  if (!rpcError && rpcData === true) return true;

  // Fallback when RPC is unavailable: read own role row (requires RLS policy)
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  return !error && !!data;
}
