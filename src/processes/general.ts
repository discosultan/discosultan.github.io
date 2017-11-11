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
        Vec2.lerp(this.shape.translation, Vec2.zero, this.target, this.progress);
        this.shape.setDirty();
    }
}

export class Rotate extends Process {
    step(dt: number) {
        super.step(dt);
        this.shape.rotation = this.progress*this.target;
        this.shape.setDirty();
    }
}

export class Execute extends Process {
    step(dt: number) {
        this.command();
        this.resolve();
    }
}