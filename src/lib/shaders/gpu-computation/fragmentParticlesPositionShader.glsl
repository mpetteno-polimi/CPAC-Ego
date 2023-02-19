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

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 position = texture2D(textureParticlesPosition, uv).xyz;
    vec3 velocity = texture2D(textureParticlesVelocity, uv).xyz;

    vec3 newPosition;
    float display = 1.0;
    if (uFaceDetected) {
        vec3 facePosition = texture2D(uTextureFacePosition, uv).xyz;
        if (uMorphEnabled) {
            vec3 morphPosition = texture2D(uTextureMorphTargetPosition, uv).xyz;
            display = texture2D(uTextureMorphTargetPosition, uv).w;
            float mixFactor = uTargetMorphElapsedTime/uTargetMorphDuration;
            newPosition = mix(facePosition, morphPosition, clamp(0., 1., mixFactor));
        } else {
            float mixFactor = 0.02 * uFaceMorphElapsedTime/uFaceMorphDuration;
            newPosition = mix(position, facePosition, clamp(mixFactor, 0., 1.));
        }
    } else {
        if (uTime <= 2.) {
            display = texture2D(uTextureMorphTargetPosition, uv).w;
            vec3 morphPosition = texture2D(uTextureMorphTargetPosition, uv).xyz;
            vec3 initPositions = texture2D(uTextureInitialParticlesPosition, uv).xyz;
            float mixFactor = uTime/2.;
            newPosition = mix(morphPosition, initPositions, mixFactor);
        } else {
            float evolvRate = 0.002;
            newPosition = position + velocity*evolvRate;
        }
    }

    gl_FragColor = vec4(newPosition, display);
}