import { Tool } from "../components/Canvas";
import { getExistingShapes } from "./http";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { drawLine } from "./Line";
import { drawArrow } from "./Arrow";
import { drawPencil } from "./pencil";

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
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
    };

export class Draw {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean = false;
  private startX = 0;
  private startY = 0;
  private selectedTool: Tool = "circle";
  private pencilPoints: { x: number; y: number }[] = [];
  private isDrawingPencil = false;

  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.removeEventListener("touchstart", this.touchStartHandler);
    this.canvas.removeEventListener("touchmove", this.touchMoveHandler);
    this.canvas.removeEventListener("touchend", this.touchEndHandler);
  }

  setTool(tool: Tool) {
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
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(19,18,19,255)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.forEach((shape) => {
      if (shape.type === "rect") {
        drawRectangle(this.ctx, shape);
      } else if (shape.type === "circle") {
        drawCircle(this.ctx, shape);
      } else if (shape.type === "line") {
        drawLine(this.ctx, shape);
      } else if (shape.type === "arrow") {
        drawArrow(this.ctx, shape);
      } else if (shape.type === "pencil") {
        drawPencil(this.ctx, shape);
      }
    });
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;

    if (this.selectedTool === "pencil") {
      this.isDrawingPencil = true;
      this.pencilPoints = [{ x: this.startX, y: this.startY }];
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    if (!this.clicked) return;
    this.clicked = false;

    let shape: Shape | null = null;
    const endX = e.clientX;
    const endY = e.clientY;
    const width = endX - this.startX;
    const height = endY - this.startY;

    if (this.selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    } else if (this.selectedTool === "circle") {
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      shape = {
        type: "circle",
        centerX: this.startX + radius,
        centerY: this.startY + radius,
        radius,
      };
    } else if (this.selectedTool === "line") {
      shape = {
        type: "line",
        startX: this.startX,
        startY: this.startY,
        endX,
        endY,
      };
    } else if (this.selectedTool === "arrow") {
      shape = {
        type: "arrow",
        startX: this.startX,
        startY: this.startY,
        endX,
        endY,
      };
    } else if (this.selectedTool === "pencil") {
      shape = {
        type: "pencil",
        points: [...this.pencilPoints],
      };
      this.isDrawingPencil = false;
      this.ctx.closePath();
    }

    if (shape) {
      this.existingShapes.push(shape);
      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: this.roomId,
        })
      );
    }
    this.clearCanvas();
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (!this.clicked) return;

    if (this.selectedTool === "pencil" && this.isDrawingPencil) {
      const x = e.clientX;
      const y = e.clientY;
      this.pencilPoints.push({ x, y });

      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    } else {
      this.clearCanvas();
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;

      this.ctx.strokeStyle = "#ffffff";

      if (this.selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (this.selectedTool === "circle") {
        const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
      } else if (this.selectedTool === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
      } else if (this.selectedTool === "arrow") {
        const angle = Math.atan2(e.clientY - this.startY, e.clientX - this.startX);
        const headLength = 20;

        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();

        // Left arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX, e.clientY);
        this.ctx.lineTo(
          e.clientX - headLength * Math.cos(angle - Math.PI / 6),
          e.clientY - headLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.stroke();

        // Right arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX, e.clientY);
        this.ctx.lineTo(
          e.clientX - headLength * Math.cos(angle + Math.PI / 6),
          e.clientY - headLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.stroke();
      }
    }
  };

  touchStartHandler = (e: TouchEvent) => {
    const touch = e.touches[0];
    const x = touch.clientX - this.canvas.offsetLeft;
    const y = touch.clientY - this.canvas.offsetTop;
    this.mouseDownHandler({ clientX: x, clientY: y } as MouseEvent);
  };

  touchMoveHandler = (e: TouchEvent) => {
    const touch = e.touches[0];
    const x = touch.clientX - this.canvas.offsetLeft;
    const y = touch.clientY - this.canvas.offsetTop;
    this.mouseMoveHandler({ clientX: x, clientY: y } as MouseEvent);
  };

  touchEndHandler = () => {
    this.mouseUpHandler({ clientX: this.startX, clientY: this.startY } as MouseEvent);
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);

    this.canvas.addEventListener("touchstart", this.touchStartHandler);
    this.canvas.addEventListener("touchmove", this.touchMoveHandler);
    this.canvas.addEventListener("touchend", this.touchEndHandler);
  }
}
