export const drawPencil = (ctx: CanvasRenderingContext2D, shape: any) => {
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  shape.points.forEach((point: { x: number; y: number; }, index: number) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();
};
