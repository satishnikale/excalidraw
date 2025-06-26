"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCuurentMessage] = useState("");
  const { socket, loading } = useSocket();

  console.log("My chats : ", chats);

  useEffect(() => {
    if(!socket){
      return;
    }
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );
    }

    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === "chat") {
        setChats((c) => [...c, { message: parsedData.message }]);
      }
    };
  }, [socket, loading, id]);
  return (
    <div className="w-full h-screen relative">
      {chats.map((m, i) => <div key={i}>{m.message}</div>)}
      <div className="w-full h-auto absolute bottom-4 flex justify-center items-center">
        <input
        className="appearance-none border py-2 px-2"
        type="text"
        value={currentMessage}
        onChange={(e) => {
          setCuurentMessage(e.target.value);
        }}
        placeholder="Type a message..."
      />
      <button
        className="px-2 py-2 border bg-blue-700 rounded text-white"
        onClick={() => {
          if (!socket) return;
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: id,
              messages: currentMessage,
            })
          );
          setCuurentMessage("");
        }}
      >
        Send Message
      </button>
      </div>
    </div>
  );
}
