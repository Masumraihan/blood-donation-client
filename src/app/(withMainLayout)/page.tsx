import AboutUsSection from "@/components/homePage/AboutUsSection";
import BloodDonors from "@/components/homePage/BloodDonors";
import HeroSection from "@/components/homePage/HeroSection";

export default function Home({
  searchParams,
}: {
  searchParams?: { search?: string; bloodType?: string; availability?: string };
}) {
  return (
    <main>
      <HeroSection />
      <AboutUsSection />
      <BloodDonors searchParams={searchParams} />
    </main>
  );
}
