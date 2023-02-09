attribute vec2 reference;
uniform sampler2D u_texturePosition;

void main() {
    vec3 position = texture2D(u_texturePosition, reference).xyz;
    #include <begin_vertex>
    #include <project_vertex>
    gl_PointSize = 5.0 * (1.0 / -mvPosition.z);
}