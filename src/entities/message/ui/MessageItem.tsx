import { FC } from "react";
import clsx from "clsx";

interface Props {
  text: string;
  isSender: boolean;
  avatar?: string;
}

export const MessageItem: FC<Props> = ({ text, isSender, avatar }) => (
  <div
    className={clsx("flex mb-2", isSender ? "justify-end" : "justify-start")}
  >
    {!isSender && avatar && (
      <img src={avatar} className="w-8 h-8 rounded-full mr-2" />
    )}
    <div
      className={clsx(
        "max-w-xs px-2 py-4 rounded-xl text-sm",
        !isSender ? "bg-[#728CFD] text-white" : "bg-gray-200 text-black"
      )}
    >
      {text}
    </div>
  </div>
);
