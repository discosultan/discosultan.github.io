import { Process } from "../process-manager";
import { Shape } from "../shape";
import { Vec2 } from "../math";

export class ContourTrail extends Process {
    phase = 0;
    hoverShapes: Shape[] = [];

    // Temp vectors for calc results.
    pa = Vec2.newZero();
    pb = Vec2.newZero();

    init() {
        const numShapes = this.numShapes || 10;
        for (let i = 0; i < numShapes; i++) {
            const p = this.shape.points[0];
            const p1 = p.clone(), p2 = p.clone();
            this.hoverShapes.push(new Shape([p1, Vec2.add(p2, p2, Vec2.one)], {
                translation: this.shape.translation,
                strokeStyle: this.shape.strokeStyle,
                lineWidth: this.minLineWidth + (this.maxLineWidth - this.minLineWidth) * i / numShapes
            }));
        }
        this.manager.shapes.push(...this.hoverShapes);
        this.duration = this.duration / this.shape.points.length;
        this.endless = true;
    }

    step(dt: number) {
        this.elapsed += dt;
        const { hoverShapes, progress } = this;
        const { points } = this.shape;

        for (let i = 0; i < hoverShapes.length - 1; i++) {
            const dst = hoverShapes[i], src = hoverShapes[i + 1];
            dst.points[0].x = src.points[0].x;
            dst.points[0].y = src.points[0].y;
            dst.points[1].x = src.points[1].x;
            dst.points[1].y = src.points[1].y;
        }
        const last = hoverShapes[hoverShapes.length - 1];
        const from = points[this.phase], to = points[(this.phase + 1) % points.length];
        Vec2.lerp(last.points[0], from, to, progress);
        Vec2.lerp(
            last.points[1],
            Vec2.add(this.pa, from, Vec2.one),
            Vec2.add(this.pb, to, Vec2.one),
            progress);
        if (progress === 1) nextPhase(this, points.length);

        for (const hoverShape of this.hoverShapes) hoverShape.setDirty();
    }

    resolve() {
        super.resolve();
        const { shapes } = this.manager;
        for (const hoverShape of this.hoverShapes) {
            shapes.splice(shapes.indexOf(hoverShape), 1);
        }
    }
}

function nextPhase(process: Process, maxPhases: number) {
    process.phase = (process.phase + 1) % maxPhases;
    process.elapsed = 0;
}
