import { ProfileProgress } from "@/widgets/profile-progress/ui/profile-progress";
import { UserProfileCard } from "@/features/user-profile-info/ui/UserProfileCard";

export default function Profile() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 px-10">
      <div className="flex flex-col gap-4">
        <ProfileProgress />
        <UserProfileCard />
      </div>
      <div>{/* Active listings (машини) */}</div>
    </div>
  );
}
