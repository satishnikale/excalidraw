"use client";

import { WS_URL } from "@/app/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}:{roomId: string}){
    const [ socket, setSocket ] = useState<WebSocket | null>(null);
   
    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${
            localStorage.getItem('token')
        }`);
        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }));
        }
    }, []);

    if(!socket){
        return <div className="w-full h-screen flex justify-center items-center bg-gray-950 text-white">
            Connection to Server!
            <br />
            Please Wait...
        </div>
    }

    return (
       <Canvas roomId={roomId} socket={socket} />
    );
}