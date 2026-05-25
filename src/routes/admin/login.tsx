import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Check admin role
    const { data: hasAdmin } = await supabase.rpc("has_role", {
      _user_id: data.user!.id,
      _role: "admin",
    });

    if (!hasAdmin) {
      await supabase.auth.signOut();
      setError("You do not have admin access.");
      setLoading(false);
      return;
    }

    navigate({ to: "/admin/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#faf7f4] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-sm w-full bg-white border border-[rgba(180,140,160,0.18)] p-8"
      >
        <div className="text-center mb-8">
          <div className="font-[Bodoni_Moda] text-[1.5rem] font-bold text-[#6b3a5e] mb-1">
            Only <span className="italic text-[#e8849a]">Liyah</span>
          </div>
          <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.3em] uppercase text-[#8a6e7a]">
            Admin Login
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#faf7f4] border border-[rgba(180,140,160,0.18)] text-[0.9rem] text-[#1e1218] focus:border-[#6b3a5e] focus:outline-none transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-[#faf7f4] border border-[rgba(180,140,160,0.18)] text-[0.9rem] text-[#1e1218] focus:border-[#6b3a5e] focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c4aab4] hover:text-[#6b3a5e]"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-[0.82rem] text-red-500 bg-red-50 p-3 border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-[#6b3a5e] to-[#a87cad] text-white py-3.5 text-[0.78rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(107,58,94,0.25)] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
