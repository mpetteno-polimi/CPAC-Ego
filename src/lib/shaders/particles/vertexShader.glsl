#include <morphtarget_pars_vertex>

attribute vec2 reference;
uniform float u_delta;
uniform float u_time;
uniform float u_resolution;
uniform sampler2D u_particlesPosition;
uniform sampler2D u_particlesVelocity;

void main() {
    vec3 position = texture2D(u_particlesPosition, reference).xyz;
    #include <begin_vertex>
    #include <morphtarget_vertex>
    #include <project_vertex>

    gl_PointSize = 2.0 * (1.0 / -mvPosition.z);
}