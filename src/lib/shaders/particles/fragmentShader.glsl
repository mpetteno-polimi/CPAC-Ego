/* UNIFORMS */
uniform float u_delta;
uniform float u_time;
uniform float u_resolution;
uniform float u_noiseFreq;
uniform float u_noiseAmp;
uniform float u_noiseRadius;
uniform float u_noiseSpeed;
uniform sampler2D u_particlesPosition;

/* VARYINGS */
varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1.);
}
