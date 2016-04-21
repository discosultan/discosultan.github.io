// Assumes global access to three.js and window object.
function App(container) {
    // Setup helper variables.
    var zeroVector = new THREE.Vector3(0,0,0);

    // Setup renderer.
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xDDDDDD);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Setup scene.
    var scene = new THREE.Scene();

    // Setup camera.
    var camera = new THREE.PerspectiveCamera(
        45,
        container.offsetWidth / container.offsetHeight,
        0.1, 1000);
    // camera.position.set(-20, 25, 20);

    var cameraAxisOfRotation = new THREE.Vector3(0.35, 1.0, 0.35);
    cameraAxisOfRotation.normalize();
    camera.up.set(cameraAxisOfRotation.x, cameraAxisOfRotation.y, cameraAxisOfRotation.z);
    // camera.up.set(1,0,0);
    camera.position.set(100, 0, 0);
    camera.rotationSpeed = Math.PI * 0.025;
    // camera.lookAt(zeroVector);

    this.resize = function() {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
    };

    // Create geometry.
    var geometry = createGeometry();
    // Setup material.
    var uniforms = { age: { type: 'f', value: Math.PI } };
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: SHADERS.vertex,
        fragmentShader: SHADERS.fragment,
        vertexColors: THREE.VertexColors
    });
    // Create mesh and add to scene.
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var previousTimestamp = 0;
    requestAnimationFrame(render);

    function render(timestamp) {
        var deltaSeconds = (timestamp - previousTimestamp) * 0.001;
        previousTimestamp = timestamp;
        uniforms.age.value += deltaSeconds;

        // Rotate camera.
        var angle = camera.rotationSpeed * deltaSeconds;
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        camera.position.set(
          camera.position.x*c - camera.position.z*s,
          0,
          camera.position.x*s + camera.position.z*c);
        camera.lookAt(zeroVector);

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function createGeometry() {
        // Create an unindexed buffer.
        var numCubes = 6000;
        var numTrianglesPerCube = 12;
        var numTriangles = numTrianglesPerCube * numCubes;

        var halfSize = 0.5; // half cube side length.

        var v1 = new THREE.Vector3(-halfSize, -halfSize, -halfSize);
        var v2 = new THREE.Vector3(+halfSize, -halfSize, -halfSize);
        var v3 = new THREE.Vector3(+halfSize, +halfSize, -halfSize);
        var v4 = new THREE.Vector3(-halfSize, +halfSize, -halfSize);

        var v5 = new THREE.Vector3(-halfSize, -halfSize, +halfSize);
        var v6 = new THREE.Vector3(+halfSize, -halfSize, +halfSize);
        var v7 = new THREE.Vector3(+halfSize, +halfSize, +halfSize);
        var v8 = new THREE.Vector3(-halfSize, +halfSize, +halfSize);

        var positions = new Float32Array(numTriangles * 3 * 3); // 3 components per vertex and 3 vertices per triangle.
        var normals = new Float32Array(numTriangles * 3 * 3);
        var colors = new Float32Array(numTriangles * 3 * 3);
        var randoms = new Float32Array(numTriangles * 3 * 3);

        var cb = new THREE.Vector3();
        var ab = new THREE.Vector3();

        var pa = new THREE.Vector3();
        var pb = new THREE.Vector3();
        var pc = new THREE.Vector3();

        var rv = new THREE.Vector3();
        var rv2 = new THREE.Vector3();

        for (var i = 0; i < numTriangles; i += numTrianglesPerCube) {
            // Create random unit vector (uniform distribution).
            // Ref: http://www.gamedev.net/topic/499972-generate-a-random-unit-vector/
            var azimuth = Math.random() * 2 * Math.PI;
            var cosAzimuth = Math.cos(azimuth);
            var sinAzimuth = Math.sin(azimuth);
            var planarZ = 2 * Math.random() - 1; // in range [-1...1]
            var sqrtInvPlanarZSq = Math.sqrt(1 - planarZ*planarZ);
            var planarX = cosAzimuth * sqrtInvPlanarZSq;
            var planarY = sinAzimuth * sqrtInvPlanarZSq;
            rv.set(planarX, planarY, planarZ);
            // rv.set(0.0, 0.0, -1.0);
            // rv.set(Math.random(), Math.random(), Math.random());

            rv2.set(Math.random(), Math.random(), Math.random());

            addTriangle(i + 0, v1, v2, v4, rv, rv2);
            addTriangle(i + 1, v2, v3, v4, rv, rv2);

            addTriangle(i + 2, v8, v6, v5, rv, rv2);
            addTriangle(i + 3, v8, v7, v6, rv, rv2);

            addTriangle(i + 4, v5, v2, v1, rv, rv2);
            addTriangle(i + 5, v5, v6, v2, rv, rv2);

            addTriangle(i + 6, v6, v3, v2, rv, rv2);
            addTriangle(i + 7, v6, v7, v3, rv, rv2);

            addTriangle(i + 8, v7, v4, v3, rv, rv2);
            addTriangle(i + 9, v7, v8, v4, rv, rv2);

            addTriangle(i + 10, v1, v4, v5, rv, rv2);
            addTriangle(i + 11, v4, v8, v5, rv, rv2);
        }

        function addTriangle(k, vc, vb, va, rv, rv2) {
            // Setup positions.

            pa.copy(va);
            pb.copy(vb);
            pc.copy(vc);

            var ax = pa.x;
            var ay = pa.y;
            var az = pa.z;

            var bx = pb.x;
            var by = pb.y;
            var bz = pb.z;

            var cx = pc.x;
            var cy = pc.y;
            var cz = pc.z;

            var j = k * 9;

            positions[j + 0] = ax;
            positions[j + 1] = ay;
            positions[j + 2] = az;

            positions[j + 3] = bx;
            positions[j + 4] = by;
            positions[j + 5] = bz;

            positions[j + 6] = cx;
            positions[j + 7] = cy;
            positions[j + 8] = cz;

            // Setup flat face normals.

            pa.set(ax, ay, az);
            pb.set(bx, by, bz);
            pc.set(cx, cy, cz);

            cb.subVectors(pc, pb);
            ab.subVectors(pa, pb);
            cb.cross(ab);
            cb.normalize();

            var nx = cb.x;
            var ny = cb.y;
            var nz = cb.z;

            normals[j + 0] = nx;
            normals[j + 1] = ny;
            normals[j + 2] = nz;

            normals[j + 3] = nx;
            normals[j + 4] = ny;
            normals[j + 5] = nz;

            normals[j + 6] = nx;
            normals[j + 7] = ny;
            normals[j + 8] = nz;

            colors[j + 0] = rv.x;
            colors[j + 1] = rv.y;
            colors[j + 2] = rv.z;

            colors[j + 3] = rv.x;
            colors[j + 4] = rv.y;
            colors[j + 5] = rv.z;

            colors[j + 6] = rv.x;
            colors[j + 7] = rv.y;
            colors[j + 8] = rv.z;

            randoms[j + 0] = rv2.x;
            randoms[j + 1] = rv2.y;
            randoms[j + 2] = rv2.z;

            randoms[j + 3] = rv2.x;
            randoms[j + 4] = rv2.y;
            randoms[j + 5] = rv2.z;

            randoms[j + 6] = rv2.x;
            randoms[j + 7] = rv2.y;
            randoms[j + 8] = rv2.z;
        }

        var result = new THREE.BufferGeometry();
        result.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        result.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
        result.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        result.addAttribute('random', new THREE.BufferAttribute(randoms, 3));
        result.computeBoundingSphere(); // used for frustum culling by three.js.
        return result;
    }
}
