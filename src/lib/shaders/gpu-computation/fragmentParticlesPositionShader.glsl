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
    vec3 position = texture2D(textureParticlesPosition, uv).xyz;
    vec3 velocity = texture2D(textureParticlesVelocity, uv).xyz;

    vec3 newPosition;
    if (u_faceDetected) {
        vec3 facePosition = texture2D(textureFacePosition, uv).xyz;
        if (u_morphEnabled) {
            if (u_time <= u_targetMorphDuration) {
                vec3 morphPosition = texture2D(textureMorphPosition, uv).xyz;
                float mixFactor = u_time/u_targetMorphDuration;
                newPosition = mix(facePosition, morphPosition, mixFactor);
            }
        } else {
            if (u_time <= u_faceMorphDuration) {
                float mixFactor = 0.02 * u_time/u_faceMorphDuration;
                newPosition = mix(position, facePosition, mixFactor);
            } else {
                newPosition = facePosition;
            }
        }
    } else {
        float evolvRate = u_delta*0.1;
        newPosition = position + velocity*evolvRate;
    }

    gl_FragColor = vec4(newPosition, 1.0);
}