// Assumes global access to three.js and window object.
function App(container) {
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
    camera.position.set(-20, 25, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.resize = function() {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
    };

    // Create geometry.
    var geometry = createGeometry();
    // Setup material.
    var uniforms = { age: { type: 'f', value: 0.0 } };
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: SHADERS.vertex,
        fragmentShader: SHADERS.fragment
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

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function createGeometry() {
        // Create an unindexed buffer.
        var numCubes = 1;
        var numTrianglesPerCube = 12;
        var numTriangles = numTrianglesPerCube * numCubes;

        var halfSize = 2; // half cube side length.

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

        var cb = new THREE.Vector3();
        var ab = new THREE.Vector3();

        var pa = new THREE.Vector3();
        var pb = new THREE.Vector3();
        var pc = new THREE.Vector3();

        for (var i = 0; i < numTriangles; i += numTrianglesPerCube) {
            // Randomize position for each cube.
            var x = 0;
            var y = 0;
            var z = 0;

            addTriangle(i + 0, x, y, z, v1, v2, v4);
            addTriangle(i + 1, x, y, z, v2, v3, v4);

            addTriangle(i + 2, x, y, z, v8, v6, v5);
            addTriangle(i + 3, x, y, z, v8, v7, v6);

            addTriangle(i + 4, x, y, z, v5, v2, v1);
            addTriangle(i + 5, x, y, z, v5, v6, v2);

            addTriangle(i + 6, x, y, z, v6, v3, v2);
            addTriangle(i + 7, x, y, z, v6, v7, v3);

            addTriangle(i + 8, x, y, z, v7, v4, v3);
            addTriangle(i + 9, x, y, z, v7, v8, v4);

            addTriangle(i + 10, x, y, z, v1, v4, v5);
            addTriangle(i + 11, x, y, z, v4, v8, v5);
        }

        function addTriangle(k, x, y, z, vc, vb, va) {
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
        }

        var result = new THREE.BufferGeometry();
        result.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        result.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
        result.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        result.computeBoundingSphere(); // used for frustum culling by three.js.
        return result;
    }
}
