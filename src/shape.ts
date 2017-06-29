import { Vec2 } from "./math";

export type Config = any;
export enum Type { "pattern", "fill", "stroke", "text", "none" };

export interface BoundingRect {
    x: number; 
    y: number;
    width: number;
    height: number;
};

export class Shape {
    readonly _worldPoints: Vec2[] = [];
    readonly _children: Shape[] = [];
    parent?: Shape;
    pointsDirty = true;
    boundingRectDirty = true;
    type = Type.stroke;
    _translation = Vec2.zero;
    _rotation = 0;
    _scale = Vec2.one;
    _worldBoundingRect: BoundingRect;
    [key: string]: any;

    constructor(public readonly points: Vec2[], config: Config = {}) {
        Object.keys(config).forEach(key => this[key] = config[key]);
    }

    get rotation() { return this._rotation; }
    get absRotation() { return this.absolute(s => s.rotation, (a, b) => a + b); }
    set rotation(value) { this._rotation = value; this.setDirty(); }

    get scale() { return this._scale; }
    get absScale() { return this.absolute(s => s.scale, Vec2.multiply); }
    set scale(value) { this._scale = value; this.setDirty(); }

    get translation() { return this._translation; }
    get absTranslation() { return this.absolute(s => s.translation, Vec2.add); }
    set translation(value) { this._translation = value; this.setDirty(); }

    get worldPoints() {
        if (this.pointsDirty) {
            this._worldPoints.length = 0;
            for (let point of this.points) {
                const worldPoint = Vec2.transform(point, this.absScale, this.absRotation, this.absTranslation);
                this._worldPoints.push(worldPoint);
            }
            this.pointsDirty = false;
        }
        return this._worldPoints;
    }

    absolute<T>(selector: (shape: Shape) => T, op: (a: T, b: T) => T): T {
        let value = selector(this);
        return this.parent ? op(value, this.parent.absolute(selector, op)) : value;
    }

    get worldBoundingRect() {
        if (this.boundingRectDirty) {
            let min = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
            let max = new Vec2(Number.MIN_VALUE, Number.MIN_VALUE);
            for (let p of this.worldPoints) {
                min = Vec2.min(min, p);
                max = Vec2.max(max, p);
            }
            this._worldBoundingRect = {
                x: min.x,
                y: min.y,
                width: max.x - min.x,
                height: max.y - min.y
            };
            this.boundingRectDirty = false;
        }
        return this._worldBoundingRect; 
    }

    // Ref: https://stackoverflow.com/a/8721483/1466456
    worldContains(x: number, y: number) {
        let result = false;
        const points = this.worldPoints;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            if ((points[i].y > y) !== (points[j].y > y) &&
                (x < (points[j].x - points[i].x)*(y - points[i].y)/(points[j].y-points[i].y) + points[i].x)) {
                    result = !result;
                }
        }
        return result;
    }

    push(...args: Shape[]) {
        for (let arg of args) arg.parent = this;
        this._children.push(...args);
        return this;
    }

    setDirty() {
        this.pointsDirty = this.boundingRectDirty = true;
        for (let child of this._children) child.setDirty();
    }

    static empty(config?: Config) {
        return new Shape([], config);
    }

    static hex(x: number, y: number, diameter: number, config?: Config) {
        const a = diameter*0.25;
        const b = a * Math.sqrt(3);
        return new Shape([
            new Vec2(x + 0, y - 2*a),
            new Vec2(x + b, y -   a),
            new Vec2(x + b, y +   a),
            new Vec2(x + 0, y + 2*a),
            new Vec2(x - b, y +   a),
            new Vec2(x - b, y -   a)
        ], config);
    }

    static rect(x: number, y: number, width: number, height: number, config?: Config) {
        return new Shape([
            new Vec2(x,         y),
            new Vec2(x + width, y),
            new Vec2(x + width, y + height),
            new Vec2(x,         y + height)
        ], config);
    }
}