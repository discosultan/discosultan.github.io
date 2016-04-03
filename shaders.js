SHADERS = {};

SHADERS.vertex = `
  uniform float age;

  void main() {
    // Transform from local to camera space.
  	vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Transform from camera to clip space.
  	gl_Position = projectionMatrix * mvPosition;
  }
`;

SHADERS.fragment = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;
