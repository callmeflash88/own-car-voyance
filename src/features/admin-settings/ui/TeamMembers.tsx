import Image from "next/image";

interface TeamMember {
  id: number;
  email: string;
  name?: string;
  logo?: {
    url: string;
  };
}

interface TeamMembersProps {
  data: TeamMember[];
}

export const TeamMembers = ({ data }: TeamMembersProps) => {
  return (
    <div className="bg-white rounded-2xl shadow w-full p-5">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h2 className="text-lg font-semibold">Team members</h2>
      </div>

      <div className="mt-4 space-y-4">
        {data.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                defaultChecked
              />
              {member.logo?.url ? (
                <Image
                  src={member.logo.url}
                  alt={member.name || member.email}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
              )}
              <div>
                <p className="font-medium">{member.name || "Unknown User"}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-500">Admin</span>
              <button className="text-purple-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
