#include "/src/ext/glsl/lygia/generative/cnoise.glsl"
#include "/src/ext/glsl/lygia/math/map.glsl"

/* UNIFORMS */
uniform float uTime;
uniform float uFaceMorphElapsedTime;
uniform float uTargetMorphElapsedTime;
uniform float uDelta;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uNoiseRadius;
uniform float uNoiseSpeed;
uniform float uNoiseSeed;
uniform bool uFaceDetected;
uniform bool uMorphEnabled;
uniform float uFaceMorphDuration;
uniform float uTargetMorphDuration;
uniform float uMorphTargetType;
uniform sampler2D uTextureFacePosition;
uniform sampler2D uTextureMorphTargetPosition;
uniform sampler2D uTextureInitialParticlesPosition;
uniform float uCanvasWidth;
uniform float uCanvasHeight;


void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 pos = texture2D(uTextureMorphTargetPosition, uv).xyz;

    float mask = 1.;
    if (uMorphTargetType == 1.) {
        float boxH = uCanvasHeight;
        float boxW = uCanvasWidth;
        if (pos.x > -0.75*boxW/2. && pos.x < 0.75*boxW/2. && pos.y > -0.75*boxH/2. && pos.y < 0.75*boxH/2.) {
            float d = (pow(boxW, 2.)+pow(boxH, 2.))/10.;
            float mult = map(pow(pos.x, 2.)+pow(pos.y, 2.), 0., d, 1.2, 0.);
            float noiseScale = 0.03*uNoiseSeed;
            float threshold = 255.*0.1;
            float noise = 255.*mult*cnoise(abs(pos.xy)*noiseScale);
            if (int(noise) < int(threshold)) {
                mask = 0.;
            }
        } else {
            mask = 0.;
        }
    }

    gl_FragColor = vec4(pos, mask);
}