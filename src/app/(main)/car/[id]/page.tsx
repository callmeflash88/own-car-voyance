"use client";
import { CarGallery } from "@/entities/vehicle/ui/CarGallery";
import image from "../../../../../public/assets/images/car1.png";
import image1 from "../../../../../public/assets/images/car2.png";
import {
  ChevronRight,
  CircleCheck,
  CircleX,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  Palette,
  Phone,
  Settings,
} from "lucide-react";
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
import { formatNumber } from "@/shared/lib/utils";

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
    <p className="font-inter font-normal text-base leading-relaxed tracking-normal align-middle">
      {vehicle?.description}
    </p>

    <div className="grid grid-cols-2 gap-y-6">
      <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
        <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
          <Gauge color="#2B2B2B4D" /> Mileage
        </strong>
        {formatNumber(vehicle.mileage, false)} km
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

const CarSellerInfo = ({ vehicle }: { vehicle: CarById }) => {
  const { seller } = vehicle;
  const memberSince = new Date(seller.created_at).getFullYear();

  const accountType = seller.register_verification
    ? "Verified"
    : "Not Verified";
  const emailType = seller.email_verification ? "Verified" : "Not Verified";
  const amountListings = seller._count.cars;

  const accountTypeIcon = seller.register_verification ? (
    <CircleCheck color="#00C00A" size={20} className="min-w-5 min-h-5" />
  ) : (
    <CircleX color="#FF0000" size={20} className="min-w-5 min-h-5" />
  );
  const emailTypeIcon = seller.email_verification ? (
    <CircleCheck color="#00C00A" size={20} className="min-w-5 min-h-5" />
  ) : (
    <CircleX color="#FF0000" size={20} className="min-w-5 min-h-5" />
  );

  return (
    <div className="flex flex-col gap-6 text-sm text-gray-700 space-y-3">
      <div className="flex flex-col gap-1">
        <strong className="text-2xl text-[#2b2b2b] leading-none font-semibold">
          {seller.full_name}
        </strong>
        <p className="text-base leading-none text-[#2b2b2b99]">
          Member since {memberSince}
        </p>
      </div>

      <q className="text-base leading-snug text-[#2b2b2b] italic">
        {seller.bio}
      </q>

      <div className="flex justify-between md:justify-start gap-6">
        <div className="flex md:flex-1 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-base leading-none text-[#2B2B2B4D]">
              Account Type
            </p>
            <div className="flex items-center gap-2">
              {accountTypeIcon}
              <p className="text-base leading-none text-[#2b2b2b] font-medium">
                {accountType}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base leading-none text-[#2B2B2B4D]">
              Email Verified
            </p>
            <div className="flex items-center gap-2">
              {emailTypeIcon}
              <p className="text-base leading-none text-[#2b2b2b] font-medium">
                {emailType}
              </p>
            </div>
          </div>
        </div>
        <div className="flex md:flex-1 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-base leading-none text-[#2B2B2B4D]">
              Total Listings
            </p>
            <div className="flex items-center gap-2">
              <p className="text-base leading-none text-[#2b2b2b] font-medium">
                {amountListings} active vehicles
              </p>
              <ChevronRight size={20} color="#4E17E5" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base leading-none text-[#2B2B2B4D]">
              Contact Method
            </p>
            <div className="flex items-center gap-2">
              <Phone color="#2b2b2b" size={20} />
              <p className="text-base leading-none text-[#2b2b2b] font-medium underline underline-offset-3">
                {seller.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        router.push(`/chat?id=${result.chat_id}`);
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
    <section className="w-full px-4 md:px-[80px] lg:px-[120px] py-10">
      <Breadcrumbs customLastLabel={vehicleName} />
      <div className="w-full flex flex-col lg:flex-row items-start gap-10 pt-5 md:pt-10">
        <div className="w-full flex-1">
          <CarGallery images={vehicle?.images} />
        </div>
        <div className="w-full flex flex-1 flex-col justify-start items-start">
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
            {formatNumber(vehicle.price)} $
          </h2>
          <div className="mt-10 w-full">
            {/* Tabs */}
            <div className="flex justify-between mb-6 lg:mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`w-full mx-auto font-inter font-medium text-base leading-none tracking-normal pb-3 cursor-pointer  ${
                    activeTab === tab
                      ? "border-b-1 border-black text-black"
                      : "border-b border-gray-300 text-gray-400"
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
          <div className="w-full flex flex-col md:flex-row mt-14 gap-4">
            <div className="flex gap-4">
              <Button
                variant={"secondary"}
                size="lg"
                className="bg-[#E7E6E7] text-[#2B2B2B] w-full md:w-auto"
                onClick={handleMessageSeller}
              >
                Message Seller
              </Button>
              <div className="flex border-[#E7E6E7] border-2 rounded-2xl p-2 w-12 h-12 md:hidden items-center justify-center">
                <Heart size={20} />
              </div>
            </div>
            <Button variant={"primary"} size="lg" className="px-14">
              Proceed to Order
            </Button>
            <div className="hidden border-[#E7E6E7] border-2 rounded-2xl p-2 w-12 h-12 md:flex items-center justify-center">
              <Heart size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
