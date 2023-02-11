#include "/src/lib/shaders/lygia/generative/random.glsl"
#include "/src/lib/shaders/lygia/generative/fbm.glsl"

uniform float u_delta;
uniform float u_elapsedTime;
uniform float u_stepLength;
uniform float u_maxDistance;
uniform float u_aggregationProbability;
uniform float u_boundingSphereRadius;
uniform vec3 u_boundingSphereCenter;

const float PI = 3.141592653589793;

vec3 seed() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 point = texture2D(textureDLAPosition, uv);
    float fbmNoise = fbm(uv);
    float seedX = fbmNoise + u_delta;
    float seedY = fbmNoise + u_delta;
    float seedZ = fbmNoise * u_elapsedTime;
    return point.xyz;
}

vec3 getSphereSurfaceRandomPoint(float radius, vec3 center) {
    float theta = 2.0 * PI * random(seed());
    float phi = acos(random(seed()) * 2.0 - 1.0);
    float x = sin(phi) * cos(theta);
    float y = sin(phi) * sin(theta);
    float z = cos(phi);
    return center + (vec3(x, y, z)*radius);
}

vec3 getRandomUnitVec3() {
    return getSphereSurfaceRandomPoint(1., vec3(0., 0., 0.));
}

float distance2(vec3 point1, vec3 point2) {
    float dx = point1.x - point2.x;
    float dy = point1.y - point2.y;
    float dz = point1.z - point2.z;
    return pow(dx, 2.0) + pow(dy, 2.0) + pow(dz, 2.0);
}

bool hasStuckedNeighbour(vec4 point) {
    for (int i = 0; i < int(resolution.x); i++) {
        for (int j = 0; j < int(resolution.y); j++) {
            vec4 neighbourPoint = texture2D(textureDLAPosition, vec2(i, j));
            if (neighbourPoint.w == 1.0) {
                float d = distance2(neighbourPoint.xyz, point.xyz);
                if (d < pow(u_maxDistance, 2.0)) {
                    return true;
                }
            }
        }
    }
    return false;
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 point = texture2D(textureDLAPosition, uv);

    vec3 newPosition = point.xyz;
    float isStucked = point.w; // 1 stucked - 0 moving
    if (isStucked != 1.0) {
        // Search for static points near to each moving points at a distance max 'maxDist'
        if (hasStuckedNeighbour(point)) {
            // If there are any, roll the dice and check for aggregation probability
            if (random(u_elapsedTime) < u_aggregationProbability) {
                // Aggregate the moving point by removing it from the moving group and adding to the static group
                isStucked = 1.0;
            }
        } else if (isStucked != 0.5) {
            if (distance2(u_boundingSphereCenter, point.xyz) > pow(u_boundingSphereRadius, 2.0)) {
                // If the particle is to far, move it to a new position on the sphere surface
                newPosition = getSphereSurfaceRandomPoint(u_boundingSphereRadius, u_boundingSphereCenter);
            }
            // Compute new step direction for moving points in (in [-1, -1, -1] - [1, 1, 1] range)
            vec3 stepDirection = random3(seed())*2. - 1.;
            // Update moving point position
            newPosition += stepDirection*u_stepLength;
        }
    }

    gl_FragColor = vec4(newPosition, isStucked);
}
