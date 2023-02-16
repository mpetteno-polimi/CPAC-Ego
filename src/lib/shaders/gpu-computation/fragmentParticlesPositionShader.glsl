/* UNIFORMS */
uniform float u_time;
uniform float u_faceMorphElapsedTime;
uniform float u_targetMorphElapsedTime;
uniform float u_delta;
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
uniform sampler2D u_textureInitialParticlesPosition;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(textureParticlesPosition, uv).xyz;
    vec3 velocity = texture2D(textureParticlesVelocity, uv).xyz;

    vec3 newPosition;
    float display = 1.0;
    if (u_faceDetected) {
        vec3 facePosition = texture2D(u_textureFacePosition, uv).xyz;
        if (u_morphEnabled) {
            vec3 morphPosition = texture2D(u_textureMorphTargetPosition, uv).xyz;
            display = texture2D(u_textureMorphTargetPosition, uv).w;
            float mixFactor = u_targetMorphElapsedTime/u_targetMorphDuration;
            newPosition = mix(facePosition, morphPosition, clamp(0., 1., mixFactor));
        } else {
            float mixFactor = 0.02 * u_faceMorphElapsedTime/u_faceMorphDuration;
            newPosition = mix(position, facePosition, clamp(mixFactor, 0., 1.));
        }
    } else {
        if (u_time <= 2.) {
            display = texture2D(u_textureMorphTargetPosition, uv).w;
            vec3 morphPosition = texture2D(u_textureMorphTargetPosition, uv).xyz;
            vec3 initPositions = texture2D(u_textureInitialParticlesPosition, uv).xyz;
            float mixFactor = u_time/2.;
            newPosition = mix(morphPosition, initPositions, mixFactor);
        } else {
            float evolvRate = 0.002;
            newPosition = position + velocity*evolvRate;
        }
    }

    gl_FragColor = vec4(newPosition, display);
}