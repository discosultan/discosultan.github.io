import { Renderer } from "./renderer";
import { ProcessManager } from "./process-manager";
import { Shape, Type as ShapeType, Config as ShapeConfig } from "./shape";
import { Vec2, Easing } from "./math";
import * as General from "./processes/general";
import * as Generation from "./processes/generation";
import * as Input from "./processes/input";

declare global {
    interface Window {
        renderer: Renderer;
        processManager: ProcessManager;
    }
}

interface ShapeMeta {
    color: string,
    path: string,
    width: number,
    height: number,
    url?: string,
    img?: HTMLImageElement
}

const shapesMeta: ShapeMeta[] = [
    { color: "#fff", path: "me.png", width: 96, height: 96 },
    { color: "#1da1f2", path: "twitter.png", width: 48, height: 48, url: "https://twitter.com/discosultan" },
    { color: "#171516", path: "github.png", width: 48, height: 48, url: "https://github.com/discosultan" },
    { color: "#0274b3", path: "linkedin.png", width: 48, height: 48, url: "https://www.linkedin.com/in/jvarus/" },
];

// Preload images.
let loaded = 0;
for (const meta of shapesMeta) {
    meta.img = new Image();
    meta.img.src = `./assets/${meta.path}`;
    meta.img.onload = () => {
        if (++loaded >= shapesMeta.length) init();
    };
}

function init() {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas") || (() => { throw "Canvas not available." })();
    const ctx = canvas.getContext("2d") || (() => { throw "2d context not available." })();
    const shapes: Shape[] = [];
    const processManager = new ProcessManager(canvas, shapes);
    const renderer = new Renderer(canvas, shapes, 0.36);

    // Config.
    const primaryColor = "#fff";
    const easingFn = Easing.easeInOutCubic;
    const hexDiameter = 100;
    const hexGenDuration = 600;
    const rotationDuration = 300;
    const shapeFillDuration = 400;
    const hexTranslationDuration = 300;
    const flipVertically = new Vec2(-1, 1);
    const textRectWidth = 300;
    const textRectHeight = 50;
    const font = "Montserrat";
    const text1 = "JAANUS VARUS";
    const text2 = "Amsterdam, The Netherlands"
    processManager.timeScale = 0.5;

    // Preload font by rendering arbitrary text.
    ctx.font = `2px ${font}`;
    ctx.fillText("x", 0, 0);

    // Generate two sets of hexes:
    // 1. initial contours which will be animated
    // 2. fill shapes which will be filled after contours are in place

    const base = new Vec2(hexDiameter, 0);
    const translationNE = Vec2.rotate(Vec2.newZero(), base, Math.PI / 3);
    const translationW = Vec2.rotate(Vec2.newZero(), base, Math.PI);
    const translationSE = Vec2.rotate(Vec2.newZero(), base, 5 * Math.PI / 3);

    const hexMidContour = Shape.empty({ strokeStyle: primaryColor });
    const hexNEContour = newHex({ url: shapesMeta[1].url });
    const hexWContour = newHex({ url: shapesMeta[2].url });
    const hexSEContour = newHex({ url: shapesMeta[3].url });
    shapes.push(hexMidContour); // Rest will be added during animation.

    // Hex fill mask will be added after contours are animated.
    const hexFillMask = Shape.empty({
        type: ShapeType.none,
        scale: flipVertically
    });
    const hexMidFill = newHex({ scale: flipVertically });
    const hexNEFill = newHex({ scale: flipVertically, translation: translationNE });
    const hexWFill = newHex({ scale: flipVertically, translation: translationW });
    const hexSEFill = newHex({ scale: flipVertically, translation: translationSE });
    hexFillMask.push(
        hexMidFill,
        hexNEFill,
        hexWFill,
        hexSEFill
    );

    function newHex(config: ShapeConfig = {}) {
        config.strokeStyle = primaryColor;
        return Shape.hex(0, 0, hexDiameter, config);
    }

    addFillRect(hexMidFill, shapesMeta[0]);
    addFillRect(hexNEFill, shapesMeta[1]);
    addFillRect(hexWFill, shapesMeta[2]);
    addFillRect(hexSEFill, shapesMeta[3]);

    function addFillRect(shape: Shape, meta: ShapeMeta) {
        const bgFillRect = Shape.rect(-hexDiameter * 0.5, -hexDiameter * 0.5, hexDiameter, hexDiameter, {
            type: ShapeType.fill,
            fillStyle: meta.color
        })
        shape.push(bgFillRect);
        const imgFillRect = Shape.rect(-meta.width * 0.5, -meta.height * 0.5, meta.width, meta.height, {
            type: ShapeType.image,
            image: meta.img
        });
        shape.push(imgFillRect);
    }

    const textRect = Shape.empty({ type: ShapeType.none, translation: new Vec2(60, -textRectHeight * 0.5) });
    shapes.push(textRect);
    function createText(text: string, translation: Vec2, scale: Vec2) {
        return Shape.rect(0, 0, textRectWidth, textRectHeight * 0.5, {
            type: ShapeType.text,
            font: font,
            text: text,
            fillStyle: primaryColor,
            translation: translation,
            scale: scale
        });
    }
    textRect.push(createText(text1, new Vec2(0, 10), new Vec2(1, 1)));
    textRect.push(createText(text2, new Vec2(0, textRectHeight + 10), new Vec2(1, 0.6)));

    processManager.push(
        // The wait process is for testing purposes.
        new General.Wait({ duration: 0 }).push(
            new Generation.GenerateHex({ shape: hexMidContour, easingFn, diameter: hexDiameter, duration: hexGenDuration }).push(
                new General.Rotate({ shape: hexMidContour, easingFn, target: -Math.TWO_PI, duration: rotationDuration }).push(
                    addTranslateHex(hexWContour, translationW),
                    addTranslateHex(hexSEContour, translationSE),
                    addTranslateHex(hexNEContour, translationNE)
                )
            ),
            new General.WaitAllProcesses().push(
                new General.Execute({ command: () => shapes.push(hexFillMask) }).push(
                    new Generation.GenerateRectDiagonally({
                        shape: hexFillMask,
                        x: -hexDiameter * 1,
                        y: -hexDiameter * 1.5,
                        width: hexDiameter * 2.5,
                        height: hexDiameter * 3,
                        duration: shapeFillDuration
                    })
                ),
                new Generation.GenerateRect({
                    shape: textRect,
                    width: textRectWidth,
                    height: textRectHeight,
                    duration: shapeFillDuration
                }),
                new Input.Navigation({ shapes: [hexNEContour, hexWContour, hexSEContour] })
            )
        )
    );

    function addTranslateHex(shape: Shape, translation: Vec2) {
        return new General.Execute({ command: () => shapes.push(shape) }).push(
            new General.Translate({
                shape: shape,
                easingFn: easingFn,
                duration: hexTranslationDuration,
                target: translation
            })
        );
    }

    processManager.push(new Input.ResolveProcessesOnEsc());

    // Render loop.
    let prevTimestamp = 0;
    window.requestAnimationFrame(step);
    function step(timestamp: number) {
        const dt = timestamp - prevTimestamp;
        prevTimestamp = timestamp;

        processManager.step(dt);
        renderer.step(dt);

        window.requestAnimationFrame(step);
    }

    // Globals to simplify debugging.
    window.renderer = renderer;
    window.processManager = processManager;
}
