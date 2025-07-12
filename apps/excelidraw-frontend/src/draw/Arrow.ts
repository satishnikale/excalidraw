export const drawArrow = (ctx: CanvasRenderingContext2D, shape: any) => {
  ctx.beginPath();
  ctx.moveTo(shape.startX, shape.startY);
  ctx.lineTo(shape.endX, shape.endY);
  ctx.stroke();
  ctx.closePath();
};
