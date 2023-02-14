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
uniform sampler2D u_particlesPosition;


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
    #include <begin_vertex>
    #include <project_vertex>
    gl_PointSize = 1.5 * (1.0 / -mvPosition.z);
}