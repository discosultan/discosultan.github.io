import { Easing } from './math';
import { Shape } from './shape';

export enum Status { 'pending', 'fulfilled', 'rejected' };

export class Process {
    endless: boolean;
    duration: number;
    easingFn: (t: number) => number;

    readonly _children: Process[] = [];
    elapsed = 0;
    status = Status.pending;
    manager: ProcessManager | null = null;
    [key: string]: any;

    constructor(config: any = {}) {
        this.duration = config.duration ?? 1000;
        this.endless = config.endless ?? false;
        this.easingFn = config.easingFn ?? Easing.linear;
    }

    get progress() { return this.easingFn(Math.min(this.elapsed / this.duration, 1)); }

    init() { }

    push(...args: Process[]) {
        this._children.push(...args);
        return this;
    }

    resolve() { this.status = Status.fulfilled; }
    reject() { this.status = Status.rejected; }

    step(dt: number) {
        this.elapsed += dt;
        if (this.progress === 1) this.resolve();
    }
}

export class ProcessManager {
    readonly processes: Process[] = [];
    timeScale = 1

    constructor(public readonly canvas: HTMLCanvasElement, public readonly shapes: Shape[]) { }

    get resolvableProcesses() { return this.processes.filter(proc => !proc.endless); }

    push(...args: Process[]) {
        for (const arg of args) {
            arg.manager = this;
            arg.init();
            this.processes.push(arg);
        }
        return this;
    }

    step(dt: number) {
        for (let i = this.processes.length - 1; i >= 0; i--) {
            const process = this.processes[i];
            process.step(dt * this.timeScale);
            if (process.status === Status.fulfilled) {
                this.processes.splice(i, 1);
                this.push(...process._children);
            }
        }
    }

    resolveAll() {
        while (this.resolvableProcesses.length > 0) {
            this.step(100000); // Some arbitrary large number.
        }
    }
}
