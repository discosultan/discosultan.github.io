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
var Vec2 = /** @class */ (function () {
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
    Vec2.zero = new Vec2(0, 0);
    Vec2.one = new Vec2(1, 1);
    return Vec2;
}());

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
/* unused harmony export Status */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Process; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProcessManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(0);

var Status;
(function (Status) {
    Status[Status["pending"] = 0] = "pending";
    Status[Status["fulfilled"] = 1] = "fulfilled";
    Status[Status["rejected"] = 2] = "rejected";
})(Status || (Status = {}));
;
var Process = /** @class */ (function () {
    function Process(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this._children = [];
        this.elapsed = 0;
        this.status = Status.pending;
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
    Process.prototype.resolve = function () { this.status = Status.fulfilled; };
    Process.prototype.reject = function () { this.status = Status.rejected; };
    Process.prototype.step = function (dt) {
        this.elapsed += dt;
        if (this.progress === 1)
            this.resolve();
    };
    return Process;
}());

var ProcessManager = /** @class */ (function () {
    function ProcessManager(canvas, shapes) {
        this.canvas = canvas;
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
            if (process.status === Status.fulfilled) {
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(0);

var Type;
(function (Type) {
    Type[Type["pattern"] = 0] = "pattern";
    Type[Type["image"] = 1] = "image";
    Type[Type["fill"] = 2] = "fill";
    Type[Type["stroke"] = 3] = "stroke";
    Type[Type["text"] = 4] = "text";
    Type[Type["none"] = 5] = "none";
})(Type || (Type = {}));
;
;
var Shape = /** @class */ (function () {
    function Shape(points, config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this.points = points;
        this.children = [];
        this._worldPoints = [];
        this.type = Type.stroke;
        this._pointsDirty = true;
        this._boundingRectDirty = true;
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
            if (this._pointsDirty) {
                this._worldPoints.length = 0;
                for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                    var point = _a[_i];
                    // const worldPoint = Vec2.transform(point, this.absScale, this.absRotation, this.absTranslation);
                    var worldPoint = this.absTransform(point);
                    this._worldPoints.push(worldPoint);
                }
                this._pointsDirty = false;
            }
            return this._worldPoints;
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype.absTransform = function (point) {
        if (this.parent) {
            point = this.parent.absTransform(point);
        }
        return __WEBPACK_IMPORTED_MODULE_0__math__["b" /* Vec2 */].transform(point, this.scale, this.rotation, this.translation);
    };
    Shape.prototype.absolute = function (selector, op) {
        var value = selector(this);
        return this.parent ? op(value, this.parent.absolute(selector, op)) : value;
    };
    Object.defineProperty(Shape.prototype, "worldBoundingRect", {
        get: function () {
            if (this._boundingRectDirty) {
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
                this._boundingRectDirty = false;
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
        (_b = this.children).push.apply(_b, args);
        return this;
        var _b;
    };
    Shape.prototype.setDirty = function () {
        this._pointsDirty = this._boundingRectDirty = true;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.setDirty();
        }
    };
    Shape.empty = function (config) {
        return new Shape([], config);
    };
    Shape.hex = function (x, y, diameter, config) {
        var a = diameter * 0.25;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__processes_general__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__processes_generation__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__processes_input__ = __webpack_require__(7);







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
    var processManager = new __WEBPACK_IMPORTED_MODULE_1__process_manager__["b" /* ProcessManager */](canvas, shapes);
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
    var translationNE = __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].rotate(base, Math.PI / 3), translationW = __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].rotate(base, Math.PI), translationSE = __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].rotate(base, 5 * Math.PI / 3);
    var hexMidContour = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].empty({ strokeStyle: primaryColor }), hexNEContour = newHex({ url: shapesMeta[1].url }), hexWContour = newHex({ url: shapesMeta[2].url }), hexSEContour = newHex({ url: shapesMeta[3].url });
    // shapes.push(hexMidContour); // Rest will be added during animation.
    // Hex fill mask will be added after contours are animated.
    var hexFillMask = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].empty({
        type: __WEBPACK_IMPORTED_MODULE_2__shape__["b" /* Type */].none,
        scale: flipVertically
    });
    var hexMidFill = newHex(), hexNEFill = newHex({ translation: translationNE }), hexWFill = newHex({ translation: translationW }), hexSEFill = newHex({ translation: translationSE });
    hexFillMask.push(
    // hexMidFill,
    // hexNEFill,
    hexWFill);
    function newHex(config) {
        if (config === void 0) { config = {}; }
        config.strokeStyle = primaryColor;
        return __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].hex(0, 0, hexDiameter, config);
    }
    // addFillRect(hexMidFill, shapesMeta[0].color, shapesMeta[0].img);
    // addFillRect(hexNEFill,  shapesMeta[1].color, shapesMeta[1].img);
    addFillRect(hexWFill, shapesMeta[2].color, shapesMeta[2].img);
    // addFillRect(hexSEFill,  shapesMeta[3].color, shapesMeta[3].img);
    function addFillRect(shape, color, img) {
        var bgFillRect = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].rect(-hexDiameter * 0.5, -hexDiameter * 0.5, hexDiameter, hexDiameter, {
            type: __WEBPACK_IMPORTED_MODULE_2__shape__["b" /* Type */].fill,
            fillStyle: color
        });
        shape.push(bgFillRect);
        // const imgFillRect = Shape.rect(0, 0, img.width, img.height, {
        //     type: ShapeType.pattern,
        //     fillStyle: ctx.createPattern(img, "no-repeat"),
        //     scale: flipVertically, // We flip it back because its ancestor was flipped.
        //     translation: new Vec2(-img.width/2, -img.height/2),
        // });
        var imgFillRect = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].rect(0, 0, img.width, img.height, {
            type: __WEBPACK_IMPORTED_MODULE_2__shape__["b" /* Type */].image,
            image: img,
            scale: flipVertically,
        });
        shape.push(imgFillRect);
    }
    var textRect = __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].empty({ type: __WEBPACK_IMPORTED_MODULE_2__shape__["b" /* Type */].none, translation: new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](60, -textRectHeight * 0.5) });
    // shapes.push(textRect);
    function createText(text, translation, scale) {
        return __WEBPACK_IMPORTED_MODULE_2__shape__["a" /* Shape */].rect(0, 0, textRectWidth, textRectHeight / 2, {
            type: __WEBPACK_IMPORTED_MODULE_2__shape__["b" /* Type */].text,
            font: font,
            text: text,
            fillStyle: primaryColor,
            translation: __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].add(new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](0, 10), translation),
            scale: scale
        });
    }
    textRect.push(createText(text1, __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */].zero, new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](1, 1)));
    textRect.push(createText(text2, new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](0, textRectHeight * 0.5), new __WEBPACK_IMPORTED_MODULE_3__math__["b" /* Vec2 */](1, 0.6)));
    processManager.push(new __WEBPACK_IMPORTED_MODULE_4__processes_general__["c" /* Wait */]({ duration: 0 }).push(
    // new Generation.GenerateHex({ shape: hexMidContour, easingFn: easingFn, diameter: hexDiameter, duration: hexGenDuration }).push(
    //     new General.Rotate({ shape: hexMidContour, easingFn: easingFn, target: -Math.TWO_PI, duration: rotationDuration }).push(
    //         // addTranslateHex(hexWContour,  translationW),
    //         // addTranslateHex(hexSEContour, translationSE),
    //         // addTranslateHex(hexNEContour, translationNE)
    //     )
    // ),
    new __WEBPACK_IMPORTED_MODULE_4__processes_general__["d" /* WaitAllProcesses */]().push(new __WEBPACK_IMPORTED_MODULE_4__processes_general__["a" /* Execute */]({ command: function () { return shapes.push(hexFillMask); } }).push(new __WEBPACK_IMPORTED_MODULE_5__processes_generation__["a" /* GenerateRectDiagonally */]({
        shape: hexFillMask,
        x: -hexDiameter * 1,
        y: -hexDiameter * 1.5,
        width: hexDiameter * 2.5,
        height: hexDiameter * 3,
        duration: shapeFillDuration
    })), 
    // new Generation.GenerateRect({
    //     shape: textRect,
    //     width: textRectWidth,
    //     height: textRectHeight,
    //     duration: shapeFillDuration
    // }),
    new __WEBPACK_IMPORTED_MODULE_6__processes_input__["a" /* Navigation */]({ shapes: [hexNEContour, hexWContour, hexSEContour] }))));
    function addTranslateHex(shape, translation) {
        return new __WEBPACK_IMPORTED_MODULE_4__processes_general__["a" /* Execute */]({ command: function () { return shapes.push(shape); } }).push(new __WEBPACK_IMPORTED_MODULE_4__processes_general__["b" /* Translate */]({
            shape: shape,
            easingFn: easingFn,
            duration: hexTranslationDuration,
            target: translation
        }));
    }
    processManager.push(new __WEBPACK_IMPORTED_MODULE_6__processes_input__["b" /* ResolveProcessesOnEsc */]());
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
    processManager.push();
    // Globals to simplify debugging.
    window.renderer = renderer;
    window.processManager = processManager;
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Renderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shape__ = __webpack_require__(2);

