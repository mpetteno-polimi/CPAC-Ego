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


float easing(float x) {
    return pow(x, 5.);
}

vec3 getNoisedPosition(vec3 pos) {

    vec3 noise, period;
    float noiseX, noiseY, noiseZ;
    vec3 noiseInput = (pos*uNoiseFreq + uTime*uNoiseSpeed)*uNoiseSeed;
    switch (uNoiseType) {
        case 0: // Classic Perlin Noise
            noiseX = cnoise(noiseInput);
            noiseY = cnoise(noiseInput);
            noiseZ = cnoise(noiseInput);
            noise = vec3(noiseX, noiseY, noiseZ);
            break;
        case 1: // Classic Perlin Noise with periodic variant
            period = vec3(uTime*uNoiseSeed);
            noiseX = pnoise(noiseInput, period);
            noiseY = pnoise(noiseInput, period);
            noiseZ = pnoise(noiseInput, period);
            noise = vec3(noiseX, noiseY, noiseZ);
            break;
        case 2: // Simplex Noise
            noise = snoise3(noiseInput);
            break;
        case 3: // Tiling simplex flow noise
            period = vec3(uTime*uNoiseSeed);
            float alpha = uTime*uNoiseSeed;
            noiseX = psrdnoise(noiseInput, period, alpha);
            noiseY = psrdnoise(noiseInput, period, alpha);
            noiseZ = psrdnoise(noiseInput, period, alpha);
            noise = vec3(noiseX, noiseY, noiseZ);
            break;
        case 4: // Curl noise
            noise = curl(noiseInput);
            break;
        case 5: // Voronoi noise
            noise = voronoi(noiseInput);
            break;
        case 6: // Worley noise
            noiseX = worley(noiseInput);
            noiseY = worley(noiseInput);
            noiseZ = worley(noiseInput);
            noise = vec3(noiseX, noiseY, noiseZ);
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