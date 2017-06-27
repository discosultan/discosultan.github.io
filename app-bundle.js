/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Vec2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Easing; });
Math.lerp = function (a, b, amount) { return a + (b - a) * amount; };
Math.TWO_PI = 2 * Math.PI;
var Vec2 = (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.lerp = function (p1, p2, amount) {
        return new Vec2(Math.lerp(p1.x, p2.x, amount), Math.lerp(p1.y, p2.y, amount));
    };
    Vec2.add = function (p1, p2) { return new Vec2(p1.x + p2.x, p1.y + p2.y); };
    Vec2.multiply = function (p1, p2) { return new Vec2(p1.x * p2.x, p1.y * p2.y); };
    Vec2.rotate = function (p, radians) {
        var s = Math.sin(radians), c = Math.cos(radians);
        return new Vec2(p.x * c - p.y * s, p.x * s + p.y * c);
    };
    Vec2.transform = function (p, scale, rotation, translation) {
        return Vec2.add(Vec2.rotate(Vec2.multiply(p, scale), rotation), translation);
    };
    Vec2.min = function (p1, p2) { return new Vec2(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y)); };
    Vec2.max = function (p1, p2) { return new Vec2(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y)); };
    return Vec2;
}());

Vec2.zero = new Vec2(0, 0);
Vec2.one = new Vec2(1, 1);
// Ref: https://gist.github.com/gre/1650294
var Easing = {
    // No easing, no acceleration.
    linear: function (t) { return t; },
    // Accelerating from zero velocity.
    easeInQuad: function (t) { return t * t; },
    // Decelerating to zero velocity.
    easeOutQuad: function (t) { return t * (2 - t); },
    // Acceleration until halfway, then deceleration.
    easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
    // Accelerating from zero velocity.
    easeInCubic: function (t) { return t * t * t; },
    // Decelerating to zero velocity.
    easeOutCubic: function (t) { return (--t) * t * t + 1; },
    // Acceleration until halfway, then deceleration.
    easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    // Accelerating from zero velocity.
    easeInQuart: function (t) { return t * t * t * t; },
    // Decelerating to zero velocity.
    easeOutQuart: function (t) { return 1 - (--t) * t * t * t; },
    // Acceleration until halfway, then deceleration.
    easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
    // Accelerating from zero velocity.
    easeInQuint: function (t) { return t * t * t * t * t; },
    // Decelerating to zero velocity.
    easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t; },
    // Acceleration until halfway, then deceleration .
    easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Process; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProcessManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(0);

var Process = (function () {
    function Process(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this._children = [];
        this.elapsed = 0;
        this.status = "pending";
        this.endless = false;
        this.duration = 1000;
        this.easingFn = __WEBPACK_IMPORTED_MODULE_0__math__["a" /* Easing */].linear;
        Object.keys(config).forEach(function (key) { return _this[key] = config[key]; });
    }
    Object.defineProperty(Process.prototype, "progress", {
        get: function () { return this.easingFn(Math.min(this.elapsed / this.duration, 1)); },
        enumerable: true,
        configurable: true
    });
    Process.prototype.init = function () { };
    Process.prototype.push = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._children).push.apply(_a, args);
        return this;
        var _a;
    };
    Process.prototype.resolve = function () { this.status = "fulfilled"; };
    Process.prototype.reject = function () { this.status = "rejected"; };
    Process.prototype.step = function (dt) {
        this.elapsed += dt;
        if (this.progress === 1)
            this.resolve();
    };
    return Process;
}());

var ProcessManager = (function () {
    function ProcessManager(shapes) {
        this.shapes = shapes;
        this.processes = [];
        this.timeScale = 1;
    }
    Object.defineProperty(ProcessManager.prototype, "resolvableProcesses", {
        get: function () { return this.processes.filter(function (proc) { return !proc.endless; }); },
        enumerable: true,
        configurable: true
    });
    ProcessManager.prototype.push = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            arg.manager = this;
            arg.init();
        }
        (_b = this.processes).push.apply(_b, args);
        return this;
        var _b;
    };
    ProcessManager.prototype.step = function (dt) {
        for (var i = this.processes.length - 1; i >= 0; i--) {
            var process = this.processes[i];
            process.step(dt * this.timeScale);
            if (process.status === "fulfilled") {
                this.processes.splice(i, 1);
                this.push.apply(this, process._children);
            }
        }
    };
    ProcessManager.prototype.resolveAll = function () {
        while (this.resolvableProcesses.length > 0) {
            this.step(100000); // Some arbitrary large number.
        }
    };
    return ProcessManager;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(0);

