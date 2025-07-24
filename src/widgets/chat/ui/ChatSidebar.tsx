import { FC } from "react";
import chatMockAvatar from "@/shared/assets/icons/chatMockAvatar.png";
import Image from "next/image";

const chats = [
  {
    id: 1,
    name: "Olivia Levin",
    time: "12:01pm",
    preview: "Lorem ipsum...",
    unread: true,
  },
  {
    chat: 2,
    name: "Olivia Levin",
    time: "11:54am",
    preview: "Lorem ipsum...",
    unread: false,
  },
];

interface Props {
  chats: any[];
  selectedChat: any;
}

export const ChatSidebar: FC<Props> = ({ selectedChat }) => (
  <div className=" p-4">
    <div>Conversations</div>
    <ul className="space-y-4 mt-10">
      {chats.map((chat, idx) => (
        <li
          key={idx}
          className={`flex justify-between items-start text-sm p-4 rounded-2xl ${
            selectedChat?.id === chat.id ? "bg-white" : ""
          }`}
        >
          <div className="flex gap-4">
            <Image
              src={chatMockAvatar}
              alt="chatMockAvatar"
              width={40}
              height={40}
            />
            <div className="flex flex-col">
              <p className="font-semibold">{chat.name}</p>
              <p className="text-gray-500">{chat.preview.slice(0, 20)}</p>
            </div>
          </div>
          <div className="text-xs text-gray-400">{chat.time}</div>
        </li>
      ))}
    </ul>
  </div>
);
