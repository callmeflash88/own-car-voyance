import { MessageItem } from "@/entities/message/ui/MessageItem";

export const ChatMessages = () => {
  const messages = [
    { text: "Lorem!", isSender: true },
    { text: "Lorem ipsum dolor sit amet...", isSender: false },
    { text: "Lorem ipsum dolor", isSender: true },
  ];

  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto ">
      {messages.map((msg, i) => (
        <MessageItem key={i} {...msg} avatar="/user-avatar.png" />
      ))}
    </div>
  );
};