var Renderer = /** @class */ (function () {
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
        var _a = this, canvas = _a.canvas, ctx = _a.ctx;
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
                case __WEBPACK_IMPORTED_MODULE_0__shape__["b" /* Type */].pattern:
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    ctx.save();
                    var patternBounds = shape.worldBoundingRect;
                    ctx.translate(patternBounds.x, patternBounds.y);
                    ctx.fill();
                    ctx.restore();
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__shape__["b" /* Type */].image:
                    var imgBounds = shape.worldBoundingRect;
                    ctx.drawImage(shape.image, imgBounds.x, imgBounds.y, imgBounds.width, imgBounds.height);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__shape__["b" /* Type */].fill:
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    ctx.fill();
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__shape__["b" /* Type */].stroke:
                    ctx.strokeStyle = this.styleOrDefault(shape.strokeStyle);
                    ctx.lineWidth = this.lineWidthOrDefault(shape);
                    ctx.stroke();
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__shape__["b" /* Type */].text:
                    ctx.font = this.fontOrDefault(shape);
                    ctx.textAlign = this.textAlignOrDefault(shape);
                    ctx.fillStyle = this.styleOrDefault(shape.fillStyle);
                    var translation = shape.absTranslation;
                    ctx.fillText(shape.text, translation.x, translation.y + shape.worldBoundingRect.height / 2);
                    break;
            }
            // Render children.
            // Child shapes are always clipped to their parents.
            if (shape.children.length > 0) {
                ctx.save();
                ctx.clip();
                this.renderShapes(ctx, shape.children);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Wait; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return WaitAllProcesses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Translate; });
