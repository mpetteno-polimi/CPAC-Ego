#include "/src/ext/glsl/lygia/generative/curl.glsl"
#include "/src/ext/glsl/lygia/generative/cnoise.glsl"

#define PI 3.1415926538

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
uniform float u_noiseSpeed;
uniform bool u_faceDetected;
uniform bool u_morphEnabled;
uniform float u_faceMorphDuration;
uniform float u_targetMorphDuration;
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

    vec3 defaultColor = vec3(0.5, 0.6, 0.7);
    vec3 faceColor = vec3(0.4, 0.8, 0.5);
    vec3 morphColor = vec3(0.5, 0.6, 0.7);
    vec3 hiddenParticleColor = vec3(0.);

    if (u_faceDetected) {
        if (u_morphEnabled) {
            if (display == 0.) {
                vColor = hiddenParticleColor;
            } else {
                vColor = morphColor;
            }
            if (u_targetMorphElapsedTime <= u_targetMorphDuration) {
                float mixFactor = u_targetMorphElapsedTime/u_targetMorphDuration;
                vColor = mix(faceColor, vColor, clamp(0., 1., mixFactor));
            }
        } else {
            float mixFactor = u_faceMorphElapsedTime/u_faceMorphDuration;
            vColor = mix(defaultColor, faceColor, clamp(0., 1., mixFactor));
        }
    } else {
        if (display == 0.) {
            float mixFactor = u_time/2.;
            vColor = mix(hiddenParticleColor, defaultColor, clamp(0., 1., mixFactor));
        } else {
            vColor = defaultColor;
        }
    }

    #include <begin_vertex>
    #include <project_vertex>

    gl_PointSize = 2. * (1.0 / -mvPosition.z);
}