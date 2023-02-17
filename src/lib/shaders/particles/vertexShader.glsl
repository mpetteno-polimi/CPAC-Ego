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
uniform float u_time;
uniform float u_faceMorphElapsedTime;
uniform float u_targetMorphElapsedTime;
uniform float u_delta;
uniform float u_resolution;
uniform float u_noiseFreq;
uniform float u_noiseAmp;
uniform float u_noiseRadius;
uniform float u_noiseSeed;
uniform int u_noiseType;
uniform float u_noiseSpeed;
uniform bool u_faceDetected;
uniform bool u_morphEnabled;
uniform float u_faceMorphDuration;
uniform float u_targetMorphDuration;
uniform float u_morphTargetType;
uniform sampler2D u_particlesPosition;

/* VARYINGS */
varying float display;


float easing(float x) {
    return pow(x, 5.);
}

vec3 getNoisedPosition(vec3 pos) {

    vec3 noise, period;
    float noiseX, noiseY, noiseZ;
    vec3 noiseInput = (pos*u_noiseFreq + u_time*u_noiseSpeed)*u_noiseSeed;
    switch (u_noiseType) {
        case 0: // Classic Perlin Noise
            noiseX = cnoise(noiseInput);
            noiseY = cnoise(noiseInput);
            noiseZ = cnoise(noiseInput);
            noise = vec3(noiseX, noiseY, noiseZ);
            break;
        case 1: // Classic Perlin Noise with periodic variant
            period = vec3(u_time);
            noiseX = pnoise(noiseInput, period);
            noiseY = pnoise(noiseInput, period);
            noiseZ = pnoise(noiseInput, period);
            noise = vec3(noiseX, noiseY, noiseZ);
            break;
        case 2: // Simplex Noise
            noise = snoise3(noiseInput);
            break;
        case 3: // Tiling simplex flow noise
            period = vec3(u_time);
            float alpha = u_time;
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

    vec3 noisePos = u_noiseAmp*noise;
    vec3 tar = pos + noisePos;
    float d = length(pos - tar)/u_noiseRadius;
    return mix(pos, tar, easing(d));
}

void main() {
    vec3 position = texture2D(u_particlesPosition, reference).xyz;

    position = getNoisedPosition(position);
    display = texture2D(u_particlesPosition, reference).w;

    #include <begin_vertex>
    #include <project_vertex>

    gl_PointSize = 2. * (1.0 / -mvPosition.z);
}