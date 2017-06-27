import { Vec2 } from "./math";
import { Shape } from "./shape";
import { Process, Config } from "./process-manager";

export class Wait extends Process {
    step(dt: number) {
        super.step(dt);
    }
}

export class WaitProgress extends Process {
    step(dt: number) {
        super.step(dt);
        if (this.progress >= this.target) this.resolve();
    }
}

export class WaitAllProcesses extends Process {
    step(dt: number) {
        if (this.manager.resolvableProcesses.length <= 1) this.resolve();
    }
}

export class Translate extends Process {
    step(dt: number) {
        super.step(dt);
        const translation = Vec2.lerp(Vec2.zero, this.target, this.progress);
        this.shape.translation = translation;
    }
}

export class Rotate extends Process {
    step(dt: number) {
        super.step(dt);
        const rotation = this.progress*this.target;
        this.shape.rotation = rotation;
    }
}

export class AddShape extends Process {
    step(dt: number) {
        this.manager.shapes.push(this.shape);
        this.resolve();
    }
}

export class GenerateRect extends Process {
    init() {
        this.x = this.x || 0, this.y = this.y || 0;
        this.target = Shape.rect(this.x, this.y, this.width, this.height);
        addPoints(this.shape, 4, this.x, this.y);
        this.shape.points[2] = this.target.points[3];
        this.shape.points[3] = this.target.points[3];
    }

    step(dt: number) {
        super.step(dt);
        const points = this.shape.points,
              targetPoints = this.target.points,
              progress = this.progress;
        points[1] = Vec2.lerp(targetPoints[0], targetPoints[1], progress);
        points[2] = Vec2.lerp(targetPoints[3], targetPoints[2], progress);
        this.shape.setDirty();
    }
}

export class GenerateRectDiagonally extends Process {
    phase = 0;

    init() {
        this.x = this.x || 0, this.y = this.y || 0;
        this.target = Shape.rect(this.x, this.y, this.width, this.height);
        this.duration = this.duration/2; // 2 phases for full generation.
        addPoints(this.shape, 5, this.x, this.y);
    }

    step(dt: number) {
        this.elapsed += dt;
        const points = this.shape.points,
              targetPoints = this.target.points,
              progress = this.progress;
        if (this.phase === 0) {
            points[0] = Vec2.lerp(targetPoints[0], targetPoints[1], progress);
            points[1] = Vec2.lerp(targetPoints[0], targetPoints[1], progress);
            points[3] = Vec2.lerp(targetPoints[0], targetPoints[3], progress);
            points[4] = Vec2.lerp(targetPoints[0], targetPoints[3], progress);
            if (progress === 1) nextPhase(this);
        } else if (this.phase === 1) {
            points[0] = Vec2.lerp(targetPoints[1], targetPoints[2], progress);
            points[4] = Vec2.lerp(targetPoints[3], targetPoints[2], progress);
            if (progress === 1) {
                points.length = 4;
                this.resolve();
            }
        }
        this.shape.setDirty();
    }
}

export class GenerateHex extends Process {
    phase = 0;

    init() {
        this.x = this.x || 0, this.y = this.y || 0;
        this.target = Shape.hex(this.x, this.y, this.diameter);
        this.duration = this.duration/3; // 3 phases for full generation.
        addPoints(this.shape, 6, this.x, this.y);
    }

    step(dt: number) {
        this.elapsed += dt;
        const points = this.shape.points,
              targetPoints = this.target.points,
              progress = this.progress;
        if (this.phase === 0) {
            points[0] = Vec2.lerp(Vec2.zero, targetPoints[2], progress);
            points[1] = Vec2.lerp(Vec2.zero, targetPoints[2], progress);
            points[2] = Vec2.lerp(Vec2.zero, targetPoints[2], progress);
            points[3] = Vec2.lerp(Vec2.zero, targetPoints[5], progress);
            points[4] = Vec2.lerp(Vec2.zero, targetPoints[5], progress);
            points[5] = Vec2.lerp(Vec2.zero, targetPoints[5], progress);
            if (progress === 1) nextPhase(this);
        } else if (this.phase === 1) {
            points[1] = Vec2.lerp(targetPoints[2], targetPoints[3], progress);
            points[2] = Vec2.lerp(targetPoints[2], targetPoints[3], progress);
            points[4] = Vec2.lerp(targetPoints[5], targetPoints[0], progress);
            points[5] = Vec2.lerp(targetPoints[5], targetPoints[0], progress);
            if (progress === 1) nextPhase(this);
        } else if (this.phase === 2) {
            points[2] = Vec2.lerp(targetPoints[3], targetPoints[4], progress);
            points[5] = Vec2.lerp(targetPoints[0], targetPoints[1], progress);
            if (progress === 1) this.resolve();
        }
        this.shape.setDirty();
    }
}

export class HoverEffect extends Process {
    phase = 0;
    hoverShapes: Shape[] = [];

    init() {
        this.x = this.x || 0, this.y = this.y || 0;
        this.shapes = this.manager.shapes;
        this.target = Shape.hex(this.x, this.y, this.diameter);

        const numShapes = 10;
        for (let i = 0; i < numShapes; i++) {
            this.hoverShapes.push(new Shape([this.target.points[0]], {
                translation: this.shape.translation,
                strokeStyle: this.color,
                lineWidth: this.minLineWidth + (this.maxLineWidth - this.minLineWidth)*i/numShapes
            }));
        }
        this.shapes.push(...this.hoverShapes);
        this.duration = this.duration/6; // 6 phases.
        this.endless = true;
    }

    step(dt: number) {
        this.elapsed += dt;
        const targetPoints = this.target.points,
              hoverShapes = this.hoverShapes,
              progress = this.progress;

        for (let i = 0; i < hoverShapes.length - 1; i++) {
            hoverShapes[i].points[0] = hoverShapes[i + 1].points[0];
        }
        hoverShapes[hoverShapes.length - 1].points[0] = Vec2.lerp(targetPoints[this.phase], targetPoints[(this.phase + 1)%6], progress);
        if (progress === 1) nextPhase(this, 6);

        for (let hoverShape of this.hoverShapes) hoverShape.setDirty();
    }

    resolve() {
        super.resolve();
        for (let hoverShape of this.hoverShapes) {
            this.shapes.splice(this.shapes.indexOf(hoverShape), 1);
        }
    }
}

function addPoints(shape: Shape, count: number, x = 0, y = 0) {
    const points = (<undefined[]>Array.apply(null, { length: count })).map(_ => new Vec2(x, y));
    shape.points.push(...points);
    shape.setDirty();
}

function nextPhase(process: Process, maxPhases?: number) {
    if (maxPhases) process.phase = (process.phase + 1)%maxPhases; else process.phase++;
    process.elapsed = 0;
}