
const float PI = 3.141592653589793;

// Rotate a vec2
vec2 rotate(vec2 vec, float rot) {
    float s = sin(rot), c = cos(rot);
    return vec2(vec.x*c-vec.y*s, vec.x*s+vec.y*c);
}

// Hash13 Hash without Sine: https://www.shadertoy.com/view/4djSRW
float hash(vec2 p, float t) {
    vec3 p3 = vec3(p, t);
    p3  = fract(p3*0.1031);
    p3 += dot(p3, p3.zyx+31.32);
    return fract((p3.x+p3.y)*p3.z);
}

float noise(vec2 p, float t) {
    vec4 b = vec4(floor(p), ceil(p));
    vec2 f = smoothstep(0.0, 1.0, fract(p));
    return mix(mix(hash(b.xy, t), hash(b.zy, t), f.x), mix(hash(b.xw, t), hash(b.zw, t), f.x), f.y);
}

// Number of FBM Octaves
#define num_octaves 16

// Fractal Brownian Motion Noise
float fbm(vec2 pos) {
    float value = 0.0;
    float scale = 1.0;
    float atten = 0.5;
    float t = 0.0;
    for(int i = 0; i < num_octaves; i++) {
        t += atten;
        value += noise(pos*scale, float(i))*atten;
        scale *= 2.0;
        atten *= 0.5;
        pos = rotate(pos, 0.125*PI);
    }
    return value/t;
}