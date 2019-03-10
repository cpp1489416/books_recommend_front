attribute vec3  position;
attribute vec3 textureCoord;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying vec3 textureCoordVarying;
varying vec3 positionVarying;

void main()
{
 	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
 	positionVarying = position;
  textureCoordVarying = textureCoord;
}
