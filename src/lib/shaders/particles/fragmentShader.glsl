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
uniform vec3 uPrimaryColor;
uniform vec3 uPrimaryVariant;
uniform vec3 uSecondaryColor;
uniform vec3 uSecondaryVariantColor;
uniform vec3 uBackgroundColor;

/* VARYINGS */
varying float display;


void main() {

    float dist = length(gl_PointCoord - vec2(0.5));
    float point = smoothstep(0.5, 0.45, dist);

    vec3 vColor;
    vec3 faceColor = uSecondaryColor;
    vec3 morphTargetColor = uSecondaryVariantColor;
    if (u_faceDetected) {
        if (u_morphEnabled) {
            if (display == 0.) {
                vColor = uBackgroundColor;
            } else {
                vColor = morphTargetColor;
            }
            if (u_targetMorphElapsedTime <= u_targetMorphDuration) {
                float mixFactor = u_targetMorphElapsedTime/u_targetMorphDuration;
                vColor = mix(faceColor, vColor, clamp(0., 1., mixFactor));
            }
        } else {
            float mixFactor = u_faceMorphElapsedTime/u_faceMorphDuration;
            vColor = mix(uPrimaryColor, faceColor, clamp(0., 1., mixFactor));
        }
    } else {
        if (display == 0.) {
            float mixFactor = u_time/2.;
            vColor = mix(uBackgroundColor, uPrimaryColor, clamp(0., 1., mixFactor));
        } else {
            vColor = uPrimaryColor;
        }
    }

    gl_FragColor = vec4(point*vColor, 1.);
    if (point < 0.01) discard;
}
