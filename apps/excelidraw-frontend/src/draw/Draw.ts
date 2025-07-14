import { Tool } from "../components/Canvas";
import { getExistingShapes } from "./http";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { drawLine } from "./Line";
import { drawArrow } from "./Arrow";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "arrow";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

export class Draw {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private selectedTool: Tool = "circle";

  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: "circle" | "pencil" | "rect" | "line" | "arrow") {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type == "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes?.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes?.map((shape) => {
      // Draw rectangle
      if (shape.type === "rect") {
        drawRectangle(this.ctx, shape);
      }
      // Draw circle
      else if (shape.type === "circle") {
        drawCircle(this.ctx, shape);
      }
      // Draw line
      else if (shape.type === "line") {
        // Draw line
        drawLine(this.ctx, shape);
      } else if (shape.type === "arrow") {
        // here is code for drawing line...
        drawArrow(this.ctx, shape);
      }
    });
  }

  mouseDownHandler = (e: { clientX: number; clientY: number }) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };
  mouseUpHandler = (e: { clientX: number; clientY: number }) => {
    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    const selectedTool = this.selectedTool;

    let shape: Shape | null = null;

    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    } else if (selectedTool === "line") {
      shape = {
        type: "line",
        startX: this.startX,
        startY: this.startY,
        endX: e.clientX,
        endY: e.clientY,
      };
    } else if (selectedTool === "arrow") {
      shape = {
        type: "arrow",
        startX: this.startX,
        startY: this.startY,
        endX: e.clientX,
        endY: e.clientY,
      };
    }
    if (!shape) {
      return;
    }
    this.existingShapes?.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      })
    );
  };
  mouseMoveHandler = (e: { clientX: number; clientY: number }) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;

      this.clearCanvas();

      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      const selectedTool = this.selectedTool;

      console.log(selectedTool);

      if (selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (selectedTool === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (selectedTool === "arrow") {
        // const angle = Math.atan2(
        //   e.clientY - this.startY,
        //   e.clientX - this.startX
        // );
        // this.ctx.beginPath();
        // this.ctx.moveTo(this.startX, this.startY);
        // this.ctx.lineTo(e.clientX, e.clientY);
        // this.ctx.stroke();

        // // this.ctx.closePath();
        // // Draw the arrowhead
        // this.ctx.beginPath();
        // this.ctx.moveTo(e.clientX, e.clientY);
        // this.ctx.lineTo(
        //   e.clientX - 20 * Math.cos(angle - Math.PI / 6),
        //   e.clientY - 20 * Math.sin(angle - Math.PI / 6)
        // );
        // this.ctx.lineTo(
        //   e.clientX - 20 * Math.cos(angle + Math.PI / 6),
        //   e.clientY - 20 * Math.sin(angle + Math.PI / 6)
        // );
        // this.ctx.closePath();
        // this.ctx.fillStyle = "white"; // Or any desired color
        // this.ctx.fill();

        const angle = Math.atan2(
          e.clientY - this.startY,
          e.clientX - this.startX
        );

        // Draw the main line
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();

        // Arrowhead lines
        const headLength = 20;

        // Left side
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX, e.clientY);
        this.ctx.lineTo(
          e.clientX - headLength * Math.cos(angle - Math.PI / 6),
          e.clientY - headLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.stroke();

        // Right side
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX, e.clientY);
        this.ctx.lineTo(
          e.clientX - headLength * Math.cos(angle + Math.PI / 6),
          e.clientY - headLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.stroke();
        this.ctx.fillStyle = "white";
      }
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
