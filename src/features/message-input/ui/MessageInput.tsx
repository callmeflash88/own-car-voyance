"use client";
import { FC, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Socket } from "socket.io-client";

interface Props {
  userId: number;
  socket: Socket | null;
  chatId: number | null;
  onLocalSend?: (message: any) => void; // для оптимистичного добавления в ChatMessages
}

export const MessageInput: FC<Props> = ({
  userId,
  socket,
  chatId,
  onLocalSend,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);

  const sendMessage = () => {
    const text = newMessage.trim();
    if (!socket || !chatId || !text) return;

    const messagePayload = {
      chat_id: chatId,
      sender_id: userId,
      text, // <-- вместо content
      createdAt: new Date().toISOString(),
    };

    socket.emit("send_message", messagePayload);
    if (onLocalSend) onLocalSend(messagePayload);

    setNewMessage("");
  };

  return (
    <div className="flex flex-col border-t px-4 py-2 bg-white rounded-b-2xl">
      {showAttachments && (
        <div className="flex gap-4 mb-2">
          <button className="text-purple-600 hover:underline">📷 Image</button>
          <button className="text-purple-600 hover:underline">🎥 Video</button>
          <button className="text-purple-600 hover:underline">
            📄 Document
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowAttachments(!showAttachments)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Paperclip />
        </button>
        <input
          className="flex-1 border rounded-full px-4 py-2 outline-none"
          placeholder={
            chatId ? "Type your message..." : "Select a chat to start messaging"
          }
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={!chatId}
        />
        <button
          onClick={sendMessage}
          disabled={!chatId || !newMessage.trim()}
          className="bg-purple-600 text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
