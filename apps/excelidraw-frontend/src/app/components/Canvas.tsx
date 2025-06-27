import { useEffect, useRef } from "react";
import { initDraw } from "../draw";


export function Canvas({roomId, socket}:{roomId: string, socket:WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvasRef.current) {           
            initDraw(canvasRef.current, roomId, socket);
        }        
    }, [canvasRef]);


    return <div className="w-full h-screen">
         <canvas ref={canvasRef} className="w-full h-screen bg-black"> </canvas>
    </div>
}