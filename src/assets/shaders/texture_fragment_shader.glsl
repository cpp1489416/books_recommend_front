precision mediump float;

uniform sampler2D pictures[16];
uniform int diffuseMapEnabled;
uniform vec3 diffuseColor;

uniform int clipPlane0Enabled;
uniform vec4 clipPlane0;

varying vec3 textureCoordVarying;
varying vec3 positionVarying;

void main()
{
  if (clipPlane0Enabled == 1 && dot(vec4(positionVarying, 1.0), clipPlane0) < 0.0) {
    discard;
  }
  if (diffuseMapEnabled == 1) {
    gl_FragColor = texture2D(pictures[0], textureCoordVarying.xy);
  } else {
    gl_FragColor = vec4(diffuseColor, 1);
  }
}
