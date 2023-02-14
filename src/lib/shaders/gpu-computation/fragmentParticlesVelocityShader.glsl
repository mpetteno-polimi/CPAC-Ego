#include "/src/ext/glsl/lygia/generative/curl.glsl"

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

/* CONSTANTS */
const float CENTER_MASS = 5.0;
const float PARTICLE_MASS = 1.0;
const float VELOCITY_TERMINAL = 0.01;
const float CURL_RADIUS = 0.5;

void main() {

    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(textureParticlesPosition, uv).xyz;
    vec3 velocity = texture2D(textureParticlesVelocity, uv).xyz;

    float distance = length(position);

    // Calculate curl noise flow field
    float curlForce = min(distance, CURL_RADIUS) / CURL_RADIUS;
    vec3 curlVelocity = curl(position) - velocity;

    // Calculate gravitational pull
    float pullForce = abs((CENTER_MASS * PARTICLE_MASS) / pow(distance, 2.));
    vec3 pull = min(pullForce, VELOCITY_TERMINAL) * -normalize(position);

    vec3 newVelocity = velocity + curlVelocity * curlForce + pull * 16.0;

    gl_FragColor = vec4(newVelocity, 1.0);
}