;
var Shape = (function () {
    function Shape(points, config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this.points = points;
        this._worldPoints = [];
        this._children = [];
        this.pointsDirty = true;
        this.boundingRectDirty = true;
        this.type = "stroke";
        this._translation = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].zero;
        this._rotation = 0;
        this._scale = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].one;
        Object.keys(config).forEach(function (key) { return _this[key] = config[key]; });
    }
    Object.defineProperty(Shape.prototype, "rotation", {
        get: function () { return this._rotation; },
        set: function (value) { this._rotation = value; this.setDirty(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "absRotation", {
        get: function () { return this.absolute(function (s) { return s.rotation; }, function (a, b) { return a + b; }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "scale", {
        get: function () { return this._scale; },
        set: function (value) { this._scale = value; this.setDirty(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "absScale", {
        get: function () { return this.absolute(function (s) { return s.scale; }, __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].multiply); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "translation", {
        get: function () { return this._translation; },
        set: function (value) { this._translation = value; this.setDirty(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "absTranslation", {
        get: function () { return this.absolute(function (s) { return s.translation; }, __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].add); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "worldPoints", {
        get: function () {
            if (this.pointsDirty) {
                this._worldPoints.length = 0;
                for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                    var point = _a[_i];
                    var worldPoint = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].transform(point, this.absScale, this.absRotation, this.absTranslation);
                    this._worldPoints.push(worldPoint);
                }
                this.pointsDirty = false;
            }
            return this._worldPoints;
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype.absolute = function (selector, op) {
        var value = selector(this);
        return this.parent ? op(value, this.parent.absolute(selector, op)) : value;
    };
    Object.defineProperty(Shape.prototype, "worldBoundingRect", {
        get: function () {
            if (this.boundingRectDirty) {
                var min = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](Number.MAX_VALUE, Number.MAX_VALUE);
                var max = new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](Number.MIN_VALUE, Number.MIN_VALUE);
                for (var _i = 0, _a = this.worldPoints; _i < _a.length; _i++) {
                    var p = _a[_i];
                    min = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].min(min, p);
                    max = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].max(max, p);
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
        },
        enumerable: true,
        configurable: true
    });
    // Ref: https://stackoverflow.com/a/8721483/1466456
    Shape.prototype.worldContains = function (x, y) {
        var result = false;
        var points = this.worldPoints;
        for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
            if ((points[i].y > y) !== (points[j].y > y) &&
                (x < (points[j].x - points[i].x) * (y - points[i].y) / (points[j].y - points[i].y) + points[i].x)) {
                result = !result;
            }
        }
        return result;
    };
    Shape.prototype.push = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            arg.parent = this;
        }
        (_b = this._children).push.apply(_b, args);
        return this;
        var _b;
    };
    Shape.prototype.setDirty = function () {
        this.pointsDirty = this.boundingRectDirty = true;
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.setDirty();
        }
    };
    Shape.empty = function (config) {
        return new Shape([], config);
    };
    Shape.hex = function (x, y, diameter, config) {
        var a = diameter / 4;
        var b = a * Math.sqrt(3);
        return new Shape([
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x + 0, y - 2 * a),
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x + b, y - a),
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x + b, y + a),
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x + 0, y + 2 * a),
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x - b, y + a),
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x - b, y - a)
        ], config);
    };
    Shape.rect = function (x, y, width, height, config) {
        return new Shape([
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x, y),
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x + width, y),
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x + width, y + height),
            new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x, y + height)
        ], config);
    };
    return Shape;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__process_manager__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__math__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__processes__ = __webpack_require__(5);