/* unused harmony export Rotate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Execute; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__process_manager__ = __webpack_require__(1);
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


var Wait = /** @class */ (function (_super) {
    __extends(Wait, _super);
    function Wait() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wait.prototype.step = function (dt) {
        _super.prototype.step.call(this, dt);
    };
    return Wait;
}(__WEBPACK_IMPORTED_MODULE_1__process_manager__["a" /* Process */]));

var WaitAllProcesses = /** @class */ (function (_super) {
    __extends(WaitAllProcesses, _super);
    function WaitAllProcesses() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaitAllProcesses.prototype.step = function (dt) {
        if (this.manager.resolvableProcesses.length <= 1)
            this.resolve();
    };
    return WaitAllProcesses;
}(__WEBPACK_IMPORTED_MODULE_1__process_manager__["a" /* Process */]));

var Translate = /** @class */ (function (_super) {
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
}(__WEBPACK_IMPORTED_MODULE_1__process_manager__["a" /* Process */]));

var Rotate = /** @class */ (function (_super) {
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
}(__WEBPACK_IMPORTED_MODULE_1__process_manager__["a" /* Process */]));

var Execute = /** @class */ (function (_super) {
    __extends(Execute, _super);
    function Execute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Execute.prototype.step = function (dt) {
        this.command();
        this.resolve();
    };
    return Execute;
}(__WEBPACK_IMPORTED_MODULE_1__process_manager__["a" /* Process */]));



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GenerateRect */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenerateRectDiagonally; });
/* unused harmony export GenerateHex */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__process_manager__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(0);
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



