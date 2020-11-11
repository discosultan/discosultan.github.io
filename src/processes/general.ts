import { Vec2 } from '../math';
import { Process } from '../process-manager';
import { Shape } from '../shape';

export class Wait extends Process {
    step(dt: number) {
        super.step(dt);
    }
}

export class WaitAllProcesses extends Process {
    step(dt: number) {
        if (this.manager === null || this.manager.resolvableProcesses.length <= 1) this.resolve();
    }
}

export class Translate extends Process {
    shape: Shape;
    target: Vec2;

    constructor(config: any) {
        super(config);
        this.shape = config.shape;
        this.target = config.target;
    }

    step(dt: number) {
        super.step(dt);
        Vec2.lerp(this.shape.translation, Vec2.zero, this.target, this.progress);
        this.shape.setDirty();
    }
}

export class Rotate extends Process {
    shape: Shape;
    target: number;

    constructor(config: any) {
        super(config);
        this.shape = config.shape;
        this.target = config.target;
    }

    step(dt: number) {
        super.step(dt);
        this.shape.rotation = this.progress * this.target;
        this.shape.setDirty();
    }
}

export class Execute extends Process {
    command: () => void;

    constructor(config: any) {
        super(config);
        this.command = config.command;
    }

    step(dt: number) {
        this.command();
        this.resolve();
    }
}
