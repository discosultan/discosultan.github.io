function App(container) {
    // Setup helper variables.
    var zeroVector = new THREE.Vector3(0, 0, 0);
    var gui = new dat.GUI();

    // Setup renderer.
    var renderer = new THREE.WebGLRenderer({
        antialias: false,
        stencil: false,
        preserveDrawingBuffer: true
    });

    this.clearColor = new THREE.Color(0x07070C);

    var folder = gui.addFolder('App');
    addObjectToDatGUI(folder, 'ClearColor', this.clearColor, function(color) { renderer.setClearColor(color); });
    folder.open();

    renderer.setClearColor(this.clearColor);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.autoClear = false;
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);

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

    // Setup scene.
    var scene = new THREE.Scene();
    // Create geometry.
    var geometry = createGeometry();
    // Setup materials.
    var diffuseMaterial = new THREE.ShaderMaterial(THREE.Effects.cubesDiffuse);
    addMaterialToDatGUI("Cubes", diffuseMaterial);
    // var randomAge = Math.PI + Math.random() * Math.PI * 2;
    // diffuseMaterial.uniforms.age.value = randomAge;
    // depthMaterial.uniforms.age.value = randomAge;
    // Create mesh and add to scene.
    var cubesMesh = new THREE.Mesh(geometry, diffuseMaterial);
    scene.add(cubesMesh);

    // Create volumetric light scattering (god rays) post process
    var godRays = createGodRaysPostProcess();

    this.resize = function() {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        godRays.resize();
    };

    var previousTimestamp = 0;
    requestAnimationFrame(render);

    function render(timestamp) {
        var deltaSeconds = (timestamp - previousTimestamp) * 0.001;
        previousTimestamp = timestamp;
        diffuseMaterial.uniforms.fAge.value += deltaSeconds;

        // Rotate camera.
        var angle = camera.rotationSpeed * deltaSeconds;
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        camera.position.set(
            camera.position.x * c - camera.position.z * s,
            0,
            camera.position.x * s + camera.position.z * c);
        camera.lookAt(zeroVector);

        if (godRays.enabled) {
            godRays.render();
        } else {
            renderer.clear(true, true, false);
            renderer.render(scene, camera);
        }
        requestAnimationFrame(render);
    }

    function createGodRaysPostProcess() {
        var blackMaterial = new THREE.ShaderMaterial(THREE.Effects.cubesBlack);

        var godRaysMaterial = new THREE.ShaderMaterial(THREE.Effects.godRays);
        var additiveMaterial = new THREE.ShaderMaterial(THREE.Effects.additive);
        var horizontalBlurMaterial = new THREE.ShaderMaterial(THREE.Effects.horizontalBlur);
        var verticalBlurMaterial = new THREE.ShaderMaterial(THREE.Effects.verticalBlur);
        addMaterialToDatGUI("God Rays", godRaysMaterial);

        var lightColor = new THREE.Color(0.349, 1.0, 1.0);
        var occlusionScene = new THREE.Scene();
        var lightMesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(5, 3),
            new THREE.MeshBasicMaterial({
                color: lightColor
            })
        );
        var cubesMeshBlack = new THREE.Mesh(geometry, blackMaterial);
        occlusionScene.add(lightMesh);
        occlusionScene.add(cubesMeshBlack);

        var quadScene = new THREE.Scene();
        var quadMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), godRaysMaterial);
        quadScene.add(quadMesh);

        var godRays = {
            enabled: true
        };

        var diffuseRT, godRaysRT1, godRaysRT2;
        (godRays.resize = function() {
            horizontalBlurMaterial.uniforms.fH.value = 1 / container.offsetWidth;
            verticalBlurMaterial.uniforms.fV.value = 1 / container.offsetHeight;
            setupRenderTargets();
        })();

        godRays.render = function() {
            blackMaterial.uniforms.fAge.value = diffuseMaterial.uniforms.fAge.value;

            renderer.clearTarget(diffuseRT, true, true, false);
            renderer.render(scene, camera, diffuseRT);

            renderer.render(occlusionScene, camera, godRaysRT1, true);

            // Blur.
            horizontalBlurMaterial.uniforms.tDiffuse.value = godRaysRT1;
            quadScene.overrideMaterial = horizontalBlurMaterial;
            renderer.render(quadScene, camera, godRaysRT2);

            verticalBlurMaterial.uniforms.tDiffuse.value = godRaysRT2;
            quadScene.overrideMaterial = verticalBlurMaterial;
            renderer.render(quadScene, camera, godRaysRT1);

            horizontalBlurMaterial.uniforms.tDiffuse.value = godRaysRT1;
            quadScene.overrideMaterial = horizontalBlurMaterial;
            renderer.render(quadScene, camera, godRaysRT2);

            verticalBlurMaterial.uniforms.tDiffuse.value = godRaysRT2;
            quadScene.overrideMaterial = verticalBlurMaterial;
            renderer.render(quadScene, camera, godRaysRT1);

            // Gen god rays.
            godRaysMaterial.uniforms.tDiffuse.value = godRaysRT1;
            quadScene.overrideMaterial = godRaysMaterial;
            renderer.render(quadScene, camera, godRaysRT2);

            // Final pass - combine.
            additiveMaterial.uniforms.tDiffuse.value = diffuseRT;
            additiveMaterial.uniforms.tAdd.value = godRaysRT2;
            quadScene.overrideMaterial = additiveMaterial;
            renderer.render(quadScene, camera);
        };

        return godRays;

        function setupRenderTargets() {
            var rtParams = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBFormat
            };
            var w = container.offsetWidth,
                h = container.offsetHeight;
            // var reducedSizeFactor = 1.0;
            var reducedSizeFactor = 0.5;
            // var reducedSizeFactor = 0.25;
            diffuseRT = new THREE.WebGLRenderTarget(w, h, rtParams);
            godRaysRT1 = new THREE.WebGLRenderTarget(w * reducedSizeFactor, h * reducedSizeFactor, rtParams);
            godRaysRT2 = new THREE.WebGLRenderTarget(w * reducedSizeFactor, h * reducedSizeFactor, rtParams);
        }
    }

    function addMaterialToDatGUI(name, material) {
        var folder = gui.addFolder(name);
        for (var property in material.uniforms) {
            // Check if is own property and filter age uniforms.
            if (material.uniforms.hasOwnProperty(property) && property !== 'fAge') {
                var uniform = material.uniforms[property];
                var value = uniform.value;
                // Do not add textures.
                if (uniform.type === 't') continue;

                if (typeof value === 'object') {
                    addObjectToDatGUI(folder, getName(uniform, property), value);
                } else {
                    folder.add(uniform, 'value').name(getName(uniform, property));
                }
            }
        }
        folder.open();

        function getName(uniform, property) {
            return property.substring(uniform.type.length);
        }
    }

    function addObjectToDatGUI(folder, name, value, onChange) {
        var subfolder = folder.addFolder(name);
        for (var property in value) {
            if (value.hasOwnProperty(property)) {
                var ctrl = subfolder.add(value, property);
                if (onChange) {
                    ctrl.onChange(function (propertyValue) { onChange(value); });
                }
            }
        }
    }

    function createGeometry() {
        // Create an unindexed buffer.
        var numCubes = 5000;
        var numTrianglesPerCube = 12;
        var numTriangles = numTrianglesPerCube * numCubes;

        var halfSize = 0.6; // half cube side length.

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
        var randoms1 = new Float32Array(numTriangles * 3 * 3);
        var randoms2 = new Float32Array(numTriangles * 4 * 3); // 4 components per vertex and 3 vertices per triangle.

        var cb = new THREE.Vector3();
        var ab = new THREE.Vector3();

        var pa = new THREE.Vector3();
        var pb = new THREE.Vector3();
        var pc = new THREE.Vector3();

        var rv1 = new THREE.Vector3();
        var rv2 = new THREE.Vector3();
        var rv3 = new THREE.Vector4();

        for (var i = 0; i < numTriangles; i += numTrianglesPerCube) {
            // Create random unit vector (uniform distribution).
            // Ref: http://www.gamedev.net/topic/499972-generate-a-random-unit-vector/
            var azimuth = Math.random() * 2 * Math.PI;
            var cosAzimuth = Math.cos(azimuth);
            var sinAzimuth = Math.sin(azimuth);
            var planarZ = Math.random() * 2 - 1; // in range [-1...1]
            var sqrtInvPlanarZSq = Math.sqrt(1 - planarZ * planarZ);
            var planarX = cosAzimuth * sqrtInvPlanarZSq;
            var planarY = sinAzimuth * sqrtInvPlanarZSq;
            rv1.set(planarX, planarY, planarZ);

            rv2.set(Math.random(), Math.random(), Math.random());
            rv3.set(
                Math.random() > 0.5 ? 1 : -1,
                Math.random() > 0.5 ? 1 : -1,
                normallyDistributedRandom(-1, 1),
                normallyDistributedRandom(-1, 1)
            );

            addTriangle(i + 0, v1, v2, v4, rv1, rv2, rv3);
            addTriangle(i + 1, v2, v3, v4, rv1, rv2, rv3);

            addTriangle(i + 2, v8, v6, v5, rv1, rv2, rv3);
            addTriangle(i + 3, v8, v7, v6, rv1, rv2, rv3);

            addTriangle(i + 4, v5, v2, v1, rv1, rv2, rv3);
            addTriangle(i + 5, v5, v6, v2, rv1, rv2, rv3);

            addTriangle(i + 6, v6, v3, v2, rv1, rv2, rv3);
            addTriangle(i + 7, v6, v7, v3, rv1, rv2, rv3);

            addTriangle(i + 8, v7, v4, v3, rv1, rv2, rv3);
            addTriangle(i + 9, v7, v8, v4, rv1, rv2, rv3);

            addTriangle(i + 10, v1, v4, v5, rv1, rv2, rv3);
            addTriangle(i + 11, v4, v8, v5, rv1, rv2, rv3);
        }

        function normallyDistributedRandom(from, to) {
            var delta = to - from;
            var random = 0;
            for (var i = 0; i < 4; i++) {
                random += Math.random() * delta - delta * 0.5;
            }
            return random;
        }

        function addTriangle(k, vc, vb, va, rv1, rv2, rv3) {
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
            var l = k * 12;

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

            colors[j + 0] = rv1.x;
            colors[j + 1] = rv1.y;
            colors[j + 2] = rv1.z;

            colors[j + 3] = rv1.x;
            colors[j + 4] = rv1.y;
            colors[j + 5] = rv1.z;

            colors[j + 6] = rv1.x;
            colors[j + 7] = rv1.y;
            colors[j + 8] = rv1.z;

            randoms1[j + 0] = rv2.x;
            randoms1[j + 1] = rv2.y;
            randoms1[j + 2] = rv2.z;

            randoms1[j + 3] = rv2.x;
            randoms1[j + 4] = rv2.y;
            randoms1[j + 5] = rv2.z;

            randoms1[j + 6] = rv2.x;
            randoms1[j + 7] = rv2.y;
            randoms1[j + 8] = rv2.z;

            randoms2[l + 0] = rv3.x;
            randoms2[l + 1] = rv3.y;
            randoms2[l + 2] = rv3.z;
            randoms2[l + 3] = rv3.w;

            randoms2[l + 4] = rv3.x;
            randoms2[l + 5] = rv3.y;
            randoms2[l + 6] = rv3.z;
            randoms2[l + 7] = rv3.w;

            randoms2[l + 8] = rv3.x;
            randoms2[l + 9] = rv3.y;
            randoms2[l + 10] = rv3.z;
            randoms2[l + 11] = rv3.w;
        }

        var result = new THREE.BufferGeometry();
        result.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        result.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
        result.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        result.addAttribute('random1', new THREE.BufferAttribute(randoms1, 3));
        result.addAttribute('random2', new THREE.BufferAttribute(randoms2, 4));
        result.computeBoundingSphere(); // used for frustum culling by three.js.
        return result;
    }
}
