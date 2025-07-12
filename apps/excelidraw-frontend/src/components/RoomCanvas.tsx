"use client";

import { WS_URL } from "@/app/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}:{roomId: string}){
    const [ socket, setSocket ] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlOWIyZmE3OC00NmVkLTRlYzAtYjg3Ny1iMGI1N2E1YzA5MmEiLCJpYXQiOjE3NTIzMDE2NDV9.OQP3gAMaJBoToNRZDzP_s_RM7ukC9L-Se5IaYUxqsYQ`);
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