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

    float mult = 1.;
    float noiseScale = 0.5;
    float threshold = 255.*0.6;

    float noise = normalize(cnoise(uv*noiseScale));
    int noiseColor = int(255.*mult*noise);
    int red = noiseColor << 16, green = noiseColor << 8, blue = noiseColor;
    int grayscaleColor = 0xff000000 | red | green | blue;
    int max = max(red, max(green, blue));

    vec3 mask;
    if (max < int(threshold)) {
        mask = vec3(1.);
    } else {
        mask = vec3(0.);
    }

    gl_FragColor = vec4(mask, 1.0);
}