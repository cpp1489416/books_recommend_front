#ifdef GL_ES
precision mediump float;
#endif

uniform mat4 modelMatrix;
uniform mat4 rttProjectionMatrix;
uniform mat4 rttViewMatrix;
uniform sampler2D diffusePicture;

varying vec3 positionVarying;

void main()
{
    vec4 positionInRtt = rttProjectionMatrix * rttViewMatrix * modelMatrix * vec4(positionVarying, 1);
    positionInRtt /= positionInRtt.w;
    positionInRtt = (positionInRtt + 1.0) * 0.5; // move to 0-1 cooreds
    vec4 color = texture2D(diffusePicture, positionInRtt.st);
    // color /= 2.0;
    color.z = 1.0;
    gl_FragColor = color;

    // gl_FragColor = vec4(1, 1, 1, 1);
}
