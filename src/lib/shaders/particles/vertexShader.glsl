#include "/src/ext/glsl/lygia/generative/curl.glsl"
#include "/src/ext/glsl/lygia/generative/cnoise.glsl"

#define PI 3.1415926538

/* ATTRIBUTES */
attribute vec2 reference;

/* UNIFORMS */
uniform float u_delta;
uniform float u_time;
uniform float u_resolution;
uniform float u_noiseFreq;
uniform float u_noiseAmp;
uniform float u_noiseRadius;
uniform float u_noiseSpeed;
uniform float u_morphTargetType;
uniform sampler2D u_particlesPosition;

/* VARYINGS */
varying vec3 vColor;

float easing(float x) {
    return pow(x, 5.);
}

vec3 getNoisedPosition() {
    vec3 pos = texture2D(u_particlesPosition, reference).xyz;
    vec3 curlPos = u_noiseAmp*curl(pos*u_noiseFreq + u_time*u_noiseSpeed);
    vec3 tar = pos + curlPos;
    float d = length(pos - tar)/u_noiseRadius;
    return mix(pos, tar, easing(d));
}

void main() {
    vec3 position = texture2D(u_particlesPosition, reference).xyz;
    float display = texture2D(u_particlesPosition, reference).w;

    if (display == 1.) {
        vColor = vec3(0.5, 0.6, 0.7);
    } else {
        vColor = vec3(0.);
    }

    #include <begin_vertex>
    #include <project_vertex>

    gl_PointSize = 2. * (1.0 / -mvPosition.z);
}