import * as THREE from 'three'
import type {ShaderMaterialParameters} from "three";

export default class PointCloud {
    bufferGeometry: THREE.BufferGeometry
    material: THREE.Material
    cloud: THREE.Points<THREE.BufferGeometry, THREE.Material>

    constructor(material: THREE.Material) {
        this.bufferGeometry = new THREE.BufferGeometry()
        this.material = material;
        this.cloud = new THREE.Points(this.bufferGeometry, this.material)
    }

    updateProperty(attribute: THREE.BufferAttribute, name: string) {
        this.bufferGeometry.setAttribute(name, attribute)
        this.bufferGeometry.attributes[name].needsUpdate = true
        this.bufferGeometry.computeVertexNormals();
    }
}