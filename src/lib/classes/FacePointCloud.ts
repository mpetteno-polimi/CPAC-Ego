import type MorphTarget from "./MorphTarget";
import * as THREE from 'three'

export default class FacePointCloud {
    bufferGeometry: THREE.BufferGeometry;
    material: THREE.Material;
    cloud: THREE.Points<THREE.BufferGeometry, THREE.Material>;
    morphTarget: MorphTarget;

    constructor(material: THREE.Material, morphTarget: MorphTarget) {
        this.bufferGeometry = new THREE.BufferGeometry();
        this.material = material;
        this.cloud = new THREE.Points(this.bufferGeometry, this.material);
        this.morphTarget = morphTarget;
    }

    updatePosition(attribute: THREE.BufferAttribute) {
        this.bufferGeometry.setAttribute("position", attribute);
        this.bufferGeometry.center();
        this.bufferGeometry.computeBoundingBox();
        this.bufferGeometry.computeBoundingSphere();
        this.bufferGeometry.computeVertexNormals();
        this.bufferGeometry.attributes.position.needsUpdate = true;
        // const modifiedGeometry = subdivideGeometry(this.bufferGeometry);
        // this.bufferGeometry.dispose();
        // this.bufferGeometry = modifiedGeometry;
        // this.cloud.geometry = modifiedGeometry;
    }
}