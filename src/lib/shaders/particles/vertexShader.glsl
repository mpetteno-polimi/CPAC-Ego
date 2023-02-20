#include "/src/ext/glsl/lygia/generative/cnoise.glsl"
#include "/src/ext/glsl/lygia/generative/pnoise.glsl"
#include "/src/ext/glsl/lygia/generative/snoise.glsl"
#include "/src/ext/glsl/lygia/generative/psrdnoise.glsl"
#include "/src/ext/glsl/lygia/generative/curl.glsl"
#include "/src/ext/glsl/lygia/generative/voronoi.glsl"
#include "/src/ext/glsl/lygia/generative/worley.glsl"

/* ATTRIBUTES */
attribute vec2 reference;

/* UNIFORMS */
uniform float uTime;
uniform float uFaceMorphElapsedTime;
uniform float uTargetMorphElapsedTime;
uniform float uDelta;
uniform float uResolution;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uNoiseRadius;
uniform float uNoiseSpeed;
uniform float uNoiseSeed;
uniform int uNoiseType;
uniform bool uFaceDetected;
uniform bool uMorphEnabled;
uniform float uFaceMorphDuration;
uniform float uTargetMorphDuration;
uniform float uMorphTargetType;
uniform sampler2D uParticlesPosition;

/* VARYINGS */
varying float display;

vec3 cnoise3(vec3 x) {
    float s  = cnoise(vec3(x));
    float s1 = cnoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2));
    float s2 = cnoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4));
    return vec3(s, s1, s2);
}

vec3 pnoise3(vec3 x) {
    vec3 period = vec3(uTime*uNoiseSeed);
    float s  = pnoise(vec3(x), period);
    float s1 = pnoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2), period);
    float s2 = pnoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4), period);
    return vec3(s, s1, s2);
}

vec3 psrdnoise3(vec3 x) {
    float alpha = uTime*uNoiseSeed;
    vec3 period = vec3(alpha);
    float s  = psrdnoise(vec3(x), period);
    float s1 = psrdnoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2), period, alpha);
    float s2 = psrdnoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4), period, alpha);
    return vec3(s, s1, s2);
}

vec3 worley3(vec3 x) {
    float s  = worley(vec3(x));
    float s1 = worley(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2));
    float s2 = worley(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4));
    return vec3(s, s1, s2);
}


float easing(float x) {
    return x;
}

vec3 getNoisedPosition(vec3 pos) {

    vec3 noise;
    vec3 noiseInput = (pos*uNoiseFreq + uTime*uNoiseSpeed)*uNoiseSeed;
    switch (uNoiseType) {
        case 0: // Classic Perlin Noise
            noise = cnoise3(noiseInput);
            break;
        case 1: // Classic Perlin Noise with periodic variant
            noise = pnoise3(noiseInput);
            break;
        case 2: // Simplex Noise
            noise = snoise3(noiseInput);
            break;
        case 3: // Tiling simplex flow noise
            noise = psrdnoise3(noiseInput);
            break;
        case 4: // Curl noise
            noise = curl(noiseInput);
            break;
        case 5: // Voronoi noise
            noise = voronoi(noiseInput);
            break;
        case 6: // Worley noise
            noise = worley3(noiseInput);
            break;
    }

    vec3 noisePos = uNoiseAmp*noise;
    vec3 tar = pos + noisePos;
    float d = length(pos - tar)/uNoiseRadius;
    return mix(pos, tar, easing(d));
}

void main() {
    vec3 position = texture2D(uParticlesPosition, reference).xyz;

    position = getNoisedPosition(position);
    display = texture2D(uParticlesPosition, reference).w;

    #include <begin_vertex>
    #include <project_vertex>

    gl_PointSize = 2. * (1.0 / -mvPosition.z);
}