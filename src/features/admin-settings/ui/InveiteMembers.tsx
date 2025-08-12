import { useState } from "react";
import { Button, Input } from "@/shared/ui";

import { NotificationService } from "@/shared/lib/NotificationService";
import { useInviteTeamMutation } from "@/shared/api/dashBoardApi";

export const InviteMembers = () => {
  const [email, setEmail] = useState("");
  const [inviteTeam, { isLoading, error, isSuccess }] = useInviteTeamMutation();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      NotificationService.error("Please enter a valid email address");
      return;
    }

    try {
      await inviteTeam({ email }).unwrap();
      NotificationService.success("Invitation sent!");
      setEmail("");
    } catch (e: any) {
      const errorMessage =
        e?.data?.message || "Failed to send invitation. Please try again.";
      NotificationService.error(errorMessage);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow w-full p-5">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h2 className="text-lg font-semibold">Invite members</h2>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <p className="font-inter font-medium text-base leading-[150%] tracking-normal">
          Send an invitation to join the platform by entering an email address.
          <br />
          The recipient will receive a secure link to create an account and get
          started.
        </p>
        <div className="w-full flex justify-between gap-5">
          <div className="flex-1">
            <Input
              name="email"
              placeholder="olivia@example.com"
              type="email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            className="px-20"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Invite"}
          </Button>
        </div>
      </div>
    </div>
  );
};
