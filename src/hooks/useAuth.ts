import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/admin";

export function useAuth() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [session, setSession] = useState<unknown>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function syncSession(session: { user: { id: string; email?: string } } | null) {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);

      if (!session?.user?.id) {
        setIsAdmin(false);
        return;
      }

      const admin = await checkIsAdmin(session.user.id);
      if (mounted) setIsAdmin(admin);
    }

    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      await syncSession(session);
      if (mounted) setLoading(false);
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      setLoading(true);
      await syncSession(session);
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return { user, session, isAdmin, loading, signOut };
}
