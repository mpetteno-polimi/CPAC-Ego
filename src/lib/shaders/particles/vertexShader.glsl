attribute vec2 reference;

uniform sampler2D u_texturePosition;

varying vec4 vColor;

void main() {
    vec4 point = texture2D(u_texturePosition, reference);
    vec3 position = point.xyz;
    float isStucked = point.w;
    #include <begin_vertex>
    #include <project_vertex>
    gl_PointSize = 5.0 * (1.0 / -mvPosition.z);
    if (isStucked == 1.0) {
        vColor = vec4(255., 0., 0., 1.);
    } else if (isStucked == 0.5) {
        vColor = vec4(0., 255., 0., 1.);
    } else {
        vColor = vec4(0., 0., 255., 1.);
    }
}