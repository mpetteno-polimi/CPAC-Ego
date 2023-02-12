uniform float u_delta;
uniform float u_time;
uniform bool u_faceDetected;
uniform bool u_morphEnabled;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(texturePosition, uv).xyz;
    vec3 velocity = texture2D(textureVelocity, uv).xyz;

    vec3 newPosition;
    if (u_faceDetected) {
        if (u_morphEnabled) {
            vec3 morphPosition = texture2D(textureMorphPosition, uv).xyz;
            float mixRate = u_delta*0.5;
            newPosition = mix(position, morphPosition, mixRate);
        } else {
            vec3 facePosition = texture2D(textureFacePosition, uv).xyz;
            float mixRate = u_delta*0.5;
            newPosition = mix(position, facePosition, mixRate);
        }
    } else {
        float evolvRate = u_delta*0.1;
        newPosition = position + velocity * evolvRate;
    }

    gl_FragColor = vec4(newPosition, 1.0);
}