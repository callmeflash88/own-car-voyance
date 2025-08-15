import { FC } from "react";
import { MessageItem } from "@/entities/message/ui/MessageItem";
import chatMockAvatar from "@/shared/assets/icons/chatMockAvatar.png";

interface Props {
  messages: any[];
  currentUserId: number;
  participants: any[];
}

export const ChatMessages: FC<Props> = ({
  messages,
  currentUserId,
  participants,
}) => {
  const getUserAvatar = (senderId: number) => {
    const user = participants.find((p) => p.user_id === senderId)?.user;
    return user?.avatar || chatMockAvatar;
  };
  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto">
      {messages.length === 0 && (
        <div className="text-gray-500 text-center py-4">No messages yet</div>
      )}

      {messages.map((msg, i) => (
        <MessageItem
          key={i}
          text={msg.text}
          isSender={msg.user_id !== currentUserId}
          avatar={getUserAvatar(msg.sender_id ?? msg.user_id)}
        />
      ))}
    </div>
  );
};
