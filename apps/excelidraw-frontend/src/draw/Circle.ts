export const drawCircle = (ctx: CanvasRenderingContext2D, shape:any) => {
ctx.beginPath();
    ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
    ctx.stroke();
    ctx.closePath();
}