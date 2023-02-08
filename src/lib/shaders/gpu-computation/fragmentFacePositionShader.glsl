uniform float u_delta;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(textureFacePosition, uv).xyz;
    vec3 velocity = texture2D(textureFaceVelocity, uv).xyz;

    vec3 newPosition = position + velocity*u_delta*0.002;

    gl_FragColor = vec4(newPosition, 1.0);
}