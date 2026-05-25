import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BentoSection from "@/components/BentoSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ShippingInfo from "@/components/ShippingInfo";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <Navbar />
      <CartDrawer />
      <Hero />
      <Marquee />
      <BentoSection />
      <FeaturedCollection />
      <AboutSection />
      <Testimonials />
      <FAQ />
      <ShippingInfo />
      <Footer />
    </div>
  );
}
