#include "/src/ext/glsl/lygia/generative/cnoise.glsl"

/* UNIFORMS */
uniform float u_delta;
uniform float u_time;
uniform float u_noiseFreq;
uniform float u_noiseAmp;
uniform float u_noiseRadius;
uniform float u_noiseSpeed;
uniform bool u_faceDetected;
uniform bool u_morphEnabled;
uniform float u_faceMorphDuration;
uniform float u_targetMorphDuration;
uniform float u_morphTargetType;
uniform sampler2D u_textureFacePosition;
uniform sampler2D u_textureMorphTargetPosition;
uniform sampler2D u_textureMorphTargetMask;


void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = vec3(cnoise(uv));
    gl_FragColor = vec4(position, 1.0);
}