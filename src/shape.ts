import { Vec2 } from "./math";

export type Config = any;
export enum Type { "pattern", "image", "fill", "stroke", "text", "none" };

export interface BoundingRect {
    x: number; 
    y: number;
    width: number;
    height: number;
};

export class Shape {
    readonly children: Shape[] = [];
    readonly _worldPoints: Vec2[];
    parent?: Shape;
    type = Type.stroke;
    _pointsDirty = true;
    _boundingRectDirty = true;
    _translation = Vec2.zero;
    _rotation = 0;
    _scale = Vec2.one;
    _worldBoundingRect: BoundingRect;
    [key: string]: any;

    constructor(public readonly points: Vec2[], config: Config = {}) {
        this._worldPoints = new Array(points.length);
        Object.keys(config).forEach(key => this[key] = config[key]);
    }

    get rotation() { return this._rotation; }
    // get absRotation() { return this.absolute(s => s.rotation, (a, b) => a + b); }
    set rotation(value) { this._rotation = value; this.setDirty(); }

    get scale() { return this._scale; }
    // get absScale() { return this.absolute(s => s.scale, Vec2.multiply); }
    set scale(value) { this._scale = value; this.setDirty(); }

    get translation() { return this._translation; }
    // get absTranslation() { return this.absolute(s => s.translation, Vec2.add); }
    set translation(value) { this._translation = value; this.setDirty(); }

    get worldPoints() {
        if (this._pointsDirty) {
            // let first = true;
            for (let i = 0; i < this.points.length; i++) {
                const pl = this.points[i];
                // const worldPoint = Vec2.transform(point, this.absScale, this.absRotation, this.absTranslation);
                // const worldPoint = this.absTransform(point);
                const m = this.absTransform;

                let pw = new Vec2(
                    pl.x*m[0] + pl.y*m[2] + m[4], // + pl.x*m[4],
                    pl.x*m[1] + pl.y*m[3] + m[5], // + pl.y*m[5]
                )

                this._worldPoints[i] = pw;
            }
            this._pointsDirty = false;
        }
        return this._worldPoints;
    }

    get absTransform(): number[] {
        const r = this.rotation,
              sx = this.scale.x, sy = this.scale.y,
              tx = this.translation.x, ty = this.translation.y;
        const cosr = Math.cos(r), sinr = Math.sin(r);

        const outT: number[] = [];
        fromTranslation(outT, [tx, ty]);

        const outR: number[] = [];
        fromRotation(outR, r);

        const outS: number[] = [];
        fromScaling(outS, [sx, sy]);

        const temp: number[] = [];
        multiply(temp, outS, outR);
        const ml: number[] = [];
        multiply(ml, temp, outT);

        // const ml = [
        //     // cosr, -sinr,
        //     // sinr,  cosr,
        //     cosr*sx, -sinr*sy,
        //     sinr*sx,  cosr*sy,
        //     //   tx*sx,    ty*sy
        //     tx*cosr*sx + ty*sinr*sx, tx*(-sinr)*sy + ty*cosr*sy
        //     // tx, ty
        // ];

        // 2 3 0   1 0 0   2*1 + 3*0 + 0*6
        // 4 5 0 X 0 1 0 = 
        // 0 0 1   6 7 1   0*1 + 0*0 + 1*6 | 

        if (this.parent) {
            const mp = this.parent.absTransform;
            const out: number[] = [];
            return multiply(out, mp, ml);
        } else {
            return ml;
        }
    }

    // absolute<T>(selector: (shape: Shape) => T, op: (a: T, b: T) => T): T {
    //     const value = selector(this);
    //     return this.parent ? op(value, this.parent.absolute(selector, op)) : value;
    // }

    get worldBoundingRect() {
        if (this._boundingRectDirty) {
            let min = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            let max = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
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

function multiply(out: number[], a: number[], b: number[]) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
  }

function fromRotation(out: number[], rad: number): number[] {
    let s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  
  function fromScaling(out: number[], v: number[]): number[] {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  
  function fromTranslation(out: number[], v: number[]): number[] {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
  }