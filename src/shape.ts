import { Vec2, Mat2x3 } from "./math";

export type Config = any;
export enum Type { "image", "fill", "stroke", "text", "none" };

export interface BoundingRect {
    x: number; 
    y: number;
    width: number;
    height: number;
};

export class Shape {
    readonly children: Shape[] = [];
    readonly _worldPoints: Vec2[] = [];
    parent?: Shape;
    type = Type.stroke;
    translation = Vec2.newZero();
    rotation = 0;
    scale = Vec2.newOne();
    _pointsDirty = true;
    _boundingRectDirty = true;
    _worldBoundingRect: BoundingRect;
    _localTransform = Mat2x3.newIdentity();
    _absTransform = Mat2x3.newIdentity();
    [key: string]: any;

    constructor(public readonly points: Vec2[], config: Config = {}) {
        Object.keys(config).forEach(key => this[key] = config[key]);
    }

    get absTransform(): Mat2x3 {
        Mat2x3.fromSRT(this._localTransform, this.scale, this.rotation, this.translation);

        if (this.parent) {
            Mat2x3.multiply(this._absTransform, this.parent.absTransform, this._localTransform);
            return this._absTransform;
        } else {
            return this._localTransform;
        }
    }

    get worldPoints() {
        if (this._pointsDirty) {
            for (let i = 0; i < this.points.length; i++) {
                if (!this._worldPoints[i]) this._worldPoints[i] = Vec2.newZero();
                Vec2.transform(this._worldPoints[i], this.points[i], this.absTransform);
            }
            this._pointsDirty = false;
        }
        return this._worldPoints;
    }

    get worldBoundingRect() {
        if (this._boundingRectDirty) {
            let min = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            let max = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
            for (let p of this.worldPoints) {
                Vec2.min(min, min, p);
                Vec2.max(max, max, p);
            }
            this._worldBoundingRect = {
                x: min.x,
                y: min.y,
                width: max.x - min.x,
                height: max.y - min.y
            };
            this._boundingRectDirty = false;
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
        this.children.push(...args);
        return this;
    }

    setDirty() {
        this._pointsDirty = this._boundingRectDirty = true;
        for (let child of this.children) child.setDirty();
    }

    static empty(config?: Config) {
        return new Shape([], config);
    }

    static hex(x: number, y: number, diameter: number, config?: Config) {
        const a = diameter*0.25;
        const b = a*Math.sqrt(3);
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
            new Vec2(x,         y         ),
            new Vec2(x + width, y         ),
            new Vec2(x + width, y + height),
            new Vec2(x,         y + height)
        ], config);
    }
}
