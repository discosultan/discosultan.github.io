import { Process } from "../process-manager";
import { ContourTrail } from "./trails";

export class ResolveProcessesOnEsc extends Process {
    init() {
        window.addEventListener("keydown", this.onKeyDown);
        this.endless = true;
    }

    step(dt: number) { }

    resolve() {
        super.resolve();
        window.removeEventListener("keydown", this.onKeyDown);
    }

    onKeyDown = (e: KeyboardEvent) => {
        // Resolve all pending processes on ESC key.
        if (e.keyCode === 27) this.manager.resolveAll();
    }
}

export class Navigation extends Process {
    hoverEffect: ContourTrail | null = null;

    init() {
        const { canvas } = this.manager;
        canvas.addEventListener("mousemove", this.onMouseMove);
        canvas.addEventListener("click", this.onClick);
        this.endless = true;
    }

    step(dt: Number) { }

    resolve() {
        super.resolve();
        const { canvas } = this.manager;
        canvas.removeEventListener("click", this.onClick);
        canvas.removeEventListener("mousemove", this.onMouseMove);
    }

    onMouseMove = (e: MouseEvent) => {
        const { canvas } = this.manager;
        const x = e.pageX - canvas.offsetLeft - canvas.translationX;
        const y = e.pageY - canvas.offsetTop  - canvas.translationY;
        let containingShape = null;
        for (let shape of this.shapes) {
            if (shape.worldContains(x, y)) {
                containingShape = shape;
                break; // Since there's only one cursor and no overlapping shapes, we can skip early.
            }
        }
        if (containingShape !== null) {
            document.body.style.cursor = "pointer";
            if (this.hoverEffect === null) {
                this.hoverEffect = new ContourTrail({
                    shape: containingShape,
                    color: this.primaryColor,
                    maxLineWidth: 14,
                    minLineWidth: 6,
                    duration: 1250,
                    numShapes: 14
                });
                this.manager.push(this.hoverEffect);
            }
        } else {
            if (this.hoverEffect !== null) {
                this.resolveHoverEffect();
            }
        }
    }

    onClick = (e: MouseEvent) => {
        if (this.hoverEffect !== null) {
            window.open(this.hoverEffect.shape.url);
            this.resolveHoverEffect();
        }
    }

    resolveHoverEffect() {
        document.body.style.cursor = "auto";
        this.hoverEffect!.resolve();
        this.hoverEffect = null;
    }
}
