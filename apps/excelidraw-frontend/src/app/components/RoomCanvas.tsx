"use client";

import { WS_URL } from "@/app/config";
import { initDraw } from "@/app/draw";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}:{roomId: string}){
    const [ socket, setSocket ] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlOWIyZmE3OC00NmVkLTRlYzAtYjg3Ny1iMGI1N2E1YzA5MmEiLCJpYXQiOjE3NTEwMTkwNzJ9.LGKB_QRkJ9S6uKr4nTor04N65hpQow_iq3BX8c9fVwk`);
        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }));
        }
    }, []);

    if(!socket){
        return <div className="w-full h-screen flex justify-center items-center">
            Connection to Server!
            <br />
            Please Wait...
        </div>
    }

    return (
       <Canvas roomId={roomId} socket={socket} />
    );
}