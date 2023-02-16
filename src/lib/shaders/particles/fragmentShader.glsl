/* UNIFORMS */
uniform float u_time;
uniform float u_faceMorphElapsedTime;
uniform float u_targetMorphElapsedTime;
uniform float u_delta;
uniform float u_resolution;
uniform float u_noiseFreq;
uniform float u_noiseAmp;
uniform float u_noiseRadius;
uniform float u_noiseSpeed;
uniform bool u_faceDetected;
uniform bool u_morphEnabled;
uniform float u_faceMorphDuration;
uniform float u_targetMorphDuration;
uniform float u_morphTargetType;
uniform sampler2D u_particlesPosition;

/* VARYINGS */
varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1.);
}
