// import axios from "axios";
// import { HTTP_BACKEND } from "../config";
// type Shape =
//   | {
//       type: "rect";
//       x: number;
//       y: number;
//       width: number;
//       height: number;
//     }
//   | {
//       type: "circle";
//       centerX: number;
//       centerY: number;
//       radius: number;
//     }
//   | {
//       type: "pencil";
//       startX: number;
//       startY: number;
//       endX: number;
//       endY: number;
//     }
//   | {
//       type: "line";
//       startX: number;
//       startY: number;
//       endX: number;
//       endY: number;
//     };

// export async function initDraw(
//   canvas: HTMLCanvasElement,
//   roomId: string,
//   socket: WebSocket
// ) {
//   const ctx = canvas.getContext("2d");
//   if (!ctx) return;

//   socket.onmessage = (event) => {
//     const message = JSON.parse(event.data);

//     if (message.type === "chat") {
//       const parsedShape = JSON.parse(message.message);
//       existingShapes?.push(parsedShape.shape);
//       clearCanvas(existingShapes, canvas, ctx);
//     }
//   };

//   const scale = window.devicePixelRatio || 1;
//   canvas.width = canvas.offsetWidth * scale;
//   canvas.height = canvas.offsetHeight * scale;
//   ctx.scale(scale, scale);

//   let existingShapes: Shape[] = await getExistingShapes(roomId);

//   clearCanvas(existingShapes, canvas, ctx);
//   let clicked = false;
//   let startX = 0;
//   let startY = 0;

//   canvas.addEventListener("mousedown", (e) => {
//     clicked = true;
//     startX = e.clientX;
//     startY = e.clientY;
//   });

//   canvas.addEventListener("mouseup", (e) => {
//     clicked = false;
//     const width = e.clientX - startX;
//     const height = e.clientY - startY;

//     // @ts-ignore
//     const selectedTool = window.selectedTool;
//     let shape: Shape | null = null;

//     if (selectedTool === "rect") {
//       shape = {
//         type: "rect",
//         x: startX,
//         y: startY,
//         height,
//         width,
//       };
//     } else if (selectedTool === "circle") {
//       const radius = Math.max(width, height) / 2;
//       shape = {
//         type: "circle",
//         radius: radius,
//         centerX: startX + radius,
//         centerY: startY + radius,
//       };
//     } else if (selectedTool === "line") {
//       shape = {
//         type: "line",
//         startX: startX,
//         startY: startY,
//         endX: width,
//         endY: height,
//       };
//     }
//     if (!shape) {
//       return;
//     }

//     existingShapes.push(shape);

//     socket.send(
//       JSON.stringify({
//         type: "chat",
//         message: JSON.stringify({
//           shape,
//         }),
//         roomId,
//       })
//     );
//   });

//   canvas.addEventListener("mousemove", (e) => {
//     if (clicked) {
//       const width = e.clientX - startX;
//       const height = e.clientY - startY;

//       clearCanvas(existingShapes, canvas, ctx);
//       ctx.strokeStyle = "rgba(255, 255, 255)";

//       // @ts-ignore
//       const selectedTool = window.selectedTool;

//       if (selectedTool === "rect") {
//         ctx.strokeRect(startX, startY, width, height);
//       } else if (selectedTool === "circle") {
//         const radius = Math.max(width, height) / 2;
//         const centerX = startX + radius;
//         const centerY = startY + radius;
//         ctx.beginPath();
//         ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
//         ctx.stroke();
//         ctx.closePath();
//       } else if (selectedTool === "line") {
//         // here is code for drawing line.
//         ctx.beginPath();
//         ctx.moveTo(startX, startY);
//         ctx.lineTo(width, height);
//         ctx.stroke();
//       }
//     }
//   });
// }

// function clearCanvas(
//   existingShapes: Shape[],
//   canvas: HTMLCanvasElement,
//   ctx: CanvasRenderingContext2D
// ) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = "rgba(0, 0, 0)";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   existingShapes?.map((shape) => {
//     if (shape.type === "rect") {
//       ctx.strokeStyle = "rgba(255, 255, 255)";
//       ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
//     } else if (shape.type === "circle") {
//       ctx.beginPath();
//       ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
//       ctx.stroke();
//       ctx.closePath();
//     } else if (shape.type === "line") {
//       // code for drawing line.
//       ctx.beginPath();
//       ctx.moveTo(shape.startX, shape.startY);
//       ctx.lineTo(shape.endX, shape.endY);
//       ctx.stroke();
//     }
//   });
// }

// async function getExistingShapes(roomId: string) {
//   const response = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
//   const messages = response.data.message.shape;

//   const shapes = messages?.map((x: { message: string }) => {
//     const messageData = JSON.parse(x.message);
//     return messageData.shape;
//   });
//   return shapes;
// }
