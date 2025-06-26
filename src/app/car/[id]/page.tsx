"use client";
import { CarGallery } from "@/entities/vehicle/ui/CarGallery";
import image from "../../../../public/assets/images/car1.png";
import image1 from "../../../../public/assets/images/car2.png";
import { Fuel, Gauge, Heart, MapPin, Palette, Settings } from "lucide-react";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { useState } from "react";
import { Button } from "@/shared/ui";
import transmissionIcon from "../../../../public/assets/icons/transmissinIcon.svg";
import Image from "next/image";
import { ToggleFavorite } from "@/features/toggle-favorite/ui/ToggleFavorite";

const carsImages = [
  image.src, // Извлекаем строку пути из объекта StaticImageData
  image1.src,
  image.src,
  image1.src,
  image.src,
  image1.src,
  image.src,
  image1.src,
  image.src,
  image1.src,
];

const tabs = ["Description", "Seller Information"];

export const CarDescription = () => (
  <div className="text-sm text-gray-700 space-y-4">
    <p className="font-inter font-normal text-base leading-relaxed tracking-normal align-middle mt-14">
      This 2007 Mercedes-Benz S-Class combines timeless design with executive
      comfort. The vehicle is in good condition, offering a smooth ride, premium
      interior materials, and classic German engineering. Ideal for those who
      appreciate comfort, status, and reliability in one package.
    </p>

    {/* Характеристики */}
    <div className="grid grid-cols-2 gap-y-6">
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Gauge color="#2B2B2B4D" /> Mileage
        </strong>
        142,000 km
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Fuel /> Fuel Type
        </strong>{" "}
        Petrol
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Image src={transmissionIcon} alt="transmission" /> Transmission
        </strong>{" "}
        Automatic
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <MdOutlineAirlineSeatReclineNormal /> Seats
        </strong>{" "}
        5
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Settings /> Engine
        </strong>{" "}
        5.0 L V8
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Palette /> Color Exterior
        </strong>{" "}
        Obsidian Black
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Gauge color="#2B2B2B4D" /> Drive Type
        </strong>
        Rear-wheel drive (RWD)
      </div>

      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Palette /> Color Interior
        </strong>{" "}
        Beide Leather
      </div>
    </div>
  </div>
);

export const CarSellerInfo = () => (
  <div className="text-sm text-gray-700 space-y-3">
    <div>
      <strong>Seller:</strong> John Doe
    </div>
    <div>
      <strong>Member since:</strong> 2023
    </div>
    <p>“I sell only well-maintained cars with verified history...”</p>
    <div>
      <strong>Account Type:</strong> ✅ Verified
    </div>
    <div>
      <strong>Email Verified:</strong> ✅ Completed
    </div>
    <div>
      <strong>Total Listings:</strong> 6 active vehicles
    </div>
    <div>
      <strong>Contact:</strong> +123 45678 901
    </div>
  </div>
);

export default function CarPage() {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <section className="w-full px-[120px] py-10">
      <div className="w-full flex items-start justify-between gap-10">
        <div className="w-1/2">
          <CarGallery images={carsImages} />
        </div>
        <div className="w-1/2 flex flex-col justify-start items-start">
          <div className="flex items-center gap-2">
            <MapPin size={15} />
            <p className="font-inter font-normal text-xs leading-5 tracking-normal">
              Miamy, FL
            </p>
          </div>
          <h1 className="mt-3 font-inter font-semibold text-3xl leading-none tracking-normal text-[#2B2B2B]">
            Mercedes-Benz S-Class 2007
          </h1>
          <h2 className="mt-5 font-inter font-semibold text-[40px] leading-none tracking-normal text-[#2B2B2B]">
            10 900$
          </h2>
          <div className="mt-10 w-full">
            {/* Tabs */}
            <div className="flex justify-between border-b border-gray-300 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`mx-auto font-inter font-medium text-base leading-none tracking-normal pb-3 ${
                    activeTab === tab
                      ? "border-b-2 border-black text-black"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div>
              {activeTab === "Description" && <CarDescription />}
              {activeTab === "Seller Information" && <CarSellerInfo />}
            </div>
          </div>
          <div className="w-full flex mt-14 gap-4">
            <Button
              variant={"secondary"}
              size="lg"
              className="bg-[#E7E6E7] text-[#2B2B2B]"
            >
              Message Seller
            </Button>
            <Button variant={"primary"} size="lg" className="px-14">
              Proceed to Order
            </Button>
            <div className="border-[#E7E6E7] border-2 rounded-2xl p-2 w-12 h-12 flex items-center justify-center">
              <Heart size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
