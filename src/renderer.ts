import { Shape, Type } from "./shape";

declare global {
    interface HTMLCanvasElement {
        translationX: number;
        translationY: number;
    }
}

export class Renderer {
    readonly ctx: CanvasRenderingContext2D;

    constructor(public readonly canvas: HTMLCanvasElement, public readonly shapes: Shape[],
        public readonly translationFactorX = 0.5, public readonly translationFactorY = 0.5) {
        this.ctx = canvas.getContext("2d")!;
    }

    step(dt: number) {
        const { canvas, ctx } = this;
        this.ensureCanvasValid(canvas, ctx);
        ctx.clearRect(-canvas.translationX, -canvas.translationY, canvas.width, canvas.height);
        this.renderShapes(ctx, this.shapes);
    }

    renderShapes(ctx: CanvasRenderingContext2D, shapes: Shape[]) {
        for (let shape of shapes) {
            const points = shape.worldPoints;
            if (points.length === 0) continue;

            // Setup path.
            ctx.beginPath();
            let p = points[points.length - 1];
            ctx.moveTo(p.x, p.y);
            for (p of points) ctx.lineTo(p.x, p.y);

            // Render.
            switch (shape.type) {
                // case Type.pattern: {
                //     ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                //     ctx.save();
                //     const { x, y } = shape.worldBoundingRect;
                //     ctx.translate(x, y);
                //     ctx.fill();
                //     ctx.restore();
                //     break;
                // }
                case Type.image: {
                    const img = shape.image;
                    const { x, y, width, height } = shape.worldBoundingRect;
                    console.log(shape.worldBoundingRect);
                    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, width, height);
                    break;
                }
                case Type.fill: {
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    ctx.fill();
                    break;
                }
                case Type.stroke: {
                    ctx.strokeStyle = this.styleOrDefault(shape.strokeStyle);
                    ctx.lineWidth = this.lineWidthOrDefault(shape);
                    ctx.stroke();
                    break;
                }
                case Type.text: {
                    ctx.font = this.fontOrDefault(shape);
                    ctx.textAlign = this.textAlignOrDefault(shape);
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    const { x, y, height } = shape.worldBoundingRect;
                    ctx.fillText(shape.text, x, y + height*0.5);
                    break;
                }
            }

            // Render children.
            // Child shapes are always clipped to their parents.
            if (shape.children.length > 0) {
                ctx.save();
                ctx.clip();
                this.renderShapes(ctx, shape.children);
                ctx.restore();
            }
        }
    }

    styleOrDefault(style: string | CanvasPattern) { return style || "#EA2E49"; }
    fontOrDefault(shape: Shape) { return `${shape.worldBoundingRect.height}px ${shape.font || "Arial"}`; }
    textAlignOrDefault(shape: Shape) { return shape.textAlign || "start"; }
    lineWidthOrDefault(shape: Shape) { return shape.lineWidth || 8 };

    ensureCanvasValid(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (canvas.clientWidth !== canvas.width || canvas.clientHeight !== canvas.height) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            canvas.translationX = canvas.width*this.translationFactorX;
            canvas.translationY = canvas.height*this.translationFactorY;

            ctx.translate(canvas.translationX, canvas.translationY);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        }
    }
}