var GenerateRect = /** @class */ (function (_super) {
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
        var progress = this.progress;
        var points = this.shape.points;
        var targetPoints = this.target.points;
        points[1] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[1], progress);
        points[2] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[3], targetPoints[2], progress);
        this.shape.setDirty();
    };
    return GenerateRect;
}(__WEBPACK_IMPORTED_MODULE_0__process_manager__["a" /* Process */]));

var GenerateRectDiagonally = /** @class */ (function (_super) {
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
        var progress = this.progress;
        var points = this.shape.points;
        var targetPoints = this.target.points;
        if (this.phase === 0) {
            points[0] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[1], progress);
            points[1] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[1], progress);
            points[3] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[3], progress);
            points[4] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[3], progress);
            if (progress === 1)
                nextPhase(this);
        }
        else if (this.phase === 1) {
            points[0] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[1], targetPoints[2], progress);
            points[4] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[3], targetPoints[2], progress);
            if (progress === 1) {
                points.length = 4;
                this.resolve();
            }
        }
        this.shape.setDirty();
    };
    return GenerateRectDiagonally;
}(__WEBPACK_IMPORTED_MODULE_0__process_manager__["a" /* Process */]));

var GenerateHex = /** @class */ (function (_super) {
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
        var progress = this.progress;
        var points = this.shape.points;
        var targetPoints = this.target.points;
        if (this.phase === 0) {
            points[0] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].zero, targetPoints[2], progress);
            points[1] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].zero, targetPoints[2], progress);
            points[2] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].zero, targetPoints[2], progress);
            points[3] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].zero, targetPoints[5], progress);
            points[4] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].zero, targetPoints[5], progress);
            points[5] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(__WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].zero, targetPoints[5], progress);
            if (progress === 1)
                nextPhase(this);
        }
        else if (this.phase === 1) {
            points[1] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[2], targetPoints[3], progress);
            points[2] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[2], targetPoints[3], progress);
            points[4] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[5], targetPoints[0], progress);
            points[5] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[5], targetPoints[0], progress);
            if (progress === 1)
                nextPhase(this);
        }
        else if (this.phase === 2) {
            points[2] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[3], targetPoints[4], progress);
            points[5] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(targetPoints[0], targetPoints[1], progress);
            if (progress === 1)
                this.resolve();
        }
        this.shape.setDirty();
    };
    return GenerateHex;
}(__WEBPACK_IMPORTED_MODULE_0__process_manager__["a" /* Process */]));