var shapesMeta = [
    { color: "#fff", imgPath: "me.jpg", img: new Image() },
    { color: "#1da1f2", imgPath: "twitter.png", url: "https://twitter.com/Discosultan", img: new Image() },
    { color: "#171516", imgPath: "github.png", url: "https://github.com/discosultan", img: new Image() },
    { color: "#0274b3", imgPath: "linkedin.png", url: "https://www.linkedin.com/in/jvarus/", img: new Image() },
];
var loaded = 0;
for (var _i = 0, shapesMeta_1 = shapesMeta; _i < shapesMeta_1.length; _i++) {
    var meta = shapesMeta_1[_i];
    meta.img.src = "./assets/" + meta.imgPath;
    meta.img.onload = function () {
        if (++loaded >= shapesMeta.length)
            init();
    };
}
function init() {
    var canvas = document.getElementById("canvas") || (function () { throw "Canvas not available."; })();
    var ctx = canvas.getContext("2d") || (function () { throw "2d context not available."; })();
    var shapes = [];
    var processManager = new __WEBPACK_IMPORTED_MODULE_1__process_manager__["b" /* ProcessManager */](shapes);
    var renderer = new __WEBPACK_IMPORTED_MODULE_0__renderer__["a" /* Renderer */](canvas, shapes, 0.36);
    // Config.
    var primaryColor = "#fff";
    var easingFn = __WEBPACK_IMPORTED_MODULE_3__math__["a" /* Easing */].easeInOutCubic;
    var hexDiameter = 100;
    var hexGenDuration = 600;
    var rotationDuration = 300;
    var shapeFillDuration = 400;
    var hexTranslationDuration = 300;
    var flipVertically = new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](-1, 1);
    var textRectWidth = 300, textRectHeight = 50;
    var font = "Montserrat";
    var text1 = "JAANUS VARUS";
    var text2 = "Amsterdam, The Netherlands";
    processManager.timeScale = 0.5;
    // Preload font by rendering arbitrary text.
    ctx.font = "2px " + font;
    ctx.fillText("x", 0, 0);
    // Generate two sets of hexes:
    // 1. initial contours which will be animated
    // 2. fill shapes which will be filled after contours are in place
    var base = new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](hexDiameter, 0);
    var translationNE = __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].rotate(base, 1 * Math.PI / 3), translationW = __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].rotate(base, 1 * Math.PI / 1), translationSE = __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].rotate(base, 5 * Math.PI / 3);
    var hexMidContour = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].empty({ strokeStyle: primaryColor }), hexNEContour = newHex({ url: shapesMeta[1] }), hexWContour = newHex({ url: shapesMeta[2] }), hexSEContour = newHex({ url: shapesMeta[3] });
    shapes.push(hexMidContour); // Rest will be added during animation.
    // Hex fill mask will be added after contours are animated.
    var hexFillMask = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].empty({
        type: "none",
        scale: flipVertically
    });
    var hexMidFill = newHex(), hexNEFill = newHex({ translation: translationNE }), hexWFill = newHex({ translation: translationW }), hexSEFill = newHex({ translation: translationSE });
    hexFillMask.push(hexMidFill, hexNEFill, hexWFill, hexSEFill);
    function newHex(config) {
        if (config === void 0) { config = {}; }
        config.strokeStyle = primaryColor;
        return __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].hex(0, 0, hexDiameter, config);
    }
    addFillRect(hexMidFill, shapesMeta[0].color, shapesMeta[0].img);
    addFillRect(hexNEFill, shapesMeta[1].color, shapesMeta[1].img),
        addFillRect(hexWFill, shapesMeta[2].color, shapesMeta[2].img),
        addFillRect(hexSEFill, shapesMeta[3].color, shapesMeta[3].img);
    function addFillRect(shape, color, img) {
        var bgFillRect = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].rect(-hexDiameter / 2, -hexDiameter / 2, hexDiameter, hexDiameter, {
            type: "fill",
            fillStyle: color
        });
        shape.push(bgFillRect);
        var imgFillRect = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].rect(0, 0, img.width, img.height, {
            type: "pattern",
            fillStyle: ctx.createPattern(img, "no-repeat"),
            scale: flipVertically,
            translation: new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](-img.width / 2, -img.height / 2),
        });
        shape.push(imgFillRect);
    }
    var textRect = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].empty({ type: "none", translation: new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](60, -textRectHeight / 2) });
    shapes.push(textRect);
    function createText(text, translation, scale) {
        return __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].rect(0, 0, textRectWidth, textRectHeight / 2, {
            type: "text",
            font: font,
            text: text,
            fillStyle: primaryColor,
            translation: __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].add(new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](0, 10), translation),
            scale: scale
        });
    }
    textRect.push(createText(text1, __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].zero, new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](1, 1)));
    textRect.push(createText(text2, new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](0, textRectHeight / 2), new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](1, 0.6)));
    processManager.push(new __WEBPACK_IMPORTED_MODULE_4__processes__["h" /* Wait */]({ duration: 0 }).push(new __WEBPACK_IMPORTED_MODULE_4__processes__["b" /* GenerateHex */]({ shape: hexMidContour, easingFn: easingFn, diameter: hexDiameter, duration: hexGenDuration }).push(new __WEBPACK_IMPORTED_MODULE_4__processes__["f" /* Rotate */]({ shape: hexMidContour, easingFn: easingFn, target: -Math.TWO_PI, duration: rotationDuration }).push(addTranslateHex(hexWContour, translationW), addTranslateHex(hexSEContour, translationSE), addTranslateHex(hexNEContour, translationNE))), new __WEBPACK_IMPORTED_MODULE_4__processes__["i" /* WaitAllProcesses */]().push(new __WEBPACK_IMPORTED_MODULE_4__processes__["a" /* AddShape */]({ shape: hexFillMask }).push(new __WEBPACK_IMPORTED_MODULE_4__processes__["d" /* GenerateRectDiagonally */]({
        shape: hexFillMask,
        x: -hexDiameter * 1,
        y: -hexDiameter * 1.5,
        width: hexDiameter * 2.5,
        height: hexDiameter * 3,
        duration: shapeFillDuration
    })), new __WEBPACK_IMPORTED_MODULE_4__processes__["c" /* GenerateRect */]({
        shape: textRect,
        width: textRectWidth,
        height: textRectHeight,
        duration: shapeFillDuration
    }))));
    function addTranslateHex(shape, translation) {
        return new __WEBPACK_IMPORTED_MODULE_4__processes__["a" /* AddShape */]({ shape: shape }).push(new __WEBPACK_IMPORTED_MODULE_4__processes__["g" /* Translate */]({
            shape: shape,
            easingFn: easingFn,
            duration: hexTranslationDuration,
            target: translation
        }));
    }
    // Render loop.
    var prevTimestamp = 0;
    window.requestAnimationFrame(step);
    function step(timestamp) {
        var dt = timestamp - prevTimestamp;
        prevTimestamp = timestamp;
        processManager.step(dt);
        renderer.step(dt);
        window.requestAnimationFrame(step);
    }
    // Process input.
    window.onkeydown = function (e) {
        // Skip animations on ESC key.
        if (e.keyCode === 27)
            processManager.resolveAll();
    };
    // Hover effect for link hexagons.
    var hoverableShapes = [hexNEContour, hexWContour, hexSEContour];
    var hoverEffect = null;
    canvas.onmousemove = function (e) {
        var x = e.pageX - canvas.offsetLeft - canvas.translationX, y = e.pageY - canvas.offsetTop - canvas.translationY;
        var containingShape = null;
        for (var i = 0; i < hoverableShapes.length; i++) {
            var shape = hoverableShapes[i];
            if (shape.worldContains(x, y)) {
                containingShape = shape;
                break; // Since there's only one cursor and no overlapping shapes, we can skip early.
            }
        }
        if (containingShape !== null) {
            document.body.style.cursor = "pointer";
            if (!hoverEffect) {
                hoverEffect = new __WEBPACK_IMPORTED_MODULE_4__processes__["e" /* HoverEffect */]({
                    shape: containingShape,
                    url: containingShape.url,
                    diameter: hexDiameter,
                    color: primaryColor,
                    maxLineWidth: 15,
                    minLineWidth: 6
                });
                processManager.push(hoverEffect);
            }
        }
        else {
            if (hoverEffect) {
                resolveHoverEffect();
            }
        }
    };
    canvas.onclick = function (e) {
        if (hoverEffect) {
            window.open(hoverEffect.url);
            resolveHoverEffect();
        }
    };
    function resolveHoverEffect() {
        document.body.style.cursor = "auto";
        hoverEffect.resolve();
        hoverEffect = null;
    }
    // Globals to simplify debugging.
    window.renderer = renderer;
    window.processManager = processManager;
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Renderer; });
var Renderer = (function () {
    function Renderer(canvas, shapes, translationFactorX, translationFactorY) {
        if (translationFactorX === void 0) { translationFactorX = 0.5; }
        if (translationFactorY === void 0) { translationFactorY = 0.5; }
        this.canvas = canvas;
        this.shapes = shapes;
        this.translationFactorX = translationFactorX;
        this.translationFactorY = translationFactorY;
        this.ctx = canvas.getContext("2d");
    }
    Renderer.prototype.step = function (dt) {
        var canvas = this.canvas, ctx = this.ctx;
        this.ensureCanvasValid(canvas, ctx);
        ctx.clearRect(-canvas.translationX, -canvas.translationY, canvas.width, canvas.height);
        this.renderShapes(ctx, this.shapes);
    };
    Renderer.prototype.renderShapes = function (ctx, shapes) {
        for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
            var shape = shapes_1[_i];
            var points = shape.worldPoints;
            if (points.length === 0)
                continue;
            // Setup path.
            ctx.beginPath();
            var p = points[points.length - 1];
            ctx.moveTo(p.x, p.y);
            for (var _a = 0, points_1 = points; _a < points_1.length; _a++) {
                p = points_1[_a];
                ctx.lineTo(p.x, p.y);
            }
            // Render.
            switch (shape.type) {
                case "pattern":
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    ctx.save();
                    var bounds = shape.worldBoundingRect;
                    ctx.translate(bounds.x, bounds.y);
                    ctx.fill();
                    ctx.restore();
                    break;
                case "fill":
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    ctx.fill();
                    break;
                case "stroke":
                    ctx.strokeStyle = this.styleOrDefault(shape.strokeStyle);
                    ctx.lineWidth = this.lineWidthOrDefault(shape);
                    ctx.stroke();
                    break;
                case "text":
                    ctx.font = this.fontOrDefault(shape);
                    ctx.textAlign = this.textAlignOrDefault(shape);
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    var translation = shape.absTranslation;
                    ctx.fillText(shape.text, translation.x, translation.y + shape.worldBoundingRect.height / 2);
                    break;
            }
            // Render children.
            // Child shapes are always clipped to their parents.
            if (shape._children.length > 0) {
                ctx.save();
                ctx.clip();
                this.renderShapes(ctx, shape._children);
                ctx.restore();
            }
        }
    };
    Renderer.prototype.styleOrDefault = function (style) { return style || "#EA2E49"; };
    Renderer.prototype.fontOrDefault = function (shape) { return shape.worldBoundingRect.height + "px " + (shape.font || "Arial"); };
    Renderer.prototype.textAlignOrDefault = function (shape) { return shape.textAlign || "start"; };
    Renderer.prototype.lineWidthOrDefault = function (shape) { return shape.lineWidth || 8; };
    ;
    Renderer.prototype.ensureCanvasValid = function (canvas, ctx) {
        if (canvas.clientWidth !== canvas.width || canvas.clientHeight !== canvas.height) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            canvas.translationX = canvas.width * this.translationFactorX;
            canvas.translationY = canvas.height * this.translationFactorY;
            ctx.translate(canvas.translationX, canvas.translationY);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        }
    };
    return Renderer;
}());



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return Wait; });
/* unused harmony export WaitProgress */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return WaitAllProcesses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return Translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GenerateRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GenerateRectDiagonally; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GenerateHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return HoverEffect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__process_manager__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Wait = (function (_super) {
    __extends(Wait, _super);
    function Wait() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wait.prototype.step = function (dt) {
        _super.prototype.step.call(this, dt);
    };
    return Wait;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

var WaitProgress = (function (_super) {
    __extends(WaitProgress, _super);
    function WaitProgress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaitProgress.prototype.step = function (dt) {
        _super.prototype.step.call(this, dt);
        if (this.progress >= this.target)
            this.resolve();
    };
    return WaitProgress;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

var WaitAllProcesses = (function (_super) {
    __extends(WaitAllProcesses, _super);
    function WaitAllProcesses() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaitAllProcesses.prototype.step = function (dt) {
        if (this.manager.resolvableProcesses.length <= 1)
            this.resolve();
    };
    return WaitAllProcesses;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

var Translate = (function (_super) {
    __extends(Translate, _super);
    function Translate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Translate.prototype.step = function (dt) {
        _super.prototype.step.call(this, dt);
        var translation = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].zero, this.target, this.progress);
        this.shape.translation = translation;
    };
    return Translate;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

var Rotate = (function (_super) {
    __extends(Rotate, _super);
    function Rotate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rotate.prototype.step = function (dt) {
        _super.prototype.step.call(this, dt);
        var rotation = this.progress * this.target;
        this.shape.rotation = rotation;
    };
    return Rotate;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

var AddShape = (function (_super) {
    __extends(AddShape, _super);
    function AddShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddShape.prototype.step = function (dt) {
        this.manager.shapes.push(this.shape);
        this.resolve();
    };
    return AddShape;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

var GenerateRect = (function (_super) {
    __extends(GenerateRect, _super);
    function GenerateRect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenerateRect.prototype.init = function () {
        this.x = this.x || 0, this.y = this.y || 0;
        this.target = __WEBPACK_IMPORTED_MODULE_1__shape__["a" /* Shape */].rect(this.x, this.y, this.width, this.height);
        addPoints(this.shape, 4, this.x, this.y);
        this.shape.points[2] = this.target.points[3];
        this.shape.points[3] = this.target.points[3];
    };
    GenerateRect.prototype.step = function (dt) {
        _super.prototype.step.call(this, dt);
        var points = this.shape.points, targetPoints = this.target.points, progress = this.progress;
        points[1] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[1], progress);
        points[2] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[3], targetPoints[2], progress);
        this.shape.setDirty();
    };
    return GenerateRect;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

var GenerateRectDiagonally = (function (_super) {
    __extends(GenerateRectDiagonally, _super);
    function GenerateRectDiagonally() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.phase = 0;
        return _this;
    }
    GenerateRectDiagonally.prototype.init = function () {
        this.x = this.x || 0, this.y = this.y || 0;
        this.target = __WEBPACK_IMPORTED_MODULE_1__shape__["a" /* Shape */].rect(this.x, this.y, this.width, this.height);
        this.duration = this.duration / 2; // 2 phases for full generation.
        addPoints(this.shape, 5, this.x, this.y);
    };
    GenerateRectDiagonally.prototype.step = function (dt) {
        this.elapsed += dt;
        var points = this.shape.points, targetPoints = this.target.points, progress = this.progress;
        if (this.phase === 0) {
            points[0] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[1], progress);
            points[1] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[1], progress);
            points[3] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[3], progress);
            points[4] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[3], progress);
            if (progress === 1)
                nextPhase(this);
        }
        else if (this.phase === 1) {
            points[0] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[1], targetPoints[2], progress);
            points[4] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[3], targetPoints[2], progress);
            if (progress === 1) {
                points.length = 4;
                this.resolve();
            }
        }
        this.shape.setDirty();
    };
    return GenerateRectDiagonally;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

var GenerateHex = (function (_super) {
    __extends(GenerateHex, _super);
    function GenerateHex() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.phase = 0;
        return _this;
    }
    GenerateHex.prototype.init = function () {
        this.x = this.x || 0, this.y = this.y || 0;
        this.target = __WEBPACK_IMPORTED_MODULE_1__shape__["a" /* Shape */].hex(this.x, this.y, this.diameter);
        this.duration = this.duration / 3; // 3 phases for full generation.
        addPoints(this.shape, 6, this.x, this.y);
    };
    GenerateHex.prototype.step = function (dt) {
        this.elapsed += dt;
        var points = this.shape.points, targetPoints = this.target.points, progress = this.progress;
        if (this.phase === 0) {
            points[0] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].zero, targetPoints[2], progress);
            points[1] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].zero, targetPoints[2], progress);
            points[2] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].zero, targetPoints[2], progress);
            points[3] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].zero, targetPoints[5], progress);
            points[4] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].zero, targetPoints[5], progress);
            points[5] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].zero, targetPoints[5], progress);
            if (progress === 1)
                nextPhase(this);
        }
        else if (this.phase === 1) {
            points[1] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[2], targetPoints[3], progress);
            points[2] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[2], targetPoints[3], progress);
            points[4] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[5], targetPoints[0], progress);
            points[5] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[5], targetPoints[0], progress);
            if (progress === 1)
                nextPhase(this);
        }
        else if (this.phase === 2) {
            points[2] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[3], targetPoints[4], progress);
            points[5] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[1], progress);
            if (progress === 1)
                this.resolve();
        }
        this.shape.setDirty();
    };
    return GenerateHex;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

