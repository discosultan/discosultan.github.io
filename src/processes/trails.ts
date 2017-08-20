import { Process } from "../process-manager";
import { Shape } from "../shape";
import { Vec2 } from "../math";

export class ContourTrail extends Process {
    phase = 0;
    hoverShapes: Shape[] = [];

    init() {
        const numShapes = 10;
        for (let i = 0; i < numShapes; i++) {
            this.hoverShapes.push(new Shape([this.shape.points[0]], {
                translation: this.shape.translation,
                strokeStyle: this.shape.strokeStyle,
                lineWidth: this.minLineWidth + (this.maxLineWidth - this.minLineWidth)*i/numShapes
            }));
        }
        this.manager.shapes.push(...this.hoverShapes);
        this.duration = this.duration/this.shape.points.length;
        this.endless = true;
    }

    step(dt: number) {
        this.elapsed += dt;
        const points = this.shape.points,
              hoverShapes = this.hoverShapes,
              progress = this.progress;

        for (let i = 0; i < hoverShapes.length - 1; i++) {
            hoverShapes[i].points[0] = hoverShapes[i + 1].points[0];
        }
        hoverShapes[hoverShapes.length - 1].points[0] = Vec2.lerp(
            points[this.phase],
            points[(this.phase + 1)%points.length],
            progress);
        if (progress === 1) nextPhase(this, points.length);

        for (let hoverShape of this.hoverShapes) hoverShape.setDirty();
    }

    resolve() {
        super.resolve();
        const shapes = this.manager.shapes;
        for (let hoverShape of this.hoverShapes) {
            shapes.splice(shapes.indexOf(hoverShape), 1);
        }
    }
}

function nextPhase(process: Process, maxPhases: number) {
    process.phase = (process.phase + 1)%maxPhases;
    process.elapsed = 0;
}