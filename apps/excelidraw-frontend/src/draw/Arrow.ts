export const drawArrow = (ctx: CanvasRenderingContext2D, shape: any) => {
  // Calculate the angle of the line
  const angle = Math.atan2(
    shape.endY - shape.startY,
    shape.endX - shape.startX
  );
  ctx.beginPath();
  ctx.moveTo(shape.startX, shape.startY);
  ctx.lineTo(shape.endX, shape.endY);
  ctx.stroke();

  // Arrowhead lines
  const headLength = 20;

  // Left side
  ctx.beginPath();
  ctx.moveTo(shape.endX, shape.endY);
  ctx.lineTo(
    shape.endX - headLength * Math.cos(angle - Math.PI / 6),
    shape.endY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.stroke();

  // Right side
  ctx.beginPath();
  ctx.moveTo(shape.endX, shape.endY);
  ctx.lineTo(
    shape.endX - headLength * Math.cos(angle + Math.PI / 6),
    shape.endY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
  ctx.fillStyle = "white";
};
