import AboutUsSection from "@/components/homePage/AboutUsSection";
import BloodDonors from "@/components/homePage/BloodDonors";
import HeroSection from "@/components/homePage/HeroSection";
import Testimonials from "@/components/homePage/Testimonials";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/homePage/Map"), { ssr: false });
export default function Home({
  searchParams,
}: {
  searchParams?: { searchTerm?: string; bloodType?: string; availability?: string };
}) {
  return (
    <main>
      <HeroSection />
      <AboutUsSection />
      <BloodDonors searchParams={searchParams} />
      <Map />
      <Testimonials />
    </main>
  );
}
