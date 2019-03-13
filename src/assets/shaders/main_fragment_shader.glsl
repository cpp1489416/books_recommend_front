precision mediump float;

struct DirectionLight {
  int enabled;
  vec3 direction;
  vec3 color;
  float intensity;
};

struct ClipPlane {
  int enabled;
  vec4 plane;
};

struct Material {
  vec3 diffuseColor;
  int diffuseMapEnabled;
  int normalExist;
};

uniform mat4 modelMatrix;
uniform mat4 normalMatrix;
uniform sampler2D pictures[16];
uniform DirectionLight directionLight;
uniform ClipPlane clipPlane0;
uniform Material material;

varying vec3 textureCoordVarying;
varying vec3 positionVarying;
varying vec3 normalVarying;

void main()
{
  if (clipPlane0.enabled == 1 && dot(vec4(positionVarying, 1.0), clipPlane0.plane) < 0.0) {
    discard;
  }

  vec3 diffuseColor;
  if (material.diffuseMapEnabled == 1) {
    diffuseColor = texture2D(pictures[0], textureCoordVarying.xy).xyz;
  } else {
    diffuseColor = material.diffuseColor;
  }

  if (directionLight.enabled == 0 || material.normalExist == 0) {
    gl_FragColor = vec4(diffuseColor, 1.0);
  } else {
    vec3 lightDirection = normalize(-directionLight.direction);
    vec3 normal = normalize((normalMatrix * vec4(normalVarying, 1.0)).xyz);
    float diffuseStrength = dot(lightDirection, normal);
    diffuseStrength = clamp(diffuseStrength, 0.0, 1.0);
    vec3 diffusePartColor = diffuseStrength * directionLight.color * diffuseColor * directionLight.intensity;
    gl_FragColor = vec4(diffusePartColor, 1.0);
  }
}
