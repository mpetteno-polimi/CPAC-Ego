#define PI 3.1415926538

/* ATTRIBUTES */
attribute vec2 reference;

/* UNIFORMS */
uniform float u_delta;
uniform float u_time;
uniform float u_resolution;
uniform sampler2D u_particlesPosition;


void main() {
    vec3 position = texture2D(u_particlesPosition, reference).xyz;
    #include <begin_vertex>
    #include <project_vertex>
    gl_PointSize = 2.0 * (1.0 / -mvPosition.z);
}