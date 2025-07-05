"use client";
import Image from "next/image";
import noAvatar from "../../../../public/assets/images/no-avatar.webp";
import profileGal from "../../../../public/assets/icons/profileGal.svg";

interface Props {
  user: any;
}

export const UserProfileAvatar = ({ user }: Props) => {
  const avatarUrl = user?.logo?.url;
  const isExternal = typeof avatarUrl === "string";

  return (
    <div className="py-5 w-full flex justify-center items-center gap-5 border-b border-gray-200">
      <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0">
        <Image
          src={isExternal ? avatarUrl : noAvatar}
          alt="Avatar"
          fill
          className="object-cover"
          unoptimized={isExternal}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="flex w-full justify-start gap-5 items-center">
          <h3 className="font-inter font-semibold text-2xl leading-none tracking-normal">
            {user.full_name}
          </h3>
          <Image src={profileGal} alt="profileGal" width={24} height={24} />
        </div>
        <p className="font-inter font-normal text-base leading-none tracking-normal text-[#2B2B2B99]">
          Member since: {new Date(user.created_at).getFullYear()}
        </p>
      </div>
    </div>
  );
};
