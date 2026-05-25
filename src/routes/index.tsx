import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BentoSection from "@/components/BentoSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import ShippingInfo from "@/components/ShippingInfo";
import CtaStrip from "@/components/CtaStrip";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MobileCartFab from "@/components/MobileCartFab";

export const Route = createFileRoute("/")({
  component: HomePage,
  // Avoid SSR route-load failures on Lovable when env/modules differ from local dev
  ssr: false,
});

function HomePage() {
  return (
    <div className="min-h-screen theme-page bg-[#FAF7F4]">
      <ScrollProgressBar />
      <Navbar />
      <CartDrawer />
      <MobileCartFab />
      <Hero />
      <Marquee />
      <BentoSection />
      <FeaturedCollection />
      <AboutSection />
      <ShippingInfo />
      <Testimonials />
      <CtaStrip />
      <Footer />
    </div>
  );
}
