import Hero from "@/components/Hero";
import FeaturesNew from "@/components/FeaturesNew";
import Showcase from "@/components/Showcase";
import FooterNew from "@/components/FooterNew";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <FeaturesNew />
      <Showcase />
      <FooterNew />
    </main>
  );
}
