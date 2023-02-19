#include "/src/ext/glsl/lygia/generative/curl.glsl"

/* UNIFORMS */
uniform float uTime;
uniform float uFaceMorphElapsedTime;
uniform float uTargetMorphElapsedTime;
uniform float uDelta;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uNoiseRadius;
uniform float uNoiseSpeed;
uniform bool uFaceDetected;
uniform bool uMorphEnabled;
uniform float uFaceMorphDuration;
uniform float uTargetMorphDuration;
uniform float uMorphTargetType;
uniform sampler2D uTextureFacePosition;
uniform sampler2D uTextureMorphTargetPosition;
uniform sampler2D uTextureInitialParticlesPosition;

/* CONSTANTS */
const float CENTER_MASS = 5.0;
const float PARTICLE_MASS = 1.0;
const float VELOCITY_TERMINAL = 0.01;
const float CURL_RADIUS = 0.5;

void main() {

    vec3 newVelocity = vec3(1.);
    if (uTime > 2.) {
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

        newVelocity = velocity + curlVelocity * curlForce + pull * 16.0;
    }

    gl_FragColor = vec4(newVelocity, 1.0);
}