#include "/src/ext/glsl/lygia/math/map.glsl"

// Varyings
varying vec2 vUv;
varying vec2 vLayoutUv;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying float vLineIndex;
varying float vLineLettersTotal;
varying float vLineLetterIndex;
varying float vLineWordsTotal;
varying float vLineWordIndex;
varying float vWordIndex;
varying float vLetterIndex;

// Uniforms: Common
uniform float uOpacity;
uniform float uThreshold;
uniform float uAlphaTest;
uniform vec3 uColor;
uniform sampler2D uMap;

// Uniforms: Strokes
uniform vec3 uStrokeColor;
uniform float uStrokeOutsetWidth;
uniform float uStrokeInsetWidth;

// Uniforms: Custom
uniform float uProgress1;
uniform float uProgress2;
uniform float uProgress3;
uniform float uProgress4;
uniform float uTime;
uniform vec3 uPrimaryColor;
uniform vec3 uPrimaryVariant;
uniform vec3 uSecondaryColor;
uniform vec3 uSecondaryVariantColor;
uniform vec3 uBackgroundColor;

// Utils: Median
float median(float r, float g, float b) {
    return max(min(r, g), min(max(r, g), b));
}

void main() {
    // Common
    // Texture sample
    vec3 s = texture2D(uMap, vUv).rgb;

    // Signed distance
    float sigDist = median(s.r, s.g, s.b) - 0.5;

    float afwidth = 1.4142135623730951 / 2.0;

    #ifdef IS_SMALL
    float alpha = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDist);
    #else
    float alpha = clamp(sigDist / fwidth(sigDist) + 0.5, 0.0, 1.0);
    #endif

    // Strokes
    // Outset
    float sigDistOutset = sigDist + uStrokeOutsetWidth * 0.5;

    // Inset
    float sigDistInset = sigDist - uStrokeInsetWidth * 0.5;

    #ifdef IS_SMALL
    float outset = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistOutset);
    float inset = 1.0 - smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistInset);
    #else
    float outset = clamp(sigDistOutset / fwidth(sigDistOutset) + 0.5, 0.0, 1.0);
    float inset = 1.0 - clamp(sigDistInset / fwidth(sigDistInset) + 0.5, 0.0, 1.0);
    #endif

    // Border
    float border = outset * inset;

    // Alpha Test
    if (alpha < uAlphaTest) discard;

    // Output: Common
    vec4 filledFragColor = vec4(uColor, uOpacity*alpha);

    gl_FragColor = filledFragColor;

    // Output: Strokes
    // vec4 strokedFragColor = vec4(uStrokeColor, uOpacity * border);

    // gl_FragColor = strokedFragColor;

    // Custom part
    vec4 l1 = vec4(uPrimaryColor, border*0.5);
    vec4 l2 = vec4(uPrimaryColor, border);
    vec4 l3 = vec4(uSecondaryColor  , alpha);
    vec4 l4 = vec4(uPrimaryColor, alpha);

    float w = 1.;

    vec4 startColor;
    if (uTime < 1.) {
        startColor = vec4(0.);
    } else {
        startColor = l4;
    }

    float p1 = uProgress1;
    p1 = map(p1, 0., 1., -w, 1.);
    float mix1 = smoothstep(p1, p1+w, vLayoutUv.x);
    mix1 = clamp(mix1, 0., 1.);

    float p2 = uProgress2;
    p2 = map(p2, 0., 1., -w, 1.);
    float mix2 = smoothstep(p2, p2+w, vLayoutUv.x);
    mix2 = clamp(mix2, 0., 1.);

    float p3 = uProgress3;
    p3 = map(p3, 0., 1., -w, 1.);
    float mix3 = smoothstep(p3, p3+w, vLayoutUv.x);
    mix3 = clamp(mix3, 0., 1.);

    float p4 = uProgress4;
    p4 = map(p4, 0., 1., -w, 1.);
    float mix4 = smoothstep(p4, p4+w, vLayoutUv.x);
    mix4 = clamp(mix4, 0., 1.);

    vec4 layer1 = mix(startColor, l1, 1.-mix1);
    vec4 layer2 = mix(layer1, l2, 1.-mix2);
    vec4 layer3 = mix(layer2, l3, 1.-mix3);
    vec4 layer4 = mix(layer3, l4, 1.-mix4);

    gl_FragColor = layer4;

}
