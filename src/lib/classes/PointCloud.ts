import * as THREE from 'three'
import type {ShaderMaterialParameters} from "three";

export default class PointCloud {
    bufferGeometry: THREE.BufferGeometry
    material: THREE.Material
    cloud: THREE.Points<THREE.BufferGeometry, THREE.Material>

    constructor() {
        this.bufferGeometry = new THREE.BufferGeometry()
        this.material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.01,
            sizeAttenuation: true,
        })
        this.cloud = new THREE.Points(this.bufferGeometry, this.material)
    }

    updateProperty(attribute: THREE.BufferAttribute, name: string) {
        this.bufferGeometry.setAttribute(name, attribute)
        this.bufferGeometry.attributes[name].needsUpdate = true
        this.bufferGeometry.computeVertexNormals();
    }
}