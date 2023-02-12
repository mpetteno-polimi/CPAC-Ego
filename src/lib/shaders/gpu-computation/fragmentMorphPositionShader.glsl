uniform float u_delta;
uniform float u_time;
uniform bool u_faceDetected;
uniform bool u_morphEnabled;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(textureMorphPosition, uv).xyz;
    vec3 velocity = texture2D(textureMorphVelocity, uv).xyz;

    vec3 newPosition = position; // + velocity*u_delta*0.002;

    gl_FragColor = vec4(newPosition, 1.0);
}
