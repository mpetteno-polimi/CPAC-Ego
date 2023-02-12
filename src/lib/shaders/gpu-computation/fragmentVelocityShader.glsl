#include "/src/lib/shaders/noise/curlNoise3D.glsl"

uniform float u_delta;
uniform float u_time;
uniform bool u_faceDetected;
uniform bool u_morphEnabled;

const float CENTER_MASS = 5.0;
const float PARTICLE_MASS = 1.0;
const float VELOCITY_TERMINAL = 0.01;
const float CURL_RADIUS = 0.5;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(texturePosition, uv).xyz;
    vec3 velocity = texture2D(textureVelocity, uv).xyz;

    float distance = length(position);

    // Calculate curl noise flow field
    float curlForce = min(distance, CURL_RADIUS) / CURL_RADIUS;
    vec3 curlVelocity = curlNoise(position) - velocity;

    // Calculate gravitational pull
    float pullForce = abs((CENTER_MASS * PARTICLE_MASS) / (distance * distance));
    vec3 pull = min(pullForce, VELOCITY_TERMINAL) * -normalize(position);

    vec3 newVelocity = velocity + curlVelocity * curlForce + pull * 16.0;

    gl_FragColor = vec4(newVelocity, 1.0);
}