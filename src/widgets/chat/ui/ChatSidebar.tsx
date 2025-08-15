import { FC } from "react";
import chatMockAvatar from "@/shared/assets/icons/chatMockAvatar.png";
import Image from "next/image";

interface Props {
  chats: any[];
  selectedChat: any;
  userId: number;
  onSelectChat: (chat: any) => void;
}

export const ChatSidebar: FC<Props> = ({
  chats,
  selectedChat,
  userId,
  onSelectChat,
}) => (
  <div className="p-4">
    <div className="font-bold text-lg">Conversations</div>
    <ul className="space-y-4 mt-10">
      {chats.map((chat) => {
        // ID текущего пользователя можно подтягивать из токена или глобального стейта

        const otherParticipant = chat.participants?.find(
          (p: any) => p.user_id !== userId
        );

        const chatName = otherParticipant?.user?.full_name || "Unknown";
        const avatar = otherParticipant?.user?.avatar || chatMockAvatar;
        const lastMessage =
          chat.messages && chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1]
            : null;
        const unreadCount = chat.unread_count || 0;

        return (
          <li
            key={chat.id}
            className={`flex justify-between items-start text-sm p-4 rounded-2xl cursor-pointer hover:bg-gray-50 ${
              selectedChat?.id === chat.id ? "bg-white shadow" : ""
            }`}
            onClick={() => onSelectChat(chat)}
          >
            <div className="flex gap-4">
              <Image
                src={avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{chatName}</p>
                <p className="text-gray-500 truncate max-w-[150px]">
                  {lastMessage?.content || "No messages yet"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">
                {lastMessage?.created_at
                  ? new Date(lastMessage.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
              {unreadCount > 0 && (
                <span className="mt-1 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                  {unreadCount}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);
