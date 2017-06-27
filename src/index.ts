import { Renderer } from "./renderer";
import { ProcessManager } from "./process-manager";
import { Shape, Config as ShapeConfig } from "./shape";
import { Vec2, Easing } from "./math";
import * as Process from "./processes";

const shapesMeta: { color: string; imgPath: string; url?: string, img: HTMLImageElement }[] = [
    { color: "#fff", imgPath: "me.jpg", img: new Image() },
    { color: "#1da1f2", imgPath: "twitter.png", url: "https://twitter.com/Discosultan", img: new Image() },
    { color: "#171516", imgPath: "github.png", url: "https://github.com/discosultan", img: new Image() },
    { color: "#0274b3", imgPath: "linkedin.png", url: "https://www.linkedin.com/in/jvarus/", img: new Image() },
];

let loaded = 0;
for (let meta of shapesMeta) {
    meta.img.src = `./assets/${meta.imgPath}`;
    meta.img.onload = () => {
        if (++loaded >= shapesMeta.length) init();
    };
}

function init() {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas") || (() => { throw "Canvas not available." })();
    const ctx = canvas.getContext("2d") || (() => { throw "2d context not available." })();
    const shapes: Shape[] = [];
    const processManager = new ProcessManager(shapes);
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
    const textRectWidth = 300,
          textRectHeight = 50;
    const font = "Montserrat";
    const text1 = "JAANUS VARUS";
    const text2 = "Amsterdam, The Netherlands"
    processManager.timeScale = 0.5;

    // Preload font by rendering arbitrary text.
    ctx.font = `2px ${font}`;
    ctx.fillText("x", 0, 0,);

    // Generate two sets of hexes:
    // 1. initial contours which will be animated
    // 2. fill shapes which will be filled after contours are in place

    const base = new Vec2(hexDiameter, 0);
    const translationNE = Vec2.rotate(base,   Math.PI/3),
          translationW  = Vec2.rotate(base,   Math.PI  ),
          translationSE = Vec2.rotate(base, 5*Math.PI/3);

    const hexMidContour = Shape.empty({ strokeStyle: primaryColor }),
          hexNEContour  = newHex({ url: shapesMeta[1].url }),
          hexWContour   = newHex({ url: shapesMeta[2].url }),
          hexSEContour  = newHex({ url: shapesMeta[3].url });
    shapes.push(hexMidContour); // Rest will be added during animation.

    // Hex fill mask will be added after contours are animated.
    const hexFillMask = Shape.empty({ 
        type: "none",
        scale: flipVertically
    });
    const hexMidFill = newHex(),
          hexNEFill  = newHex({ translation: translationNE }),
          hexWFill   = newHex({ translation: translationW }),
          hexSEFill  = newHex({ translation: translationSE });
    hexFillMask.push(hexMidFill, hexNEFill, hexWFill, hexSEFill);

    function newHex(config: ShapeConfig = {}) { 
        config.strokeStyle = primaryColor;
        return Shape.hex(0, 0, hexDiameter, config);
    }

    addFillRect(hexMidFill, shapesMeta[0].color, shapesMeta[0].img);
    addFillRect(hexNEFill,  shapesMeta[1].color, shapesMeta[1].img),
    addFillRect(hexWFill,   shapesMeta[2].color, shapesMeta[2].img),
    addFillRect(hexSEFill,  shapesMeta[3].color, shapesMeta[3].img);

    function addFillRect(shape: Shape, color: string, img: HTMLImageElement) {
        const bgFillRect = Shape.rect(-hexDiameter*0.5, -hexDiameter*0.5, hexDiameter, hexDiameter, {
            type: "fill",
            fillStyle: color
        })
        shape.push(bgFillRect);
        const imgFillRect = Shape.rect(0, 0, img.width, img.height, {
            type: "pattern",
            fillStyle: ctx.createPattern(img, "no-repeat"),
            scale: flipVertically, // We flip it back because its ancestor was flipped.
            translation: new Vec2(-img.width/2, -img.height/2),
        });
        shape.push(imgFillRect);
    }

    const textRect = Shape.empty({ type: "none", translation: new Vec2(60, -textRectHeight*0.5) });
    shapes.push(textRect);
    function createText(text: string, translation: Vec2, scale: Vec2) {
        return Shape.rect(0, 0, textRectWidth, textRectHeight/2, {
            type: "text",
            font: font,
            text: text,
            fillStyle: primaryColor,
            translation: Vec2.add(new Vec2(0, 10), translation),
            scale: scale
        });
    }
    textRect.push(createText(text1, Vec2.zero, new Vec2(1, 1)));
    textRect.push(createText(text2, new Vec2(0, textRectHeight*0.5), new Vec2(1, 0.6)));

    processManager.push(
        new Process.Wait({ duration: 0 }).push(
            new Process.GenerateHex({ shape: hexMidContour, easingFn: easingFn, diameter: hexDiameter, duration: hexGenDuration }).push(
                new Process.Rotate({ shape: hexMidContour, easingFn: easingFn, target: -Math.TWO_PI, duration: rotationDuration }).push(
                    addTranslateHex(hexWContour,  translationW),
                    addTranslateHex(hexSEContour, translationSE),
                    addTranslateHex(hexNEContour, translationNE)
                )
            ),
            new Process.WaitAllProcesses().push(
                new Process.AddShape({ shape: hexFillMask }).push(
                    new Process.GenerateRectDiagonally({
                        shape: hexFillMask,
                        x: -hexDiameter*1,
                        y: -hexDiameter*1.5,
                        width: hexDiameter*2.5,
                        height: hexDiameter*3,
                        duration: shapeFillDuration
                    })
                ),
                new Process.GenerateRect({
                    shape: textRect,
                    width: textRectWidth,
                    height: textRectHeight,
                    duration: shapeFillDuration
                })
            )
        )
    );

    function addTranslateHex(shape: Shape, translation: Vec2) {
        return new Process.AddShape({ shape: shape }).push(
            new Process.Translate({ 
                shape: shape,
                easingFn: easingFn,
                duration: hexTranslationDuration,
                target: translation
            })
        );
    }

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

    // Process input.
    window.onkeydown = e => {
        // Skip animations on ESC key.
        if (e.keyCode === 27) processManager.resolveAll();
    };
    // Hover effect for link hexagons.
    const hoverableShapes = [hexNEContour, hexWContour, hexSEContour];
    let hoverEffect: Process.HoverEffect | null = null;
    canvas.onmousemove = e => {
        const x = e.pageX - canvas.offsetLeft - canvas.translationX,
              y = e.pageY - canvas.offsetTop - canvas.translationY;
        let containingShape = null;
        for (let shape of hoverableShapes) {
            if (shape.worldContains(x, y)) {
                containingShape = shape;
                break; // Since there's only one cursor and no overlapping shapes, we can skip early.
            }
        }
        if (containingShape !== null) {
            document.body.style.cursor = "pointer";
            if (hoverEffect === null) {
                hoverEffect = new Process.HoverEffect({
                    shape: containingShape,
                    diameter: hexDiameter,
                    color: primaryColor,
                    maxLineWidth: 15,
                    minLineWidth: 6
                });
                processManager.push(hoverEffect);
            }
        } else {
            if (hoverEffect !== null) {
                resolveHoverEffect();
            }
        }
    };
    canvas.onclick = e => {
        if (hoverEffect != null) {
            console.log(hoverEffect.shape);
            window.open(hoverEffect.shape.url);
            resolveHoverEffect();
        }
    };
    function resolveHoverEffect() {
        document.body.style.cursor = "auto";
        hoverEffect!.resolve();
        hoverEffect = null;
    }

    // Globals to simplify debugging.
    window.renderer = renderer;
    window.processManager = processManager;
}

declare global {
    interface Window {
        renderer: Renderer;
        processManager: ProcessManager;
    }
}