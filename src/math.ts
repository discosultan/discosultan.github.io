declare global {
    interface Math {
        lerp(a: number, b: number, v: number): number;
        TWO_PI: number;
    }
}

Math.lerp = (a, b, v) => a + (b - a) * v;
Math.TWO_PI = 2 * Math.PI;

export class Vec2 {
    constructor(public x: number, public y: number) { }

    clone() { return new Vec2(this.x, this.y); }

    static newZero() { return new Vec2(0, 0); }
    static newOne() { return new Vec2(1, 1); }

    static zero = Vec2.newZero();
    static one = Vec2.newOne();

    static lerp(out: Vec2, p1: Vec2, p2: Vec2, v: number) {
        out.x = Math.lerp(p1.x, p2.x, v);
        out.y = Math.lerp(p1.y, p2.y, v);
        return out;
    }

    static add(out: Vec2, p1: Vec2, p2: Vec2) {
        out.x = p1.x + p2.x;
        out.y = p1.y + p2.y;
        return out;
    }

    static rotate(out: Vec2, p: Vec2, r: number) {
        const sin = Math.sin(r), cos = Math.cos(r);
        out.x = p.x * cos - p.y * sin;
        out.y = p.x * sin + p.y * cos;
        return out;
    }

    static transform(out: Vec2, p: Vec2, m: Mat2x3) {
        out.x = p.x * m.m00 + p.y * m.m10 + m.m20;
        out.y = p.x * m.m01 + p.y * m.m11 + m.m21;
        return out;
    }

    static min(out: Vec2, p1: Vec2, p2: Vec2) {
        out.x = Math.min(p1.x, p2.x);
        out.y = Math.min(p1.y, p2.y);
        return out;

    }
    static max(out: Vec2, p1: Vec2, p2: Vec2) {
        out.x = Math.max(p1.x, p2.x);
        out.y = Math.max(p1.y, p2.y);
        return out;
    }
}

export class Mat2x3 {
    constructor(
        public m00: number, public m01: number,
        public m10: number, public m11: number,
        public m20: number, public m21: number
    ) { }

    static newIdentity() { return new Mat2x3(1, 0, 0, 1, 0, 0); }

    static multiply(out: Mat2x3, a: Mat2x3, b: Mat2x3) {
        out.m00 = a.m00 * b.m00 + a.m10 * b.m01;
        out.m01 = a.m01 * b.m00 + a.m11 * b.m01;
        out.m10 = a.m00 * b.m10 + a.m10 * b.m11;
        out.m11 = a.m01 * b.m10 + a.m11 * b.m11;
        out.m20 = a.m00 * b.m20 + a.m10 * b.m21 + a.m20;
        out.m21 = a.m01 * b.m20 + a.m11 * b.m21 + a.m21;
        return out;
    }

    static fromSRT(out: Mat2x3, s: Vec2, r: number, t: Vec2) {
        const sin = Math.sin(r), cos = Math.cos(r);
        out.m00 = cos * s.x;
        out.m01 = sin * s.x;
        out.m10 = -sin * s.y;
        out.m11 = cos * s.y;
        out.m20 = t.x * cos * s.x + t.y * sin * s.x;
        out.m21 = t.y * (-sin) * s.y + t.y * cos * s.y;
        return out;
    }
}

// Ref: https://gist.github.com/gre/1650294
export const Easing = {
    // No easing, no acceleration.
    linear: (t: number) => t,
    // Accelerating from zero velocity.
    easeInQuad: (t: number) => t * t,
    // Decelerating to zero velocity.
    easeOutQuad: (t: number) => t * (2 - t),
    // Acceleration until halfway, then deceleration.
    easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    // Accelerating from zero velocity.
    easeInCubic: (t: number) => t * t * t,
    // Decelerating to zero velocity.
    easeOutCubic: (t: number) => (--t) * t * t + 1,
    // Acceleration until halfway, then deceleration.
    easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // Accelerating from zero velocity.
    easeInQuart: (t: number) => t * t * t * t,
    // Decelerating to zero velocity.
    easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
    // Acceleration until halfway, then deceleration.
    easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    // Accelerating from zero velocity.
    easeInQuint: (t: number) => t * t * t * t * t,
    // Decelerating to zero velocity.
    easeOutQuint: (t: number) => 1 + (--t) * t * t * t * t,
    // Acceleration until halfway, then deceleration.
    easeInOutQuint: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
}
