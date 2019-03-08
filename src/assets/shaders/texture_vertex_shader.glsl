attribute vec3  position;
attribute vec3 textureCoord;
varying vec3 textureCoordVarying;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

void main()
{
 	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
  textureCoordVarying = textureCoord;
}
