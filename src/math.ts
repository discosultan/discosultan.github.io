declare global {
    interface Math {
        lerp(a: number, b: number, amount: number): number;
        TWO_PI: number;
    }
}

Math.lerp = (a, b, amount) => a + (b - a)*amount;
Math.TWO_PI = 2*Math.PI;

export class Vec2 {
    constructor (public readonly x: number, public readonly y: number) { }

    static zero = new Vec2(0, 0);
    static one = new Vec2(1, 1);

    static lerp(p1: Vec2, p2: Vec2, amount: number) {
        return new Vec2(
            Math.lerp(p1.x, p2.x, amount),
            Math.lerp(p1.y, p2.y, amount)
        );
    }

    static add(p1: Vec2, p2: Vec2) { return new Vec2(p1.x + p2.x, p1.y + p2.y); }
    static multiply(p1: Vec2, p2: Vec2) { return new Vec2(p1.x*p2.x, p1.y*p2.y); }
    static rotate(p: Vec2, radians: number) {
        const s = Math.sin(radians), c = Math.cos(radians);
        return new Vec2(p.x*c - p.y*s, p.x*s + p.y*c);
    }

    static transform(p: Vec2, scale: Vec2, rotation: number, translation: Vec2) {
        return Vec2.add(Vec2.rotate(Vec2.multiply(p, scale), rotation), translation);
    }

    static min(p1: Vec2, p2: Vec2) { return new Vec2(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y)); }
    static max(p1: Vec2, p2: Vec2) { return new Vec2(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y)); }
}

// Ref: https://gist.github.com/gre/1650294
export const Easing = {
    // No easing, no acceleration.
    linear: (t: number) => t,
    // Accelerating from zero velocity.
    easeInQuad: (t: number) => t*t,
    // Decelerating to zero velocity.
    easeOutQuad: (t: number) => t*(2 - t),
    // Acceleration until halfway, then deceleration.
    easeInOutQuad: (t: number) => t < .5 ? 2*t*t : -1 + (4 - 2*t)*t,
    // Accelerating from zero velocity.
    easeInCubic: (t: number) => t*t*t,
    // Decelerating to zero velocity.
    easeOutCubic: (t: number) => (--t)*t*t + 1,
    // Acceleration until halfway, then deceleration.
    easeInOutCubic: (t: number) => t <.5 ? 4*t*t*t : (t - 1)*(2*t - 2)*(2*t - 2) + 1,
    // Accelerating from zero velocity.
    easeInQuart: (t: number) => t*t*t*t,
    // Decelerating to zero velocity.
    easeOutQuart: (t: number) => 1 - (--t)*t*t*t,
    // Acceleration until halfway, then deceleration.
    easeInOutQuart: (t: number) => t <.5 ? 8*t*t*t*t : 1 - 8*(--t)*t*t*t,
    // Accelerating from zero velocity.
    easeInQuint: (t: number) => t*t*t*t*t,
    // Decelerating to zero velocity.
    easeOutQuint: (t: number) => 1 + (--t)*t*t*t*t,
    // Acceleration until halfway, then deceleration .
    easeInOutQuint: (t: number) => t < .5 ? 16*t*t*t*t*t : 1 + 16*(--t)*t*t*t*t
}