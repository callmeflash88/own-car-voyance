"use client";
import { ChatMessages } from "@/widgets/chat/ui/ChatMessages";
import { MessageInput } from "@/features/message-input/ui/MessageInput";
import { ChatSidebar } from "@/widgets/chat/ui/ChatSidebar";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { ACCESS_TOKEN } from "@/shared/constants/cookiesKeys";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/shared/lib/hooks";
import { updateUnreadCount } from "@/shared/store/chatSlices";
import { useGetUserQuery } from "@/entities/user/api/userApi";

export interface LastMessage {
  content: string;
  created_at: string;
  status: number;
  user_id: number;
}

export interface ChatData {
  id: number;
  avatar: any;
  last_message: LastMessage;
  name: string;
  type: number;
  user_id?: number;
  unreadMessagesCount: number;
}

interface Participant {
  id: number;
  chat_id: number;
  user_id: number;
  unreadCount: number;
  user: any;
}

interface Chat {
  id: number;
  created_at: string;
  updated_at: string;
  messages: any[];
  participants: Participant[];
  unread_count: number;
}

export default function ChatPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const [chats, setChats] = useState<Chat[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const { data } = useGetUserQuery();

  console.log("Data: ", data);

  const accessToken = Cookies.get(ACCESS_TOKEN);
  const activeChatIdRef = useRef<number | null>(null);
  //app-api.carvoyance.com

  https: useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);

  useEffect(() => {
    console.log("accessToken", accessToken);
    if (!accessToken) {
      console.warn("No access token found!");
    }

    const sock = io("https://app-api.carvoyance.com", {
      transports: ["websocket"],
      path: "/socket.io",
      auth: {
        token: accessToken,
      },
    });

    sock.on("connect_error", (err) => console.error("WS error:", err.message));

    sock.on("connect", () => {
      sock.emit("get_chats");
    });

    sock.on("chat_list", (list: any) => {
      console.log("📥 chat_list:", list);
      setChats(list);
    });

    sock.on("unread_messages", (data) => {
      dispatch(
        updateUnreadCount({ chatId: data.chat_id, count: data.unread_count })
      );
    });

    sock.on("new_message", (message: any) => {
      if (activeChatIdRef.current === message.chat_id) {
        setMessages((prev) => [...prev, message]);
      } else {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === message.chat_id
              ? { ...chat, last_message: message }
              : chat
          )
        );
      }
    });

    sock.on("disconnect", (reason) =>
      console.log("Socket disconnected:", reason)
    );

    setSocket(sock);
    return () => {
      sock.disconnect();
    };
  }, [accessToken]);

  useEffect(() => {
    console.log("chats", chats[0]?.participants[0].user);
    console.log("activeChat", activeChat);
    console.log("activeChatId", activeChatId);
  }, [chats, activeChat]);

  return (
    <div className="px-10 w-full flex flex-col gap-10 items-start">
      <div className="w-full flex flex-row gap-2">
        <div className="w-96 flex flex-col">
          <ChatSidebar
            chats={chats}
            selectedChat={activeChat}
            userId={data?.id}
            onSelectChat={(chat) => {
              setActiveChatId(chat.id);
              setActiveChat(chat);
              setMessages(chat.messages || []);
            }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between h-[80vh] bg-white rounded-2xl shadow w-full p-5">
          <ChatMessages
            messages={messages}
            currentUserId={data?.id}
            participants={activeChat?.participants || []}
          />

          <MessageInput
            userId={data?.id}
            socket={socket}
            chatId={activeChatId}
            onLocalSend={(msg) => setMessages((prev) => [...prev, msg])}
          />
        </div>
      </div>
    </div>
  );
}
