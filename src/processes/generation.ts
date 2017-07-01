import { Process } from "../process-manager";
import { Shape } from "../shape";
import { Vec2 } from "../math";

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

function addPoints(shape: Shape, count: number, x = 0, y = 0) {
    const points = (<undefined[]>Array.apply(null, { length: count })).map(_ => new Vec2(x, y));
    shape.points.push(...points);
    shape.setDirty();
}

function nextPhase(process: Process) {
    process.phase++;
    process.elapsed = 0;
}