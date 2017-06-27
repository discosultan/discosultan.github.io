import { Shape } from "./shape";

export class Renderer {
    readonly ctx: CanvasRenderingContext2D;

    constructor(public readonly canvas: HTMLCanvasElement, public readonly shapes: Shape[],
        public readonly translationFactorX = 0.5, public readonly translationFactorY = 0.5) {
        this.ctx = canvas.getContext("2d")!;
    }

    step(dt: number) {
        const canvas = this.canvas, ctx = this.ctx;
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
                case "pattern":
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    ctx.save();
                    const bounds = shape.worldBoundingRect;
                    ctx.translate(bounds.x, bounds.y);
                    ctx.fill();
                    ctx.restore();
                    break;
                case "fill":
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    ctx.fill();
                    break;
                case "stroke":
                    ctx.strokeStyle = this.styleOrDefault(shape.strokeStyle);
                    ctx.lineWidth = this.lineWidthOrDefault(shape);
                    ctx.stroke();
                    break;
                case "text":
                    ctx.font = this.fontOrDefault(shape);
                    ctx.textAlign = this.textAlignOrDefault(shape);
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    const translation = shape.absTranslation;
                    ctx.fillText(shape.text, translation.x, translation.y + shape.worldBoundingRect.height/2);
                    break;
            }

            // Render children.
            // Child shapes are always clipped to their parents.
            if (shape._children.length > 0) {
                ctx.save();
                ctx.clip();
                this.renderShapes(ctx, shape._children);
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

declare global {
    interface HTMLCanvasElement {
        translationX: number;
        translationY: number;
    }
}