import { BottomTransform } from "@/widgets/bottom-transform/ui/BottomTransform";
import { CompleteAutomative } from "@/widgets/complete-automative/ui/CompleteAutomative";
import { Faq } from "@/widgets/faq/ui/Faq";
import { FeaturedVehicles } from "@/widgets/featured-vehicles/ui/FeaturedVehicles";
import { HeroSection } from "@/widgets/hero-section/ui/HeroSection";
import { HowItWorks } from "@/widgets/how-it-works/ui/HowItWorks";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedVehicles />
      <HowItWorks />
      <CompleteAutomative />
      <Faq />
      <BottomTransform />
    </>
  );
}
