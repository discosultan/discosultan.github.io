function Menu(container, simulation) {
    var CAMERA_ROTATION_AMOUNT = Math.PI * 0.5;
    var CAMERA_ROTATION_SECONDS = 0.4;

    var elements = container.getElementsByClassName('menu-element');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.dataset.index = i;
        element.addEventListener('click', function() {
            var index = parseInt(this.dataset.index);
            if (index === 1) { // left
                rotateElementsRight(elements);
            } else if (index === 3) { // right
                rotateElementsLeft(elements);
            }
        });
    }

    var previousTimestamp = 0;
    var processes = [];
    requestAnimationFrame(update);

    function update(timestamp) {
        var deltaSeconds = (timestamp - previousTimestamp) * 0.001;
        previousTimestamp = timestamp;

        for (var i = processes.length - 1; i >= 0; i--) {
            var process = processes[i];
            process.update(deltaSeconds);
            if (process.finished) {
                processes.splice(i, 1);
            }
        }

        requestAnimationFrame(update);
    }

    function rotateElementsLeft(elements) {
        var count = elements.length;
        for (var i = 0; i < count; i++) {
            var element = elements[i];
            var index = parseInt(element.dataset.index);
            index -= 1;
            if (index < 0) {
                index = count - 1;
            }
            element.dataset.index = index;
        }
        assignElementsClasses(elements);
        processes.push(new CameraRotationProcess(CAMERA_ROTATION_AMOUNT, CAMERA_ROTATION_SECONDS));
    }

    function rotateElementsRight(elements) {
        var count = elements.length;
        for (var i = 0; i < count; i++) {
            var element = elements[i];
            var index = parseInt(element.dataset.index);
            index = (index + 1) % count;
            element.dataset.index = index;
        }
        assignElementsClasses(elements);
        processes.push(new CameraRotationProcess(-CAMERA_ROTATION_AMOUNT, CAMERA_ROTATION_SECONDS));
    }

    function assignElementsClasses(elements) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.classList.remove('left-out');
            element.classList.remove('left');
            element.classList.remove('center');
            element.classList.remove('right');
            element.classList.remove('right-out');
            element.classList.remove('hide');
            var index = parseInt(element.dataset.index);
            switch (index) {
                case 0:
                    element.classList.add('left-out');
                    break;
                case 1:
                    element.classList.add('left');
                    break;
                case 2:
                    element.classList.add('center');
                    break;
                case 3:
                    element.classList.add('right');
                    break;
                case 4:
                    element.classList.add('right-out');
                    break;
                default:
                    element.classList.add('hide');
                    break;
            }
        }
    }

    function CameraRotationProcess(amount, seconds) {
        var self = this;
        this.finished = false;
        this.elapsedSeconds = 0;

        var bezier = new UnitBezier(0.250, 0.100, 0.250, 1.000);

        this.update = function(deltaSeconds) {
            self.elapsedSeconds += deltaSeconds;
            if (self.elapsedSeconds >= seconds) {
                self.finished = true;
            }

            var progress = self.elapsedSeconds / seconds;
            var y = bezier.sampleCurveY(progress);
            simulation.cameraRotation += y * deltaSeconds;

            // simulation.cameraRotation += deltaSeconds * amount / seconds;
        }

        // function lerp(v0, v1, t) {
        //     return v0 + t*(v1 - v0);
        // }
    }

    /**
    * Solver for cubic bezier curve with implicit control points at (0,0) and (1.0, 1.0)
    * Ref: http://stackoverflow.com/a/11697909/1466456
    */
    function UnitBezier(p1x, p1y, p2x, p2y) {
        // pre-calculate the polynomial coefficients
        // First and last control points are implied to be (0,0) and (1.0, 1.0)
        this.cx = 3.0 * p1x;
        this.bx = 3.0 * (p2x - p1x) - this.cx;
        this.ax = 1.0 - this.cx -this.bx;

        this.cy = 3.0 * p1y;
        this.by = 3.0 * (p2y - p1y) - this.cy;
        this.ay = 1.0 - this.cy - this.by;
    }

    UnitBezier.prototype.sampleCurveY = function (t) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
    }

    UnitBezier.prototype.sampleCurveX = function(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    }
}
