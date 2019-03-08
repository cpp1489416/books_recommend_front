precision mediump float;
uniform sampler2D pictures[16];
varying vec3 textureCoordVarying;

void main()
{
  gl_FragColor = texture2D(pictures[0], textureCoordVarying.xy);
}
