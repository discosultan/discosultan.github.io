SHADERS = {};

SHADERS.vertex = `
  uniform float age;

  varying lowp vec3 vDiffuse;
  //varying vec3 vNormal;

  void main() {
    // Translate position.
    vec3 position = vec3(position.x, position.y + sin(age) * 10.0, position.z);

    // Transform from local to camera space.
  	vec4 mvPosition = viewMatrix * vec4(position, 1.0);

    // Transform from camera to clip space.
  	gl_Position = projectionMatrix * mvPosition;

    // Apply directional light.
    // We use Gouraud shading for per vertex lighting.
    const vec3 light1Color = vec3(1.0, 0.0, 0.0);
    const vec3 light1InvDir = vec3(0.0, 1.0, 0.0);
    const float light1Intensity = 0.75;

    vDiffuse = light1Intensity * max(dot(normal, light1InvDir), 0.0) * light1Color;

    // Apply point light.
    const vec3 light2Color = vec3(0.0, 1.0, 0.0);
    const vec3 light2Position = vec3(-15.0, 0.0, 10.0);
    const float light2Intensity = 1.0;
    const float light2MaxDistance = 100.0;

    vec3 light2InvVector = light2Position - position;
    float light2Distance = length(light2InvVector);
    vec3 light2InvDir = light2InvVector / light2Distance;
    float light2Factor = 1.0 - min(light2Distance / light2MaxDistance, 1.0);
    vDiffuse += light2Intensity * max(dot(normal, light2InvDir), 0.0) * light2Factor * light2Color;
  }
`;

SHADERS.fragment = `
  // varying vec3 vNormal;
  varying lowp vec3 vDiffuse;

  void main() {
    // Interpolation denormalizes the normal - renormalize it.
    // vec3 normal = normalize(vNormal);

    gl_FragColor = vec4(vDiffuse, 1.0);
  }
`;
