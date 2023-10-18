"use client";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {useChat} from "ai/react";
import MessageList from "./MessageList";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import { cn } from "@/lib/utils";
type Props = {chatId: number}
const ChatComponent = ({chatId}: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/chat/get", {
        chatId,
      });
      return response.data;
    },
  });
    
    const {input, handleInputChange, handleSubmit, messages} = useChat({
        api: '/api/chat',
        body: {
          chatId
        },
        initialMessages: data || [],
    });
    React.useEffect(() => {
      const messageContainer = document.getElementById("message-container");
      if (messageContainer) {
        messageContainer.scrollTo({
          top: messageContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    }, [messages]);
    
    return ( 
        <div
      className={cn("relative ", {
        "min-h-screen": messages?.length === 0,
        "max-h-screen overflow-scroll": messages?.length > 0,
      })}
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading}  />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-5 bg-white"
      > 
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
     );
}
 
export default ChatComponent;