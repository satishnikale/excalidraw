"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center mx-auto gap-4">
     <div className="w-auto h-auto flex justify-center items-center mx-auto gap-4 px-10 border py-20 rounded">
       <input value={roomId} onChange={(e) => {
        setRoomId(e.target.value)
      }}
      className="appearance-none font-semibold p-2 border rounded shadow"
      type="text" placeholder="Room Id" />
      <button
        onClick={() => {
          router.push(`/room/${roomId}`)
        }}
        className="bg-blue-600 rounded text-white font-bold p-2"
        >Join Room</button>
     </div>
    </div>
  );
}
