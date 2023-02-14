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

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(textureMorphPosition, uv).xyz;
    vec3 velocity = texture2D(textureMorphVelocity, uv).xyz;

    vec3 newPosition = position;
    gl_FragColor = vec4(newPosition, 1.0);
}
