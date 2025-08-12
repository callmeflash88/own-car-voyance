import { Button } from "@/shared/ui";

export const DeleteProfile = () => {
  return (
    <div className="bg-white rounded-2xl shadow w-full p-5">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h2 className="text-lg font-semibold">Page management</h2>
      </div>
      <p className="font-inter font-medium text-base leading-[150%] tracking-normal mt-5">
        You can delete your account. You can restore access to your page at any
        time.
      </p>
      <Button variant="danger" size="md" className="mt-5 bg-[#F54C3E]">
        Delete Your Account
      </Button>
    </div>
  );
};