var HoverEffect = (function (_super) {
    __extends(HoverEffect, _super);
    function HoverEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.phase = 0;
        _this.hoverShapes = [];
        return _this;
    }
    HoverEffect.prototype.init = function () {
        this.x = this.x || 0, this.y = this.y || 0;
        this.shapes = this.manager.shapes;
        this.target = __WEBPACK_IMPORTED_MODULE_1__shape__["a" /* Shape */].hex(this.x, this.y, this.diameter);
        var numShapes = 10;
        for (var i = 0; i < numShapes; i++) {
            this.hoverShapes.push(new __WEBPACK_IMPORTED_MODULE_1__shape__["a" /* Shape */]([this.target.points[0]], {
                translation: this.shape.translation,
                strokeStyle: this.color,
                lineWidth: this.minLineWidth + (this.maxLineWidth - this.minLineWidth) * i / numShapes
            }));
        }
        (_a = this.shapes).push.apply(_a, this.hoverShapes);
        this.duration = this.duration / 6; // 6 phases.
        this.endless = true;
        var _a;
    };
    HoverEffect.prototype.step = function (dt) {
        this.elapsed += dt;
        var targetPoints = this.target.points, hoverShapes = this.hoverShapes, progress = this.progress;
        for (var i = 0; i < hoverShapes.length - 1; i++) {
            hoverShapes[i].points[0] = hoverShapes[i + 1].points[0];
        }
        hoverShapes[hoverShapes.length - 1].points[0] = __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].lerp(targetPoints[this.phase], targetPoints[(this.phase + 1) % 6], progress);
        if (progress === 1)
            nextPhase(this, 6);
        for (var _i = 0, _a = this.hoverShapes; _i < _a.length; _i++) {
            var hoverShape = _a[_i];
            hoverShape.setDirty();
        }
    };
    HoverEffect.prototype.resolve = function () {
        _super.prototype.resolve.call(this);
        for (var _i = 0, _a = this.hoverShapes; _i < _a.length; _i++) {
            var hoverShape = _a[_i];
            this.shapes.splice(this.shapes.indexOf(hoverShape), 1);
        }
    };
    return HoverEffect;
}(__WEBPACK_IMPORTED_MODULE_2__process_manager__["a" /* Process */]));

function addPoints(shape, count, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    var points = Array.apply(null, { length: count }).map(function (_) { return new __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */](x, y); });
    (_a = shape.points).push.apply(_a, points);
    shape.setDirty();
    var _a;
}
function nextPhase(process, maxPhases) {
    if (maxPhases)
        process.phase = (process.phase + 1) % maxPhases;
    else
        process.phase++;
    process.elapsed = 0;
}


/***/ })
/******/ ]);