function addPoints(shape, count, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    var points = Array.apply(null, { length: count }).map(function (_) { return new __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */](x, y); });
    (_a = shape.points).push.apply(_a, points);
    shape.setDirty();
    var _a;
}
function nextPhase(process) {
    process.phase++;
    process.elapsed = 0;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ResolveProcessesOnEsc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Navigation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__process_manager__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trails__ = __webpack_require__(8);
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


var ResolveProcessesOnEsc = /** @class */ (function (_super) {
    __extends(ResolveProcessesOnEsc, _super);
    function ResolveProcessesOnEsc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResolveProcessesOnEsc.prototype.init = function () {
        this.boundedOnKeyDown = this.onKeyDown.bind(this);
        window.addEventListener("keydown", this.boundedOnKeyDown);
        this.endless = true;
    };
    ResolveProcessesOnEsc.prototype.step = function (dt) { };
    ResolveProcessesOnEsc.prototype.resolve = function () {
        _super.prototype.resolve.call(this);
        window.removeEventListener("keydown", this.boundedOnKeyDown);
    };
    ResolveProcessesOnEsc.prototype.onKeyDown = function (e) {
        // Resolve all pending processes on ESC key.
        if (e.keyCode === 27)
            this.manager.resolveAll();
    };
    return ResolveProcessesOnEsc;
}(__WEBPACK_IMPORTED_MODULE_0__process_manager__["a" /* Process */]));

var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hoverEffect = null;
        return _this;
    }
    Navigation.prototype.init = function () {
        var canvas = this.manager.canvas;
        this.boundedOnMouseMove = this.onMouseMove.bind(this);
        this.boundedOnClick = this.onClick.bind(this);
        canvas.addEventListener("mousemove", this.boundedOnMouseMove);
        canvas.addEventListener("click", this.boundedOnClick);
        this.endless = true;
    };
    Navigation.prototype.step = function (dt) { };
    Navigation.prototype.resolve = function () {
        _super.prototype.resolve.call(this);
        var canvas = this.manager.canvas;
        canvas.removeEventListener("click", this.boundedOnClick);
        canvas.removeEventListener("mousemove", this.boundedOnMouseMove);
    };
    Navigation.prototype.onMouseMove = function (e) {
        var canvas = this.manager.canvas;
        var x = e.pageX - canvas.offsetLeft - canvas.translationX, y = e.pageY - canvas.offsetTop - canvas.translationY;
        var containingShape = null;
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            if (shape.worldContains(x, y)) {
                containingShape = shape;
                break; // Since there's only one cursor and no overlapping shapes, we can skip early.
            }
        }
        if (containingShape !== null) {
            document.body.style.cursor = "pointer";
            if (this.hoverEffect === null) {
                this.hoverEffect = new __WEBPACK_IMPORTED_MODULE_1__trails__["a" /* ContourTrail */]({
                    shape: containingShape,
                    color: this.primaryColor,
                    maxLineWidth: 15,
                    minLineWidth: 6
                });
                this.manager.push(this.hoverEffect);
            }
        }
        else {
            if (this.hoverEffect !== null) {
                this.resolveHoverEffect();
            }
        }
    };
    Navigation.prototype.onClick = function (e) {
        if (this.hoverEffect !== null) {
            window.open(this.hoverEffect.shape.url);
            this.resolveHoverEffect();
        }
    };
    Navigation.prototype.resolveHoverEffect = function () {
        document.body.style.cursor = "auto";
        this.hoverEffect.resolve();
        this.hoverEffect = null;
    };
    return Navigation;
}(__WEBPACK_IMPORTED_MODULE_0__process_manager__["a" /* Process */]));



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContourTrail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__process_manager__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(0);
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



var ContourTrail = /** @class */ (function (_super) {
    __extends(ContourTrail, _super);
    function ContourTrail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.phase = 0;
        _this.hoverShapes = [];
        return _this;
    }
    ContourTrail.prototype.init = function () {
        var numShapes = 10;
        for (var i = 0; i < numShapes; i++) {
            this.hoverShapes.push(new __WEBPACK_IMPORTED_MODULE_1__shape__["a" /* Shape */]([this.shape.points[0]], {
                translation: this.shape.translation,
                strokeStyle: this.shape.strokeStyle,
                lineWidth: this.minLineWidth + (this.maxLineWidth - this.minLineWidth) * i / numShapes
            }));
        }
        (_a = this.manager.shapes).push.apply(_a, this.hoverShapes);
        this.duration = this.duration / this.shape.points.length;
        this.endless = true;
        var _a;
    };
    ContourTrail.prototype.step = function (dt) {
        this.elapsed += dt;
        var _a = this, hoverShapes = _a.hoverShapes, progress = _a.progress;
        var points = this.shape.points;
        for (var i = 0; i < hoverShapes.length - 1; i++) {
            hoverShapes[i].points[0] = hoverShapes[i + 1].points[0];
        }
        hoverShapes[hoverShapes.length - 1].points[0] = __WEBPACK_IMPORTED_MODULE_2__math__["b" /* Vec2 */].lerp(points[this.phase], points[(this.phase + 1) % points.length], progress);
        if (progress === 1)
            nextPhase(this, points.length);
        for (var _i = 0, _b = this.hoverShapes; _i < _b.length; _i++) {
            var hoverShape = _b[_i];
            hoverShape.setDirty();
        }
    };
    ContourTrail.prototype.resolve = function () {
        _super.prototype.resolve.call(this);
        var shapes = this.manager.shapes;
        for (var _i = 0, _a = this.hoverShapes; _i < _a.length; _i++) {
            var hoverShape = _a[_i];
            shapes.splice(shapes.indexOf(hoverShape), 1);
        }
    };
    return ContourTrail;
}(__WEBPACK_IMPORTED_MODULE_0__process_manager__["a" /* Process */]));

function nextPhase(process, maxPhases) {
    process.phase = (process.phase + 1) % maxPhases;
    process.elapsed = 0;
}


/***/ })
/******/ ]);