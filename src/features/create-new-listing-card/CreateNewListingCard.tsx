import noPhoto from "@/shared/assets/images/NonPhoto.png";
import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const CreateNewLisitngCard = () => {
  const router = useRouter();
  return (
    <div className="bg-white w-full rounded-xl shadow-sm border border-[#e5e7eb] flex flex-col">
      <div className="relative">
        <Image src={noPhoto} alt="car" className="w-full" />
      </div>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h4 className="font-inter font-semibold text-[16px] leading-none tracking-normal">
            Make/Model/Year
          </h4>
          <span className="font-inter font-semibold text-[24px] leading-none tracking-normal mt-2 block">
            Price
          </span>
          <p className="mt-1 text-sm text-gray-500">Description</p>
        </div>
        <div className="flex justify-between items-center mt-4 gap-2">
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-center"
            iconLeft={<Plus />}
            onClick={() => router.push("/create-ad")}
          >
            Create New Listing
          </Button>
        </div>
      </div>
    </div>
  );
};
