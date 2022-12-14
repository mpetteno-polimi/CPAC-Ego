import * as THREE from 'three'
import * as BufferGeometryUtils  from "three/examples/jsm/utils/BufferGeometryUtils.js";

export default class FacePointCloud {
    bufferGeometry: THREE.BufferGeometry;
    material: THREE.Material;
    cloud: THREE.Points<THREE.BufferGeometry, THREE.Material>;

    constructor(material: THREE.Material) {
        this.bufferGeometry = new THREE.BufferGeometry();
        this.material = material;
        this.cloud = new THREE.Points(this.bufferGeometry, this.material);
    }

    updateProperty(attribute: THREE.BufferAttribute, name: string) {
        this.bufferGeometry.setAttribute(name, attribute);
        this.bufferGeometry.attributes[name].needsUpdate = true;
        this.bufferGeometry.center();
        BufferGeometryUtils.mergeVertices(this.bufferGeometry);
        this.bufferGeometry.computeVertexNormals();
        // const modifiedGeometry = subdivideGeometry(this.bufferGeometry);
        // this.bufferGeometry.dispose();
        // this.bufferGeometry = modifiedGeometry;
        // this.cloud.geometry = modifiedGeometry;
    }
}