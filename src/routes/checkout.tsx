import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const WHATSAPP_NUMBER = "27722865579";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  React.useEffect(() => {
    if (items.length === 0) {
      navigate({ to: "/shop" });
    }
  }, [items, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;

    setSubmitting(true);

    const orderLines = items
      .map(
        (i) =>
          `• ${i.name} (${i.sku}) — Qty: ${i.quantity} — R${(i.price * i.quantity).toLocaleString()}`
      )
      .join("\n");

    const message = `
*New Order from OnlyLiyah*

*Customer:*
Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}
${form.notes ? `Notes: ${form.notes}` : ""}

*Order:*
${orderLines}

*Total: R${totalPrice.toLocaleString()}*
    `.trim();

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    // Store order in localStorage for confirmation page
    localStorage.setItem(
      "onlyliyah-last-order",
      JSON.stringify({
        ...form,
        items,
        totalPrice,
        date: new Date().toISOString(),
      })
    );

    clearCart();
    window.location.href = "/order-confirmation";

    // Small delay to show loading
    setTimeout(() => {
      window.open(url, "_blank");
    }, 500);
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <Navbar />
      <CartDrawer />

      <div className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto">
          <button
            onClick={() => navigate({ to: "/shop" })}
            className="flex items-center gap-2 text-[0.78rem] text-[#8a6e7a] hover:text-[#6b3a5e] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Back to Shop
          </button>

          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#e8849a] mb-3">
            Checkout
          </div>
          <h1 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-12">
            Place Your Order
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <div>
                <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-[rgba(180,140,160,0.18)] text-[0.9rem] text-[#1e1218] placeholder:text-[#c4aab4] focus:border-[#6b3a5e] focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-[rgba(180,140,160,0.18)] text-[0.9rem] text-[#1e1218] placeholder:text-[#c4aab4] focus:border-[#6b3a5e] focus:outline-none transition-colors"
                  placeholder="e.g. +27 72 286 5579"
                />
              </div>
              <div>
                <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">
                  Shipping Address *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-[rgba(180,140,160,0.18)] text-[0.9rem] text-[#1e1218] placeholder:text-[#c4aab4] focus:border-[#6b3a5e] focus:outline-none transition-colors resize-none"
                  placeholder="Street, City, Province, Postal Code"
                />
              </div>
              <div>
                <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-[rgba(180,140,160,0.18)] text-[0.9rem] text-[#1e1218] placeholder:text-[#c4aab4] focus:border-[#6b3a5e] focus:outline-none transition-colors resize-none"
                  placeholder="Any special instructions..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full bg-gradient-to-br from-[#6b3a5e] to-[#a87cad] text-white py-4 text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(107,58,94,0.25)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                    Processing...
                  </>
                ) : (
                  "Place Order via WhatsApp"
                )}
              </button>
              <p className="text-[0.72rem] text-[#8a6e7a] text-center">
                You will be redirected to WhatsApp to confirm your order
              </p>
            </motion.form>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white border border-[rgba(180,140,160,0.18)] p-6 h-fit"
            >
              <h3 className="font-[Bodoni_Moda] text-[1.2rem] font-bold mb-6">
                Order Summary
              </h3>
              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover saturate-[0.75]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.85rem] font-medium text-[#1e1218] truncate">
                        {item.name}
                      </div>
                      <div className="text-[0.72rem] text-[#8a6e7a]">
                        {item.sku} × {item.quantity}
                      </div>
                    </div>
                    <div className="text-[0.85rem] text-[#6b3a5e] font-medium">
                      R{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[rgba(180,140,160,0.18)] pt-4 flex justify-between items-center">
                <span className="text-[0.85rem] text-[#8a6e7a]">Total</span>
                <span className="font-[Bodoni_Moda] text-[1.5rem] font-bold text-[#6b3a5e]">
                  R{totalPrice.toLocaleString()}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
