/* UNIFORMS */
uniform float u_time;
uniform float u_faceMorphElapsedTime;
uniform float u_targetMorphElapsedTime;
uniform float u_delta;
uniform float u_resolution;
uniform float u_noiseFreq;
uniform float u_noiseAmp;
uniform float u_noiseRadius;
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

/* CONSTANTS */
const vec3 DEFAULT_COLOR = vec3(0.5, 0.6, 0.7);
const vec3 FACE_COLOR = vec3(0.5, 0.6, 0.7);
const vec3 MORPH_TARGET_COLOR = vec3(0.5, 0.6, 0.7);
const vec3 HIDDEN_COLOR = vec3(0.);


void main() {

    vec3 vColor;
    if (u_faceDetected) {
        if (u_morphEnabled) {
            if (display == 0.) {
                vColor = HIDDEN_COLOR;
            } else {
                vColor = MORPH_TARGET_COLOR;
            }
            if (u_targetMorphElapsedTime <= u_targetMorphDuration) {
                float mixFactor = u_targetMorphElapsedTime/u_targetMorphDuration;
                vColor = mix(FACE_COLOR, vColor, clamp(0., 1., mixFactor));
            }
        } else {
            float mixFactor = u_faceMorphElapsedTime/u_faceMorphDuration;
            vColor = mix(DEFAULT_COLOR, FACE_COLOR, clamp(0., 1., mixFactor));
        }
    } else {
        if (display == 0.) {
            float mixFactor = u_time/2.;
            vColor = mix(HIDDEN_COLOR, DEFAULT_COLOR, clamp(0., 1., mixFactor));
        } else {
            vColor = DEFAULT_COLOR;
        }
    }

    gl_FragColor = vec4(vColor, 1.);
}
