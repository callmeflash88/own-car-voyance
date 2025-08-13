"use client";
import { CarGallery } from "@/entities/vehicle/ui/CarGallery";
import image from "../../../../../public/assets/images/car1.png";
import image1 from "../../../../../public/assets/images/car2.png";
import { Fuel, Gauge, Heart, MapPin, Palette, Settings } from "lucide-react";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { useState } from "react";
import { Button } from "@/shared/ui";
import transmissionIcon from "../../../../../public/assets/icons/transmissinIcon.svg";
import Image from "next/image";
import { ToggleFavorite } from "@/features/toggle-favorite/ui/ToggleFavorite";
import { useFindCarByIdQuery } from "@/shared/api/webSiteApi";
import { useParams, useRouter } from "next/navigation";
import { CarById, VehicleAd } from "@/shared/types/car";
import { useMessageSellerMutation } from "@/shared/api/carApi";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";

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

const CarDescription = ({ vehicle }: { vehicle: CarById }) => (
  <div className="text-sm text-gray-700 space-y-4">
    <p className="font-inter font-normal text-base leading-relaxed tracking-normal align-middle mt-14">
      {vehicle?.description}
    </p>

    <div className="grid grid-cols-2 gap-y-6">
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Gauge color="#2B2B2B4D" /> Mileage
        </strong>
        {vehicle?.mileage}
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Fuel /> Fuel Type
        </strong>{" "}
        {vehicle?.fuel_type}
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Image src={transmissionIcon} alt="transmission" /> Transmission
        </strong>{" "}
        {vehicle?.transmission}
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <MdOutlineAirlineSeatReclineNormal /> Seats
        </strong>{" "}
        {vehicle?.number_of_seats}
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Settings /> Engine
        </strong>{" "}
        {vehicle?.engine}
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Palette /> Color Exterior
        </strong>{" "}
        {vehicle?.exterior_color}
      </div>
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Gauge color="#2B2B2B4D" /> Drive Type
        </strong>
        {vehicle?.drive_type}
      </div>

      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Palette /> Color Interior
        </strong>{" "}
        {vehicle?.interior_color}
      </div>
    </div>
  </div>
);

const CarSellerInfo = ({ vehicle }: { vehicle: CarById }) => (
  <div className="text-sm text-gray-700 space-y-3">
    <div>
      <strong>Seller:</strong> {vehicle?.seller.name}
    </div>
    <div>
      <strong>Member since:</strong> {vehicle?.seller.created_at}
    </div>
    <p>{vehicle?.seller.bio}</p>
    <div>
      <strong>Account Type:</strong>{" "}
      {vehicle?.seller.register_verification
        ? "✅ Verified"
        : "❌ Not Verified"}
    </div>
    <div>
      <strong>Email Verified:</strong>{" "}
      {vehicle?.seller.email_verification ? "✅ Completed" : "❌ Not Verified"}
    </div>
    <div>
      <strong>Total Listings:</strong> {vehicle?.seller?._count?.cars} active
      vehicles
    </div>
    <div>
      <strong>Contact:</strong> {vehicle?.seller.phone}
    </div>
  </div>
);

export default function CarPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;
  const [activeTab, setActiveTab] = useState("Description");
  const { data: vehicle, isLoading } = useFindCarByIdQuery(
    id?.toString() || ""
  );

  const [
    messageSeller,
    { data: messageSellerResponse, isLoading: isMessageLoading, error },
  ] = useMessageSellerMutation();

  const handleMessageSeller = async () => {
    try {
      const result = await messageSeller({ car_id: vehicle?.id }).unwrap();
      if (result?.chat_id) {
        router.push(`/chat/${result.chat_id}`);
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      // можешь показать toast или alert
    }
  };

  if (isLoading || !vehicle) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-500">
          Loading vehicle...
        </p>
      </section>
    );
  }

  const vehicleName = `${vehicle.make} ${vehicle.model} ${vehicle.year}`;

  return (
    <section className="w-full px-[120px] py-10">
      <Breadcrumbs customLastLabel={vehicleName} />
      <div className="w-full flex items-start justify-between gap-10 pt-5 md:pt-10">
        <div className="w-1/2">
          <CarGallery images={vehicle?.images} />
        </div>
        <div className="w-1/2 flex flex-col justify-start items-start">
          <div className="flex items-center gap-2">
            <MapPin size={15} />
            <p className="font-inter font-normal text-xs leading-5 tracking-normal">
              {vehicle?.location}
            </p>
          </div>
          <h1 className="mt-3 font-inter font-semibold text-3xl leading-none tracking-normal text-[#2B2B2B]">
            {vehicleName}
          </h1>
          <h2 className="mt-5 font-inter font-semibold text-[40px] leading-none tracking-normal text-[#2B2B2B]">
            ${vehicle?.price}
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
              {activeTab === "Description" && vehicle && (
                <CarDescription vehicle={vehicle} />
              )}

              {activeTab === "Seller Information" && vehicle && (
                <CarSellerInfo vehicle={vehicle} />
              )}
            </div>
          </div>
          <div className="w-full flex mt-14 gap-4">
            <Button
              variant={"secondary"}
              size="lg"
              className="bg-[#E7E6E7] text-[#2B2B2B]"
              onClick={handleMessageSeller}
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
