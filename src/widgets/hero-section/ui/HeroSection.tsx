// src/widgets/home-hero-section/ui/HeroSection.tsx

import { FilterForm } from "@/features/car-filter/ui/FilterForm";
import clsx from "clsx";

export const HeroSection = () => {
  return (
    <section
      className={clsx(
        "relative min-h-[742px] bg-cover bg-center bg-no-repeat text-white py-20 px-4"
      )}
      style={{ backgroundImage: "url('/assets/backgrounds/home-hero-bg.png')" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-[32px] lg:text-[56px] font-bold mb-4 leading-tight">
          The Future of <br /> Car Buying & Selling
        </h1>
        <p className="text-[16px] lg:text-lg">
          CarVoyance unifies the fragmented car buying experience into a single
          ecosystem,
          <br /> making it simpler, safer, and more transparent.
        </p>
      </div>
      <div className="w-full flex justify-center mt-7">
        <FilterForm />
      </div>
    </section>
  );
};
