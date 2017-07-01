import { Vec2 } from "../math";
import { Shape } from "../shape";
import { Process } from "../process-manager";

export class Wait extends Process {
    step(dt: number) {
        super.step(dt);
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