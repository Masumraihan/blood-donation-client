import AboutUsSection from "@/components/homePage/AboutUsSection";
import BloodDonors from "@/components/homePage/BloodDonors";
import HeroSection from "@/components/homePage/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutUsSection />
      <BloodDonors />
    </main>
  );
}
