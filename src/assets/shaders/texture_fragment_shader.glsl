precision mediump float;

uniform sampler2D pictures[16];
uniform int diffuseMapEnabled;
uniform vec3 diffuseColor;

varying vec3 textureCoordVarying;
varying vec3 positionVarying;

void main()
{
  if (positionVarying.x < 0.0) {
    discard;
  }
  if (diffuseMapEnabled == 1) {
    gl_FragColor = texture2D(pictures[0], textureCoordVarying.xy);
  } else {
    gl_FragColor = vec4(diffuseColor, 1);
  }
}
