"use client";

import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, HamburgerIcon, Hand, LucideArrowRight, LucideDiamond, LucideMinus, LucideMousePointer, LucideType, Pen, Pencil, Square } from "lucide-react";
import { Draw } from "../draw/Draw";

export type Tool = "circle" | "rect" | "pencil" | "line" | "arrow" | "select" | "text"; // | "hand" | "pointer" | "diamond" | "rightArrow";

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
      const d = new Draw(canvasRef.current, roomId, socket);
      setDraw(d);

      return () => {
        d.destroy();
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
      <HambergerToogleMenu />
    </div>
  );
}

function HambergerToogleMenu(){
  return(
    <>
      <button>
        <HamburgerIcon />
      </button>
    </>
  )
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
        <IconButton
          onClick={() => {
            return setSelectedTool("text");
          }}
          activated={selectedTool === "text"}
          icon={<LucideType size={16} />}
        />

        <IconButton
          onClick={() => {
            return setSelectedTool("select");
          }}
          activated={selectedTool === "select"}
          icon={<LucideMousePointer size={16} />}
        />
        <IconButton
          onClick={() => {
            return setSelectedTool("pencil");
          }}
          activated={selectedTool === "pencil"}
          icon={<Pen size={14} />}
        />
        <IconButton
          onClick={() => {
            setSelectedTool("rect");
          }}
          activated={selectedTool === "rect"}
          icon={<Square size={14} />}
        />

        <IconButton
          onClick={() => {
            setSelectedTool("arrow");
          }}
          activated={selectedTool === "arrow"}
          icon={<LucideArrowRight size={14} />}
        />
        <IconButton
          onClick={() => {
            setSelectedTool("circle");
          }}
          activated={selectedTool === "circle"}
          icon={<Circle size={14} />}
        />

        <IconButton
          onClick={() => {
            setSelectedTool("line");
          }}
          activated={selectedTool === "line"}
          icon={<LucideMinus size={14} />}
        />
      </div>

    </div>
  );
}
