import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/order-confirmation")({
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const [order, setOrder] = React.useState<any>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const saved = localStorage.getItem("onlyliyah-last-order");
    if (!saved) {
      navigate({ to: "/shop" });
      return;
    }
    setOrder(JSON.parse(saved));
  }, [navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg w-full bg-white border border-[rgba(var(--border-rgb),0.18)] p-8 lg:p-12 text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-[rgba(var(--accent-rgb),0.08)] border border-[rgba(var(--border-rgb),0.18)] flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-[var(--accent)]" strokeWidth={1.5} />
        </div>

        <h1 className="font-[Bodoni_Moda] text-[2rem] font-bold text-[var(--text)] mb-3">
          Order Submitted
        </h1>
        <p className="text-[0.9rem] text-[var(--muted)] leading-[1.7] mb-8">
          Thank you, {order.name}. Your order has been sent via WhatsApp.
          We'll confirm your order and arrange delivery shortly.
        </p>

        <div className="bg-[var(--bg2)] p-5 text-left mb-8">
          <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
            Order Details
          </div>
          <div className="flex flex-col gap-2 text-[0.82rem] text-[var(--muted)]">
            <div><strong className="text-[var(--text)]">Name:</strong> {order.name}</div>
            <div><strong className="text-[var(--text)]">Phone:</strong> {order.phone}</div>
            <div><strong className="text-[var(--text)]">Address:</strong> {order.address}</div>
            {order.notes && <div><strong className="text-[var(--text)]">Notes:</strong> {order.notes}</div>}
            <div className="border-t border-[rgba(var(--border-rgb),0.18)] pt-2 mt-1">
              <strong className="text-[var(--text)]">Total:</strong>{" "}
              <span className="font-[Bodoni_Moda] text-[1.1rem] font-bold text-[var(--accent)]">
                R{order.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/shop"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white py-3.5 text-[0.78rem] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(var(--accent-rgb),0.25)]"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center border border-[rgba(var(--border-rgb),0.35)] text-[var(--muted)] py-3.5 text-[0.78rem] tracking-[0.15em] uppercase transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
