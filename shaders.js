SHADERS = {};

SHADERS.vertex = `
  uniform float age;

  varying lowp vec3 vDiffuse;
  //varying vec3 vNormal;

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

  vec4 axisAngleToQuaternion(vec3 axis, float angle) {
      vec4 dest = vec4(0.0);

			float halfAngle = angle / 2.0,
				    s = sin(halfAngle);

			dest.x = axis.x * s;
			dest.y = axis.y * s;
			dest.z = axis.z * s;
			dest.w = cos(halfAngle);
			return dest;
  }

  void main() {
    // Rotate.
    const float rotationSpeed = 4.0;
    vec4 rotation = axisAngleToQuaternion(color, age * color.z * rotationSpeed);
    vec3 position = rotateVectorByQuaternion(position, rotation);
    vec3 normal = rotateVectorByQuaternion(normal, rotation);

    // Translate.
    const float pi = 3.1415926535897932384626433832795;
    // float transitionSeconds = 200.0 * color.y;
    position = vec3(
      position.x + cos(age + color.y * 5.0) * 50.0 * color.x,
      position.y - 60.0 + mod(age + color.y * 10.0, 10.0) * 12.0,
      position.z + sin(age + color.x * 5.0) * 50.0 * color.z);

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
    const vec3 light2Color = vec3(0.349, 1.0, 1.0);
    const vec3 light2Position = vec3(0.0, 0.0, 0.0);
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
