#include "/src/lib/shaders/noise/noise3D.glsl"

uniform float u_delta;
uniform float u_stepLength;
uniform float u_maxDistance;
uniform float u_aggregationProbability;
uniform float u_boundingSphereRadius;
uniform vec3 u_boundingSphereCenter;
uniform vec2 u_textureSize;

float randn(vec2 uv) {
    return fract(sin(dot(uv,vec2(12.9898,78.233)))*43758.5453123);
}

bool hasStaticNeighbour(vec4 point) {
    for (int i = 0; i < int(u_textureSize.x); i++) {
        for (int j = 0; j < int(u_textureSize.y); j++) {
            vec4 neighbourPoint = texture2D(textureDLAPosition, vec2(i, j));
            if (neighbourPoint.w == 0.0) {
                float d = distance(neighbourPoint.xyz, point.xyz);
                if (d > 0.0 && d < u_maxDistance) {
                    return true;
                }
            }
        }
    }
    return false;
}

vec3 getRandomMovingPointPos(vec2 uv) {
    float theta = 2.0 * 3.141593 * randn(uv);
    float phi = acos(2.0 * randn(uv) - 1.0);
    float x = sin(phi) * cos(theta);
    float y = sin(phi) * sin(theta);
    float z = cos(phi);
    return u_boundingSphereCenter + (vec3(x, y, z) * u_boundingSphereRadius);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 point = texture2D(textureDLAPosition, uv);

    vec4 newPoint = point;
    float isMovingPoint = point.w; // 0 static - 1 moving
    if (isMovingPoint == 1.0) {
        // Search for static points near to each moving points at a distance max 'maxDist'
        bool hasNeighbour = hasStaticNeighbour(point);
        if (hasNeighbour) {
            // If there are any, roll the dice and check for aggregation probability
            if (randn(uv) < u_aggregationProbability) {
                // Aggregate the moving point by removing it from the moving group and adding to the static group
                newPoint.w = 0.0;
            }
        } else {
            // distance could be replaced by d^2 and check with r^2
            if (distance(u_boundingSphereCenter, point.xyz) > u_boundingSphereRadius) {
                // If the particle is to far, move it to a new position on the sphere surface
                newPoint.xyz = getRandomMovingPointPos(uv);
            }
            // Compute new step direction for moving points in (in [-1, -1, -1] - [1, 1, 1] range)
            vec3 stepDirection =  snoise(point.xyz) - vec3(2.0, 2.0, 2.0) + vec3(1.0, 1.0, 1.0);
            // Update moving point position
            newPoint.xyz = u_stepLength * stepDirection;
        }
    }

    gl_FragColor = point;
}
