#include "/src/ext/glsl/lygia/generative/cnoise.glsl"
#include "/src/ext/glsl/lygia/math/map.glsl"

/* UNIFORMS */
uniform float u_time;
uniform float u_faceMorphElapsedTime;
uniform float u_targetMorphElapsedTime;
uniform float u_delta;
uniform float u_noiseFreq;
uniform float u_noiseAmp;
uniform float u_noiseRadius;
uniform float u_noiseSpeed;
uniform bool u_faceDetected;
uniform bool u_morphEnabled;
uniform float u_faceMorphDuration;
uniform float u_targetMorphDuration;
uniform float u_morphTargetType;
uniform float u_canvasWidth;
uniform float u_canvasHeight;
uniform float u_noiseSeed;
uniform sampler2D u_textureFacePosition;
uniform sampler2D u_textureMorphTargetPosition;


void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 pos = texture2D(u_textureMorphTargetPosition, uv).xyz;

    float mask = 1.;
    if (u_morphTargetType == 1.) {
        float boxH = u_canvasHeight;
        float boxW = u_canvasWidth;
        if (pos.x > -0.75*boxW/2. && pos.x < 0.75*boxW/2. && pos.y > -0.75*boxH/2. && pos.y < 0.75*boxH/2.) {
            float d = (pow(boxW, 2.)+pow(boxH, 2.))/10.;
            float mult = map(pow(pos.x, 2.)+pow(pos.y, 2.), 0., d, 1.2, 0.);
            float noiseScale = 0.03*u_noiseSeed;
            float threshold = 255.*0.25;
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