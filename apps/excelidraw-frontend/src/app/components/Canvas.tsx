"use client";

import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Hand, LucideArrowRight, LucideDiamond, LucideMousePointer, Pen, Pencil, Square } from "lucide-react";
import { Draw } from "../draw/Draw";

export type Tool = "circle" | "rect" | "pencil" | "line"; // | "hand" | "pointer" | "diamond" | "rightArrow";

export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [draw, setDraw] = useState<Draw>();
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");

  useEffect(() => {
    draw?.setTool(selectedTool);
  }, [selectedTool, draw]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Draw(canvasRef.current, roomId, socket);
      setDraw(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div>
        
      <div className="flex flex-wrap absolute top-3 bg-[#222328] rounded-lg left-[40%]">
        
         {/* <IconButton
          onClick={() => {
            return setSelectedTool("hand");
          }}
          activated={selectedTool === "hand"}
          icon={<Hand size={14} />}
        /> */}

        {/* <IconButton
          onClick={() => {
            return setSelectedTool("pointer");
          }}
          activated={selectedTool === "pointer"}
          icon={<LucideMousePointer size={16} />}
        /> */}
        <IconButton
          onClick={() => {
            return setSelectedTool("pencil");
          }}
          activated={selectedTool === "pencil"}
          icon={<Pen size={16} />}
        />
        <IconButton
          onClick={() => {
            setSelectedTool("rect");
          }}
          activated={selectedTool === "rect"}
          icon={ <Square size={16} /> }
        />

        {/* <IconButton
          onClick={() => {
            setSelectedTool("diamond");
          }}
          activated={selectedTool === "diamond"}
          icon={<LucideDiamond size={16} />}
        /> */}
        <IconButton
          onClick={() => {
            setSelectedTool("circle");
          }}
          activated={selectedTool === "circle"}
          icon={<Circle size={16} />}
        />

        <IconButton
          onClick={() => {
            setSelectedTool("line");
          }}
          activated={selectedTool === "line"}
          icon={<LucideArrowRight size={16} />}
        />
      </div>

    </div>
  );
}
