
export const drawRectangle = (ctx: CanvasRenderingContext2D, shape: any) => {
  ctx.strokeStyle = "rgba(255, 255, 255)";
  ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
};
