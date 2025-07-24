"use client";
import { FC, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Socket } from "socket.io-client";

interface Props {
  userId: number;
  socket: Socket | null;
  chatId: number | null;
  activeChat: any;
}

export const MessageInput: FC<Props> = ({
  userId,
  socket,
  chatId,
  activeChat,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [showAttachments, setShowAttachments] = useState(false);

  const sendMessage = () => {
    if (socket && chatId && newMessage.trim()) {
      socket.emit("send_message", {
        chatId,
        userId,
        role: "user",
        content: newMessage,
        type: "memver",
      });
      setNewMessage("");
    }
  };

  const formatDate = (dateString: string) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const isToday =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    if (isToday) {
      return messageDate.toLocaleTimeString([], options);
    } else {
      const day = messageDate.getDate().toString().padStart(2, "0");
      const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
      const year = messageDate.getFullYear();
      return `${month}/${day}/${year}`;
    }
  };

  return (
    <div className="flex flex-col border-t px-4 py-2">
      {showAttachments && (
        <div className="flex gap-2 mb-2">
          <button className="text-purple-600">📷 Attach Image</button>
          <button className="text-purple-600">🎥 Attach Video</button>
          <button className="text-purple-600">📄 Attach Document</button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <button onClick={() => setShowAttachments(!showAttachments)}>
          <Paperclip />
        </button>
        <input
          className="flex-1 border rounded-full px-4 py-2 outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="bg-purple-600 text-white rounded-full p-2">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
