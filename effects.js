if (!THREE.Effects) THREE.Effects = {};

(function(THREE) {
    var mixinCommon = `
    // ref: http://alteredqualia.com/three/examples/webgl_cubes.html
    vec3 rotateVectorByQuaternion(vec3 v, vec4 q) {
      vec3 dest = vec3(0.0);

      float x = v.x, y = v.y, z = v.z;
      float qx = q.x, qy = q.y, qz = q.z, qw = q.w;

      // calculate quaternion * vector
      float ix =  qw * x + qy * z - qz * y,
            iy =  qw * y + qz * x - qx * z,
            iz =  qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;

      // calculate result * inverse quaternion
      dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

      return dest;
    }

    // ref: http://alteredqualia.com/three/examples/webgl_cubes.html
    vec4 axisAngleToQuaternion(vec3 axis, float angle) {
        vec4 dest = vec4(0.0);

        float halfAngle = angle / 2.0;
        float s = sin(halfAngle);

        dest.x = axis.x * s;
        dest.y = axis.y * s;
        dest.z = axis.z * s;
        dest.w = cos(halfAngle);
        return dest;
    }
  `;

    /*
    random components:
    - rotation axis (vec 3 dir normal)      - color
    - rotation speed (float 0..1)           - random1.x
    - age (float 0..1)                      - random1.y
    - age speed (float 0..1)                - random1.z
    - left or right (float 0..1) -> -1 or 1 - random2.x
    - front or back (float 0..1) -> -1 or 1 - random2.y
    - x offset (float -1..1)                - random2.z
    - y offset (float -1..1)                - random2.w
    http://stackoverflow.com/a/3956538/1466456
    */
    var mixinCubePosition = `
    // ROTATION.
    const float rotationSpeed = 3.0;
    vec4 rotation = axisAngleToQuaternion(color, fAge * random1.x * rotationSpeed);
    vec3 position = rotateVectorByQuaternion(position, rotation);
    vec3 normal = rotateVectorByQuaternion(normal, rotation);

    // TRANSLATION.
    // Y-translation.
    const float yOffset = 60.0;
    const float yDistance = 120.0;
    float transitionSecondsY = 30.0;
    float randomizedAgeY = fAge * (random1.y) + random1.z * transitionSecondsY;
    float moduloRandomizedAgeY = mod(randomizedAgeY, transitionSecondsY);
    float positionY = position.y - yOffset + moduloRandomizedAgeY / transitionSecondsY * yDistance;

    // X- & Z-translation.
    const float xzDistance = 25.0;
    const float xzAgeFactor = 0.2;
    float leftOrRight = random2.x;
    float frontOrBack = random2.y;
    moduloRandomizedAgeY *= xzAgeFactor;
    float positionX = position.x + cos(moduloRandomizedAgeY) * leftOrRight * xzDistance;
    float positionZ = position.z + sin(moduloRandomizedAgeY) * frontOrBack * xzDistance;

    float offsetAmount = 4.0;

    position = vec3(
        positionX + random2.z * offsetAmount,
        positionY,
        positionZ + random2.w * offsetAmount);

    // COORDINATE SPACE TRANSFORMATION.
    // Transform from local to camera space.
    vec4 mvPosition = viewMatrix * vec4(position, 1.0);

    // Transform from camera to clip space.
    gl_Position = projectionMatrix * mvPosition;
  `;

    var mixinCubeLighting = `
    // LIGHTING.
    vDiffuse = vec3(0.0);

    // Apply directional light.
    // We use Gouraud shading for per vertex lighting.
    const vec3 light1Color = vec3(1.0, 0.0, 0.0);
    const vec3 light1InvDir = vec3(0.0, 1.0, 0.0);
    const float light1Intensity = 0.75;

    // vDiffuse += light1Intensity * max(dot(normal, light1InvDir), 0.0) * light1Color;

    // Apply point light.
    const vec3 light2Color = vec3(0.349, 1.0, 1.0);
    const vec3 light2Position = vec3(0.0, 0.0, 0.0);
    const float light2Intensity = 1.0;
    const float light2MaxDistance = 100.0;

    vec3 light2InvVector = light2Position - position;
    float light2Distance = length(light2InvVector);
    vec3 light2InvDir = light2InvVector / light2Distance;
    float light2Factor = 1.0 - min(light2Distance / light2MaxDistance, 1.0);
    vDiffuse += light2Intensity * max(dot(normal, light2InvDir), 0.0) * light2Factor * light2Color;
  `;

    THREE.Effects.cubesDiffuse = {
        uniforms: {
            fAge: {
                type: 'f',
                value: Math.PI
            }
        },
        vertexColors: THREE.VertexColors,
        vertexShader: `
        uniform float fAge;

        attribute vec3 random1;
        attribute vec4 random2;

        varying lowp vec3 vDiffuse;

        ${mixinCommon}
        void main() {
          ${mixinCubePosition}
          ${mixinCubeLighting}
        }
      `,
        fragmentShader: `
        varying lowp vec3 vDiffuse;
        void main() {
          gl_FragColor = vec4(vDiffuse, 1.0);
        }
      `
    };

    THREE.Effects.cubesBlack = {
        uniforms: {
            fAge: {
                type: 'f',
                value: Math.PI
            }
        },
        vertexColors: THREE.VertexColors,
        vertexShader: `
        uniform float fAge;

        attribute vec3 random1;
        attribute vec4 random2;

        ${mixinCommon}
        void main() {
          ${mixinCubePosition}
        }
      `,
        fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      `
    };

    var mixinPosition = `
    gl_Position = vec4(position, 1.0);
    `;

    THREE.Effects.godRays = {
        uniforms: {
            tDiffuse: {
                type: "t"
            },
            fExposure: {
                type: "f",
                value: 0.6
            },
            fDecay: {
                type: "f",
                value: 0.93
            },
            fDensity: {
                type: "f",
                value: 0.96
            },
            fWeight: {
                type: "f",
                value: 0.4
            },
            fClamp: {
                type: "f",
                value: 1.0
            }
        },
        vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            ${mixinPosition}
        }
        `,
        fragmentShader: `
        varying vec2 vUv;

        uniform sampler2D tDiffuse;

        uniform float fExposure;
        uniform float fDecay;
        uniform float fDensity;
        uniform float fWeight;
        uniform float fClamp;

        void main() {
            const int numSamples = 20;
            const vec2 lightPosition = vec2(0.5, 0.5);

            vec2 delta = vUv - lightPosition;
            delta *= 1.0 / float(numSamples) * fDensity;
            float illuminationDecay = 1.0;
            vec4 fragColor = vec4(0.0);

            vec2 coord = vUv;

            for (int i = 0; i < numSamples; i++) {
                coord -= delta;
                vec4 texel = texture2D(tDiffuse, coord);
                texel *= illuminationDecay * fWeight;

                fragColor += texel;

                illuminationDecay *= fDecay;
            }
            fragColor *= fExposure;
            fragColor = clamp(fragColor, 0.0, fClamp);
            gl_FragColor = fragColor;
        }`
    };

    THREE.Effects.additive = {
        uniforms: {
            tDiffuse: {
                type: 't'
            },
            tAdd: {
                type: 't'
            },
            fCoefficient: {
                type: 'f',
                value: 1.0
            }
        },
        vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            ${mixinPosition}
        }
        `,
        fragmentShader: `
        varying vec2 vUv;

        uniform sampler2D tDiffuse;
        uniform sampler2D tAdd;
        uniform float fCoefficient;

        void main() {
            vec4 texel = texture2D(tDiffuse, vUv);
            vec4 add = texture2D(tAdd, vUv);
            gl_FragColor = texel + add * fCoefficient;
        }
        `
    };
})(THREE);
