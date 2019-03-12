attribute vec3  position;
attribute vec3 textureCoord;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying vec3 textureCoordVarying;
varying vec3 positionVarying;

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1);
 	gl_Position = projectionMatrix * viewMatrix * modelPosition;
 	positionVarying = modelPosition.xyz / modelPosition.w;
  textureCoordVarying = textureCoord;
}
