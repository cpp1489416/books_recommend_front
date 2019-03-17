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
  int illum; // 0 if disable light, 1 ambient and diffuse, 2 ambient, diffuse and specular
  vec3 ambientColor;
  int ambientMapEnabled;
  vec3 diffuseColor;
  int diffuseMapEnabled;
  vec3 specularColor;
  float specularSmoothness;
  int normalExist;
};

uniform float ambientLightIntensity;
uniform vec3 eyePosition;
uniform mat4 modelMatrix;
uniform mat4 normalMatrix;
uniform sampler2D ambientMap;
uniform sampler2D diffuseMap;
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

  vec3 materialDiffuseColor;
  if (material.diffuseMapEnabled == 1) {
    materialDiffuseColor = texture2D(diffuseMap, textureCoordVarying.xy).xyz;
  } else {
    materialDiffuseColor = material.diffuseColor;
  }

  vec3 materialAmbientColor;
  if (material.ambientMapEnabled == 1) {
    materialAmbientColor = texture2D(ambientMap, textureCoordVarying.xy).xyz;
  } else {
    materialAmbientColor = material.ambientColor;
  }

  if (directionLight.enabled == 0 || material.normalExist == 0 || material.illum == 0) {
    gl_FragColor = vec4(materialAmbientColor, 1.0);
  } else {
    vec3 finalColor;

    // ambient
    vec3 ambientColor = vec3(materialAmbientColor) * ambientLightIntensity;

    // diffuse
    vec3 lightDirection = normalize(-directionLight.direction);
    vec3 normal = normalize((normalMatrix * vec4(normalVarying, 1.0)).xyz);
    float diffuseStrength = dot(lightDirection, normal);
    diffuseStrength = clamp(diffuseStrength, 0.0, 1.0);
    vec3 diffuseColor = diffuseStrength * directionLight.color * materialDiffuseColor * directionLight.intensity;

    if (material.illum == 1) {
      finalColor = ambientColor + diffuseColor;
    } else {
    // specular
      vec3 eyeVector = normalize(eyePosition - positionVarying);
      vec3 halfVector = normalize(lightDirection + eyeVector);
      float specularStrength = dot(halfVector, normal);
      specularStrength = pow(abs(specularStrength), material.specularSmoothness);
      vec3 specularColor = specularStrength * material.specularColor * directionLight.color * directionLight.intensity;
      finalColor = ambientColor + diffuseColor + specularColor;
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
}
