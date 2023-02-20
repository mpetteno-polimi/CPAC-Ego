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
uniform vec3 uSphereColor;
uniform vec3 uFaceColor;
uniform vec3 uMorphTargetColor;
uniform vec3 uBackgroundColor;

/* VARYINGS */
varying float display;


void main() {

    float dist = length(gl_PointCoord - vec2(0.5));
    float point = smoothstep(0.5, 0.45, dist);

    vec3 vColor;
    vec3 faceColor = uFaceColor;
    vec3 morphTargetColor = uMorphTargetColor;
    if (uFaceDetected) {
        if (uMorphEnabled) {
            if (display == 0.) {
                vColor = uBackgroundColor;
            } else {
                vColor = morphTargetColor;
            }
            if (uTargetMorphElapsedTime <= uTargetMorphDuration) {
                float mixFactor = uTargetMorphElapsedTime/uTargetMorphDuration;
                vColor = mix(faceColor, vColor, clamp(0., 1., mixFactor));
            }
        } else {
            float mixFactor = uFaceMorphElapsedTime/uFaceMorphDuration;
            vColor = mix(uSphereColor, faceColor, clamp(0., 1., mixFactor));
        }
    } else {
        if (display == 0.) {
            float mixFactor = uTime/2.;
            vColor = mix(uBackgroundColor, uSphereColor, clamp(0., 1., mixFactor));
        } else {
            vColor = uSphereColor;
        }
    }

    gl_FragColor = vec4(point*vColor, 1.);
    if (point < 0.01) discard;
}
