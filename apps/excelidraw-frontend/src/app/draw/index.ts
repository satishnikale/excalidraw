import axios from "axios";
import { HTTP_BACKEND } from "../config";
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
    };

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data); 

    if(message.type === "chat"){
      const parsedShape = JSON.parse(message.message);
      existingShapes?.push(parsedShape.shape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  }

  const scale = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * scale;
  canvas.height = canvas.offsetHeight * scale;
  ctx.scale(scale, scale);

  let existingShapes: Shape[] = await getExistingShapes(roomId);
  console.log("my Exsisiting shapes", existingShapes)

  let clicked = false;
  let startX = 0;
  let startY = 0;

  clearCanvas(existingShapes, canvas, ctx);

  function getMousePos(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    const pos = getMousePos(e);
    startX = pos.x;
    startY = pos.y;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const pos = getMousePos(e);
    const width = pos.x - startX;
    const height = pos.y - startY;

    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      height,
      width,
    }

    existingShapes?.push(shape);

    socket.send(JSON.stringify({
      type: "chat",
      messsage: JSON.stringify({
        shape
      }),
      roomId
    }));

    canvas.addEventListener("mousemove", (e) => {
      if (clicked) {
        const pos = getMousePos(e);
        const width = pos.x - startX;
        const height = pos.y - startY;

        clearCanvas(existingShapes, canvas, ctx);
        ctx.strokeStyle = "rgba(255, 255, 255)";
        ctx.strokeRect(startX, startY, width, height);
      }
    });
  });

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes?.map((shape) => {
    if (shape.type == "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId: string) {
  const response = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = response.data.message;

  const shapes = messages?.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shape;
  });
  return shapes;
}
}
