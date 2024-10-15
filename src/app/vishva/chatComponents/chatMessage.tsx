import React from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === "user";
  return (
    <div className={`mb-4 ${isUser ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block rounded-lg p-2 ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
